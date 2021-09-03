import React, { useEffect, useState } from 'react';

function Performance() {
  const [run, setRun] = useState<boolean>(false);
  const performances = () => {
    const canvas = document.querySelector('canvas');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    function draw() {
      let x,
        y,
        moveX,
        moveY,
        triangleCur;

      function createCache() {
        const ret = [];
        const cacheCanvas = new OffscreenCanvas(40, 40);
        const context: any = cacheCanvas.getContext("2d");
        context.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        context.strokeStyle = "black";
        const points = regularShape(20, 20, 10, 3);
        drawShape(context, points);
        ret.push(cacheCanvas);
        return ret;
      }
      let shapes = createCache();
      let shape = shapes[0];

      var triangles: any[] = [];
      function getTriangle() {
        let rad = Math.random() * Math.PI * 2;
        let u_dir = [Math.cos(rad), Math.sin(rad)];
        for (let i = 0; i < 1; i++) {
          x = canvas!.width/2-5;
          y = canvas!.height/2-5;
          moveX = u_dir[0];
          moveY = u_dir[1];
          let triangle = {
            x: x,
            y: y,
            moveX: moveX,
            moveY: moveY,
          };
          if (triangle.moveX || triangle.moveY) {
            triangles.push(triangle);
          }
        }
      }

      function triangle() {
        ctx!.clearRect(0, 0, canvas!.width * 4, canvas!.height * 4);
        getTriangle();
        let l = triangles.length;
        for (let i = 0; i < l; i++) {
          let rad = Math.random() * Math.PI / 2;
          let cos = Math.cos(rad);
          let sin = Math.sin(rad);
          triangleCur = triangles[i];
          triangleCur.x += triangleCur.moveX;
          triangleCur.y += triangleCur.moveY;
          ctx!.save();
          ctx!.translate(canvas!.width / 2, canvas!.height / 2);
          ctx!.rotate(rad);
          ctx!.transform(cos, sin, -sin, cos, 0, 0);
          ctx!.translate(-canvas!.width / 2, -canvas!.height / 2);
          ctx!.drawImage(shape, triangleCur.x, triangleCur.y);
          ctx!.restore();
        }
        requestAnimationFrame(triangle);
      }
      triangle();
      function regularShape(x: number, y: number, r: number, edges = 3) {
        const points = [];
        const delta = (2 * Math.PI) / edges;
        for (let i = 0; i < edges; i++) {
          const theta = i * delta;
          points.push([x + r * Math.sin(theta), y + r * Math.cos(theta)]);
        }
        return points;
      }

      function drawShape(context: any, points: any) {
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(...points[0]);
        for (let i = 1; i < points.length; i++) {
          context.lineTo(...points[i]);
        }
        context.closePath();
        context.stroke();
        context.fill();
      }

    }
    draw()
  }
  useEffect(() => {
    if (run) {
      performances()
    }
  }, [run])
  return (
    <div>
      <button onClick={() => { setRun(true), performances() }}>粒子效果</button>
      <canvas width="800" height="800"></canvas>
    </div>
  );
}

export default Performance;
