import React, { useEffect, useState } from 'react';

function Performance() {
  const [run, setRun] = useState<boolean>(false);
  const performances = () => {
    const canvas = document.querySelector('canvas');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    // 创建正多边形，返回顶点
    function regularShape(x: number, y: number, r: number, edges = 3) {
      const points = [];
      const delta = 2 * Math.PI / edges;
      for (let i = 0; i < edges; i++) {
        const theta = i * delta;
        points.push([x + r * Math.sin(theta), y + r * Math.cos(theta)]);
      }
      return points;
    }
    // 根据顶点绘制图形
    function drawShape(context: CanvasRenderingContext2D, points: string | any[], rad:number) {
      context.fillStyle = `rgb(${255*Math.random()},${255*Math.random()},${255*Math.random()})`;
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.save();
      context.translate(canvas!.width/2,canvas!.height/2);
      context.beginPath();
      context.moveTo(...points[0]);
      for (let i = 1; i < points.length; i++) {
        context.lineTo(...points[i]);
      }
      context.closePath();
      context.transform(
        0,
        1*Math.sin(rad),
        1*Math.cos(rad),
        -1*Math.sin(rad),
        1*Math.cos(rad),
        0
      )
      context.translate(-canvas!.width/2,-canvas!.height/2);
      context.restore();
      context.stroke();
      context.fill();
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
    };

    let triangles: any[] = [];
    const COUNT = 20;
    // 执行绘制
    function draw() {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 5 * Math.random(); i++) {
          triangles.push(randomTriangles());
        }
        triangles.forEach(tri => {
          tri.u_time = (performance.now() - tri.startTime) / 1000;
          let p = Math.min(1.0, tri.u_time / tri.u_duration);
          let rad = tri.u_rotation + 3.14 * 10.0 * p;
          let scale = tri.u_scale * p * (2.0 - p);
          let x = 2.0 * tri.u_dir[0] * p * p;
          let y = 2.0 * tri.u_dir[1] * p * p;
          const type = 3;
          let points = regularShape(x,y,10,type);
          drawShape(ctx,points,rad)
        });
  
        triangles = triangles.filter(tri => {
          return tri.u_time <= tri.u_duration;
        });

        requestAnimationFrame(draw);
      }
    }
    draw();
  }
  useEffect(() => {
    if (run) {
      performances()
    }
  }, [run])
  return (
    <div>
      <button onClick={() => { setRun(true), performances() }}>粒子效果</button>
      <canvas width="600" height="600"></canvas>
    </div>
  );
}

export default Performance;
