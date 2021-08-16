import React,{useEffect} from 'react';

function WebglFilter() {
  const webFilter = () => {
    let canvas = document.getElementById('canvas1');
    let gl = canvas!.getContext('webgl');
    let sat = document.getElementById('sat');

    const vertexShader = `
    attribute vec4 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main () {
    gl_Position = a_position;
    v_texCoord = a_texCoord;
    }  
    `;

    const fragmentShader = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_texture;
    void main () {
        gl_FragColor = texture2D(u_texture, v_texCoord);
    }
`;
    const pointPos = [
      -1, 1,
      -1, -1,
      1, -1,
      1, -1,
      1, 1,
      -1, 1,
    ];
    const texCoordPos = [
      0, 1,
      0, 0,
      1, 0,
      1, 0,
      1, 1,
      0, 1
    ];

    function createShader(gl:any, type:any, source:any) {
      let shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (success) {
          return shader;
      }
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
  };

  function createProgram(gl:any, vertexShader:any, fragmentShader:any) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}



    function createTexture(gl:any) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      // gl.generateMipmap(gl.TEXTURE_2D);
      return texture;
  };

  function initWebGL(gl:any, vertexSource:any, fragmentSource:any) {
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    let program = createProgram(gl, vertexShader, fragmentShader);
    return program;
}



    const program = initWebGL(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointPos), gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoordPos), gl.STATIC_DRAW);

    const a_position = gl.getAttribLocation(program, "a_position");
    const a_texCoord = gl.getAttribLocation(program, "a_texCoord");

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(
      a_position,
      2,
      gl.FLOAT,
      false,
      Float32Array.BYTES_PER_ELEMENT * 2,
      0
    );
    gl.enableVertexAttribArray(a_position);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(
      a_texCoord,
      2,
      gl.FLOAT,
      false,
      Float32Array.BYTES_PER_ELEMENT * 2,
      0
    );
    gl.enableVertexAttribArray(a_texCoord);

    const texture = createTexture(gl);
    const image = new Image();
    image.src = '../../../dasima.png';
    image.onload = function () {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  };
  useEffect(()=>{

    webFilter()
  },[])
  return (
    <div className="glFilter">
      <p>
        <label >
          <span>饱和度: </span>
          <input type="checkbox" id="sat" />
        </label>
        <br />
        <label >
          value:
          <input type="range" id="sat-value" defaultValue={0.1} min={-1} max={1} step={0.004} />
        </label>
      </p>
      <canvas id="canvas1" width='800' height='700'></canvas>
    </div>
  );
}

export default WebglFilter;
