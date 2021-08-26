import React, { useEffect, useState } from 'react';
import extrudePolyline from '../extrudePolyline';
import { Vec2 } from '../vec2';

function PloyLine() {
  const [thickness, setThickness] = useState<number>(1);
  const [isploy,setIsploy] = useState<boolean>(false);
  function ploy() {
    const canvas = document.getElementById('vecCanvas');
    const gl = canvas!.getContext('webgl');

    const vsSource = `
        attribute vec4 a_Position;
        
        void main() {
          // gl_PointSize = 10.0;
          gl_Position = a_Position;
        }
        `;

    const fsSource = `
        void main() {
            gl_FragColor = vec4(0.5, 0.5,0.0, 1.0);
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

    const vertices = [
      new Vec2(100,200),
      new Vec2(100,100),
      new Vec2(200,150),
      new Vec2(300,100),
      new Vec2(300,200),
    ];
    const points = extrudePolyline(vertices, { thickness: thickness }).position;
    for(let i = 0; i < points.length; i++) {
      points[i] = points[i] / canvas!.width;
    }
    const cells = extrudePolyline(vertices, { thickness: thickness }).index;
    console.log(points);
    
    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    const cellsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawElements(gl.TRIANGLE_STRIP, cells.length, gl.UNSIGNED_SHORT, 0);
  };
  useEffect(()=>{
    if(isploy) {
      ploy()
    }
  },[thickness,isploy])

  return (
    <div>
      <ul>
        <li><button onClick={() => { ploy(),setIsploy(true) }}>绘制折线</button></li>
        <li><input onChange={(e)=>{setThickness(Number(e.target.value))}} type="number" placeholder="输入折线宽度" /></li>
      </ul>
    </div>
  );
}

export default PloyLine;
