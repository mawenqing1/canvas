import React from 'react';

function Animation() {
  interface uniform {
    u_rotation: any,
    u_scale: any,
    u_time: any,
    u_duration: any,
    u_dir: any
  }
  const animation = () => {
    let gl: any = null,
      len = 0;

    function loadShader(gl: any, type: any, source: any) {
      const shader = gl.createShader(type);

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`shader compile failed: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    function initShaders(gl: any, vertexSource: any, fragmentSource: any) {
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

      if (vertexShader === null || fragmentShader === null) {
        throw new Error('load shader failed');
      }

      const program = gl.createProgram();

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(`program created failed: ${gl.getProgramInfoLog(program)}`);
        gl.deleteProgram(program);
        return null;
      }

      gl.useProgram(program);
      gl.program = program;

      return program;
    }

    function initBufferData(gl: any) {
      const r2 = 0.8;
      const r1 = 0.5;
      const rect = [];
      for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) {
          rect.push(r1 * Math.cos(i * (Math.PI / 5)), r1 * Math.sin(i * (Math.PI / 5)))
        } else {
          rect.push(r2 * Math.cos(i * (Math.PI / 5)), r2 * Math.sin(i * (Math.PI / 5)))
        }
      }

      const vert = [];
      for (let i = 0; i < 10; i++) {
        if (i % 2 === 0) {
          vert.push(r1 * Math.cos(i * (Math.PI / 5)), r1 * Math.sin(i * (Math.PI / 5)))
        } else {
          vert.push(r2 * Math.cos(i * (Math.PI / 5)), r2 * Math.sin(i * (Math.PI / 5)))
        }
      }

      const vertexes = new Float32Array(vert);

      const buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexes, gl.STATIC_DRAW);

      const a_Position = gl.getAttribLocation(gl.program, 'a_position');
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(a_Position);

      const a_texCoord = gl.getAttribLocation(gl.program, 'a_texCoord');
      gl.vertexAttribPointer(a_texCoord, 2, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 4, vertexes.BYTES_PER_ELEMENT * 2);
      gl.enableVertexAttribArray(a_texCoord);

      return vertexes.length;
    }

    function setUniforms(gl: any, {
      u_rotation,
      u_scale,
      u_time,
      u_duration,
      u_dir
    }: uniform) {
      let loc = gl.getUniformLocation(gl.program, 'u_rotation');
      gl.uniform1f(loc, u_rotation);

      loc = gl.getUniformLocation(gl.program, 'u_scale');
      gl.uniform1f(loc, u_scale);

      loc = gl.getUniformLocation(gl.program, 'u_time');
      gl.uniform1f(loc, u_time);

      loc = gl.getUniformLocation(gl.program, 'u_duration');
      gl.uniform1f(loc, u_duration);

      loc = gl.getUniformLocation(gl.program, 'u_dir');
      gl.uniform2fv(loc, u_dir);
    }

    function loadTextures(imgSource: any, index: any) {
      const texture = gl.createTexture();

      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, imgSource);

      const loc = gl.getUniformLocation(gl.program, 'u_sampler');
      gl.uniform1i(loc, index);
    }

    function loadImage(src: string) {
      return new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          resolve(img);
        }
        img.src = src;
      })
    }

    function randomTriangles() {
      const u_rotation = Math.random() * Math.PI; // 初始旋转角度
      const u_scale = Math.random() * 0.05 + 0.03;
      const u_time = 0;
      const u_duration = 5.0;

      const rad = Math.random() * Math.PI * 2;
      const u_dir = [Math.cos(rad), Math.sin(rad)];
      const startTime = performance.now();

      return {
        u_rotation,
        u_scale,
        u_time,
        u_duration,
        u_dir,
        startTime
      };
    }

    let triangles: any[] = [];

    function tick() {
      for (let i = 0; i < 5 * Math.random(); i++) {
        triangles.push(randomTriangles());
      }
      gl.clear(gl.COLOR_BUFFER_BIT);
      triangles.forEach(tri => {
        tri.u_time = (performance.now() - tri.startTime) / 1000;
        setUniforms(gl, tri);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 10);
      });

      triangles = triangles.filter(tri => {
        return tri.u_time <= tri.u_duration;
      });

      requestAnimationFrame(tick);
    }

    async function main() {
      const canvas = document.querySelector('canvas');
      gl = canvas!.getContext('webgl');

      const vertexSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        uniform float u_rotation;
        uniform float u_time;
        uniform float u_duration;
        uniform float u_scale;
        uniform vec2 u_dir;

        varying float vp;
        varying vec2 v_texCoord;

        void main() {
          float p = min(1.0, u_time / u_duration);
          float rad = u_rotation + 3.14 * 10.0 * p;
          float scale = u_scale * p * (2.0 - p);
          vec2 offset = 2.0 * u_dir * p * p;
          // 平移矩阵
          mat3 translateMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            offset.x, offset.y, 1.0
          );
          // 旋转矩阵
          mat3 rotateMatrix = mat3(
            cos(rad), sin(rad), 0.0,
            -sin(rad), cos(rad), 0.0,
            0.0, 0.0, 1.0
          );
          // 缩放矩阵
          mat3 scaleMatrix = mat3(
            scale, 0.0, 0.0,
            0.0, scale, 0.0,
            0.0, 0.0, 1.0
          );
          gl_PointSize = 10.0;
          // vec3 pos = vec3(a_position, 1.0);
          // 先随机偏移
          mat3 randomTranslate = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
          vec3 translate = randomTranslate * vec3(a_position, 1.0);
          vec3 pos = translateMatrix * scaleMatrix * rotateMatrix * translate;
          gl_Position = vec4(pos, 1.0);
          vp = p;
          v_texCoord = a_texCoord;
        }
      `;

      const fragmentSource = `
        precision mediump float;

        uniform vec4 u_color;
        uniform sampler2D u_sampler;
        varying vec2 v_texCoord;
        varying float vp;

        void main() {
          // gl_FragColor.xyz = u_color.xyz;
          // gl_FragColor.a = 1.0;
          gl_FragColor = texture2D(u_sampler, v_texCoord);
          gl_FragColor.a = (1.0 - vp);
        }
      `;

      initShaders(gl, vertexSource, fragmentSource);

      len = initBufferData(gl);

      const img = await loadImage('https://img2.baidu.com/it/u=3848720810,209182788&fm=26&fmt=auto&gp=0.jpg');
      loadTextures(img, 0);

      tick();
    }

    main();
  }
  return (
    <div>
      <button onClick={() => { animation() }}>粒子效果</button>
    </div>
  );
}

export default Animation;
