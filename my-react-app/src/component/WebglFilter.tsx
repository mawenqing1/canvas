import React, { useEffect, useReducer, useRef } from 'react';
import { ContextData, reducer, initData } from "../canvasPublic/initData";

function WebglFilter() {
  const [state, dispatch] = useReducer(reducer, initData);
  const { sat, rvalue, gvalue, bvalue, isShow } = state;

  const webFilter = () => {

    let canvas = document.getElementById('canvas1');
    let gl = canvas!.getContext('webgl');
    let btn = document.getElementById('btn');
    let rUniform: any = null;
    let gUniform: any = null;
    let bUniform: any = null;


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

    const fn = () => {
      let img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "https://img2.baidu.com/it/u=1900670929,1078120168&fm=26&fmt=auto&gp=0.jpg";
      img.onload = function () {
        createTextureByImageObject(gl, img);
        const saturationUniform = gl.getUniformLocation(program, "saturation");
        const uniform = gl.getUniformLocation(program, "inputImageTexture");
        const rUniform = gl.getUniformLocation(program, "r");
        const gUniform = gl.getUniformLocation(program, "g");
        const bUniform = gl.getUniformLocation(program, "b");
        gl.uniform1i(uniform, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.uniform1f(saturationUniform, sat);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.uniform1f(rUniform, rvalue);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.uniform1f(gUniform, gvalue);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.uniform1f(bUniform, bvalue);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };
    };

    if(isShow) {
      fn()
    }
    
  };

  useEffect(() => {
    webFilter();
  }, [sat, rvalue, gvalue, bvalue,isShow])
  return (
    <div className="glFilter">
      <div className="asiderL">
        <button onClick={() => dispatch({type:'changeIsShow'})} >添加图片</button>
        <div className="filters">
          <ul>
            <li>
              <span>饱和度:</span>
              <input onInput={(e) => dispatch({ type: 'changeSat', value: e.target.value })} type="range" defaultValue={0.1} min={-1} max={1} step={0.004} />
            </li>
            <li>
              <span>R:</span>
              <input onInput={(e) => dispatch({ type: 'changeRvalue', value: e.target.value })} type="range" defaultValue={0.1} min={-1} max={1} step={0.004} />
            </li>
            <li>
              <span>G:</span>
              <input onInput={(e) => dispatch({ type: 'changeGvalue', value: e.target.value })} type="range" defaultValue={0.1} min={-1} max={1} step={0.004} />
            </li>
            <li>
              <span>B:</span>
              <input onInput={(e) => dispatch({ type: 'changeBvalue', value: e.target.value })} type="range" defaultValue={0.1} min={-1} max={1} step={0.004} />
            </li>
          </ul>
        </div>
      </div>

      <canvas id="canvas1" width='800' height='700'></canvas>
    </div>

  );
}

export default WebglFilter;
