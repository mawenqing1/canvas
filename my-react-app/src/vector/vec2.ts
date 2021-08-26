import * as Vec2Func from './Vec2Func';

export class Vec2 extends Array {
    constructor(x = 0, y = x) {
        super(x, y);
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    set(x: string | number | any[], y = x) {
        if (x.length) return this.copy(x);
        Vec2Func.set(this, x, y);
        return this;
    }

    copy(v: string | number | any[]) {
        Vec2Func.copy(this, v);
        return this;
    }

    add(va: number | any[], vb: number | any[]) {
        if (vb) Vec2Func.add(this, va, vb);
        else Vec2Func.add(this, this, va);
        return this;
    }

    sub(va: number | number[], vb: number | number[]) {
        if (vb) Vec2Func.subtract(this, va, vb);
        else Vec2Func.subtract(this, this, va);
        return this;
    }

    multiply(v: string | any[]) {
        if (v.length) Vec2Func.multiply(this, this, v);
        else Vec2Func.scale(this, this, v);
        return this;
    }

    divide(v: string | number | any[]) {
        if (v.length) Vec2Func.divide(this, this, v);
        else Vec2Func.scale(this, this, 1 / v);
        return this;
    }

    inverse(v = this) {
        Vec2Func.inverse(this, v);
        return this;
    }

    // Can't use 'length' as Array.prototype uses it
    len() {
        return Vec2Func.length(this);
    }

    distance(v: any) {
        if (v) return Vec2Func.distance(this, v);
        else return Vec2Func.length(this);
    }

    squaredLen() {
        return this.squaredDistance();
    }

    squaredDistance(v: undefined) {
        if (v) return Vec2Func.squaredDistance(this, v);
        else return Vec2Func.squaredLength(this);
    }

    negate(v = this) {
        Vec2Func.negate(this, v);
        return this;
    }

    cross(va: any, vb: any) {
        if (vb) return Vec2Func.cross(va, vb);
        return Vec2Func.cross(this, va);
    }

    scale(v: any) {
        Vec2Func.scale(this, this, v);
        return this;
    }

    normalize() {
        Vec2Func.normalize(this, this);
        return this;
    }

    dot(v: any) {
        return Vec2Func.dot(this, v);
    }

    equals(v) {
        return Vec2Func.exactEquals(this, v);
    }

    applyMatrix3(mat3: any) {
        Vec2Func.transformMat3(this, this, mat3);
        return this;
    }

    applyMatrix4(mat4: any) {
        Vec2Func.transformMat4(this, this, mat4);
        return this;
    }

    lerp(v: any, a: any) {
        Vec2Func.lerp(this, this, v, a);
    }

    clone() {
        return new Vec2(this[0], this[1]);
    }

    fromArray(a: any[], o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        return a;
    }
}