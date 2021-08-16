import React, { useEffect } from 'react';

function WebglFilter() {
  const webFilter = () => {
    let canvas = document.getElementById('canvas1');
    let gl = canvas!.getContext('webgl');
    let sat = document.getElementById('sat-value');
    let btn = document.getElementById('btn');

    const vsSource = `
            precision mediump float;
            attribute vec4 a_Position;
            attribute vec4 inputTextureCoordinate;
            varying vec2 textureCoordinate;

            void main() {
                gl_Position = a_Position;
                textureCoordinate = vec2((a_Position.x + 1.0) / 2.0, 1.0 - (a_Position.y + 1.0) / 2.0);
            }
        `;

    const fsSource = `
            precision mediump float;
            varying vec2 textureCoordinate;
            uniform sampler2D inputImageTexture;
            uniform float size;
            uniform float saturation;
            uniform float r; 
            uniform float g;
            uniform float b;
            uniform float a;

            void main() {
                vec4 texture = texture2D(inputImageTexture, textureCoordinate);
                texture.r += r;
                texture.g += g;
                texture.b += b;

                //饱和度
                float average = (texture.r + texture.g + texture.b) / 3.0;
                if(saturation > 0.0) {
                    texture.rgb += (average - texture.rgb) * (1.0 - 1.0 / (1.001 - saturation));
                } else {
                    texture.rgb += (average - texture.rgb) * (-saturation);
                };
                gl_FragColor = texture;
            }
        `;

    const createShader = (gl: any, type: any, source: any) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
      }
      gl.deleteShader(shader);
    };

    const createProgram = (gl: any, vShader: any, fShader: any) => {
      const program = gl.createProgram();
      gl.attachShader(program, vShader);
      gl.attachShader(program, fShader);
      gl.linkProgram(program);
      if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.useProgram(program);
        return program;
      }
      gl.deleteProgram(program);
    };

    const createTextureByImageObject = (gl: any, imgObject: any) => {
      gl.activeTexture(gl.TEXTURE0);
      const textureObject = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, textureObject);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imgObject);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      return textureObject;
    };

    const vertices = [
      1.0, 1.0,
      1.0, -1.0, -1.0, 1.0, -1.0, -1.0,
    ];

    const vShader = createShader(gl, gl.VERTEX_SHADER, vsSource),
      fShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource),
      program = createProgram(gl, vShader, fShader),
      buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let v4PositionIndex = gl.getAttribLocation(program, "a_Position");
    gl.enableVertexAttribArray(v4PositionIndex);
    gl.vertexAttribPointer(v4PositionIndex, 2, gl.FLOAT, false, 0, 0);

    btn?.addEventListener('mousedown', () => {
      let img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "https://img0.baidu.com/it/u=267521113,2130611981&fm=26&fmt=auto&gp=0.jpg";
      img.onload = function () {
        createTextureByImageObject(gl, img);
        let saturationUniform = gl.getUniformLocation(program, "saturation");
        const uniform = gl.getUniformLocation(program, "inputImageTexture");
        gl.uniform1i(uniform, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        sat!.addEventListener("input", function () {
          const val = Number(sat!.value);
          gl.uniform1f(saturationUniform, val);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        });
      };
    })
  };

  useEffect(() => {

    webFilter()
  }, [])
  return (
    <div className="glFilter">
      <button id="btn">添加图片</button>
      <span>饱和度:</span>
      <input type="range" id="sat-value" defaultValue={0.1} min={-1} max={1} step={0.004} />
      <canvas id="canvas1" width='800' height='700'></canvas>
    </div>
  );
}

export default WebglFilter;
