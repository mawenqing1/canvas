import { Vec2 } from "./vec2";

const extrudePolyline = (points: any, { thickness = 10 } = {}) => {
    const halfThick = 0.5 * thickness;
    const innerSide = [];
    const outerSide = [];

    for (let i = 1; i < points.length - 1; i++) {
        const v1 = (new Vec2()).sub(points[i], points[i - 1]).normalize();
        const v2 = (new Vec2()).sub(points[i], points[i + 1]).normalize();
        const v = (new Vec2()).add(v1, v2).normalize();
        const norm = new Vec2(-v1.y, v1.x);
        const cos = norm.dot(v);
        const len = halfThick / cos;
        // 起始点
        if (i === 1) {
            const v0 = new Vec2(...norm).scale(halfThick);
            outerSide.push((new Vec2()).add(points[0], v0));
            innerSide.push((new Vec2()).sub(points[0], v0));
        }
        v.scale(len);
        outerSide.push((new Vec2()).add(points[i], v));
        innerSide.push((new Vec2()).sub(points[i], v));
        // 结束点
        if (i === points.length - 2) {
            const norm2 = new Vec2(v2.y, -v2.x);
            const v0 = new Vec2(...norm2).scale(halfThick);
            outerSide.push((new Vec2()).add(points[points.length - 1], v0));
            innerSide.push((new Vec2()).sub(points[points.length - 1], v0));
        }
    }

    const count = innerSide.length * 4 - 4;
    const position = new Float32Array(count * 2);
    const index = new Uint16Array(6 * count / 4);

    for (let i = 0; i < innerSide.length - 1; i++) {
        const a = innerSide[i],
            b = outerSide[i],
            c = innerSide[i + 1],
            d = outerSide[i + 1];

        const offset = i * 4;
        index.set([offset, offset + 1, offset + 2, offset + 2, offset + 1, offset + 3], i * 6);
        position.set([...a, ...b, ...c, ...d], i * 8);
    }

    return {
        position,
        index
    };
}

export default extrudePolyline