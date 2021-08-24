function parametric(xFn:any, yFn:any) {
    return function(start:any, end:any, seg = 100, ...args:any) {
        const points = [];
        for (let i = 0; i <= seg; i++) {
            const p = i / seg;
            const t = start * (1 - p) + end * p;
            const x = xFn(t, ...args);
            const y = yFn(t, ...args);
            points.push([x, y]);
        }
        return {
            draw: draw.bind(null, points),
            points,
        };
    };
};
function draw(points:any) {
    const gl = document.getElementById('canvas')!.getContext('webgl');
    const vsSource = `
    attribute vec4 a_Position;
        
    void main() {
        gl_Position = a_Position;
    }
    `;

    const fsSource = `
        void main() {
            gl_FragColor = vec4(0.0,0.0,1.0,1.0);
        }
        `;

    const vsShader = gl.createShader(gl.VERTEX_SHADER);
    const fsShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vsShader, vsSource);
    gl.shaderSource(fsShader, fsSource);

    gl.compileShader(vsShader);
    gl.compileShader(fsShader);

    if (!gl.getShaderParameter(vsShader, gl.COMPILE_STATUS)) {
        console.error(`shader compile failed: ${gl.getShaderInfoLog(vsShader)}`);
        gl.deleteShader(vsShader);
    };

    const program = gl.createProgram();

    gl.attachShader(program, vsShader);
    gl.attachShader(program, fsShader);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`program created failed: ${gl.getProgramInfoLog(program)}`);
        gl.deleteProgram(program);
    };

    gl.useProgram(program);


    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    const point = points.flat();

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    gl.clearColor(0, 0, 0, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_STRIP, 0, point.length / 2);

}

export default parametric