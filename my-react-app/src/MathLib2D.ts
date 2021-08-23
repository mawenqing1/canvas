interface v {
    x: number,
    y: number
}

export class MathLib2D extends Array {
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    };

    set x(v: number) {
        this[0] = v;
    };

    set y(v: number) {
        this[1] = v;
    };

    get x() {
        return this[0];
    };

    get y() {
        return this[1];
    };

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    get angle() {
        return Math.atan2(this.y, this.x);
    };

    copy() {
        return new MathLib2D(this.x, this.y);
    };

    add(v: v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };

    sub(v: v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };

    scale(c: number) {
        this.x *= c;
        this.y *= c;
        return this;
    };

    mul(v: v) {
        return this.x * v.x + this.y * v.y;
    };

    rotate(rad: number) {
        const c = Math.cos(rad),
            s = Math.sin(rad);
        const [x, y] = this;

        this.x = x * c + y * -s;
        this.y = x * s + y * c;

        return this;
    };

    cross(v: v) {
        return this.x * v.y - v.x * this.y;
    };

    normalize() {
        return this.scale(1 / this.length);
    };

    cos(v: v) {
        return (this.x * this.y + v.x * v.y) / Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)) * Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
    };

}