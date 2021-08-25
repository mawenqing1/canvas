import React from 'react';
import Tess2 from 'tess2'

function Triangulation() {
  const triangle = () => {
    let point = [
      [-0.7, 0.5],
      [-0.4, 0.3],
      [-0.25, 0.71],
      [-0.1, 0.56],
      [-0.1, 0.13],
      [0.4, 0.21],
      [0, -0.6],
      [-0.3, -0.3],
      [-0.6, -0.3],
      [-0.45, 0.0],
    ].flat();

    const contours = [point];
    const res = Tess2.tesselate({
      contours: contours,
      windingRule: Tess2.WINDING_ODD,
      elementType: Tess2.POLYGONS,
      ploySize: 3,
      vertexSize: 2,
    });

    let points: number[] = []
    // for (let i = 0; i < res.vertices.length; i += 2) {
    //   points.push(res.vertices[i], res.vertices[i + 1])
    // };

    for (var i = 0; i < res.elements.length; i += 3) {
      var a = res.elements[i], b = res.elements[i + 1], c = res.elements[i + 2];
      points.push(res.vertices[a * 2], res.vertices[a * 2 + 1],
        res.vertices[b * 2], res.vertices[b * 2 + 1],
        res.vertices[c * 2], res.vertices[c * 2 + 1])
    };
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

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(a_Position);

    gl.clearColor(0, 0, 0, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, points.length);

  }
  return (
    <div>
      <button onClick={() => { triangle() }}>三角剖分</button>
    </div>
  );
}

export default Triangulation;
