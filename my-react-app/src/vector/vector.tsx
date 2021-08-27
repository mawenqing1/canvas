import React from 'react';
import parametric from './parametric'
import { MathLib2D } from './MathLib2D';
import './vector.less'
import Triangulation from './components/triangulation'
import Animation from './components/animation'
import PloyLine from './components/ployLine'
import Clear from './components/clear'

function Vector() {
  
  // 阿基米德曲线
  const archimedes = () => {
    const helical = parametric(
      (t: number, l: number) => l * t * Math.cos(t),
      (t: number, l: number) => l * t * Math.sin(t),
    );
    helical(0, 50, 500, 0.01).draw();
  };
  // 圆
  const arc = () => {
    const circle = parametric(
      (t: number, r: number) => r * Math.cos(t),
      (t: number, r: number) => r * Math.sin(t),
    );
    circle(0, Math.PI * 2, 100, 0.5).draw();
  };
  // 椭圆
  const oval = () => {
    const ellipse = parametric(
      (t: number, a: number, b: number) => a * Math.cos(t),
      (t: number, a: number, b: number) => b * Math.sin(t),
    );
    ellipse(0, Math.PI * 2, 100, 0.6, 0.3).draw();
  };
  // 抛物线
  const parabola = () => {
    const para = parametric(
      (t: number) => 0.25 * t,
      (t: number) => 0.25 * t ** 2,
    );
    para(-5.5, 5.5).draw();
  };
  // 星形线
  const starLine = () => {
    const star = parametric(
      (t: number, l: number) => l * Math.cos(t) ** 3,
      (t: number, l: number) => l * Math.sin(t) ** 3
    );
    star(0, Math.PI * 2, 50, 0.5).draw();
  };
  // 二阶贝塞尔曲线
  const quadric = () => {
    const quadricBrezier = parametric(
      (t: number, [{
        x: x0
      }, {
        x: x1
      }, {
        x: x2
      }]:{x:number}[]) => (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
      (t: number, [{
        y: y0
      }, {
        y: y1
      }, {
        y: y2
      }]:{y:number}[]) => (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2,
    );
    const p0 = new MathLib2D(0, 0);
    const p1 = new MathLib2D(0.2, 0);
    p1.rotate(0.75);
    const p2 = new MathLib2D(0.6, 0);
    const count = 30;
    for (let i = 0; i < count; i++) {
      p1.rotate(2 / count * Math.PI);
      p2.rotate(2 / count * Math.PI);
      quadricBrezier(0, 1, 100, [p0, p1, p2]).draw();
    };
  };
  // 三阶贝塞尔曲线
  const cubic = () => {
    const cubicBezier = parametric(
      (t:number, [{
        x: x0
      }, {
        x: x1
      }, {
        x: x2
      }, {
        x: x3
      }]:{x:number}[]) => (1 - t) ** 3 * x0 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) ** 2 * x2 + t ** 3 * x3,
      (t:number, [{
        y: y0
      }, {
        y: y1
      }, {
        y: y2
      }, {
        y: y3
      }]:{y:number}[]) => (1 - t) ** 3 * y0 + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) ** 2 * y2 + t ** 3 * y3,
    );
    const p0 = new MathLib2D(0, 0);
    const p1 = new MathLib2D(0.2, 0);
    p1.rotate(0.75);
    const p2 = new MathLib2D(0.3, 0);
    p2.rotate(-0.75);
    const p3 = new MathLib2D(0.7, 0);
    const count = 30;
    for (let i = 0; i < count; i++) {
      p1.rotate(2 / count * Math.PI);
      p2.rotate(2 / count * Math.PI);
      p3.rotate(2 / count * Math.PI);
      cubicBezier(0, 1, 100, [p0, p1, p2, p3]).draw();
    };
  }
  return (
    <div>
      <ul className="btn">
        <li><button onClick={() =>{archimedes()}}>阿基米德螺旋线</button></li>
        <li><button onClick={() =>{arc()}}>圆</button></li>
        <li><button onClick={() =>{oval()}}>椭圆</button></li>
        <li><button onClick={() =>{parabola()}}>抛物线</button></li>
        <li><button onClick={() =>{starLine()}}>星形线</button></li>
        <li><button onClick={() =>{quadric()}}>二阶贝塞尔曲线</button></li>
        <li><button onClick={() =>{cubic()}}>三阶贝塞尔曲线</button></li>
        <li><Triangulation/></li>
        <li><Animation /></li>
        <li><PloyLine /></li>
        <li><Clear /></li>
      </ul>
      <canvas id="vecCanvas" width="800" height="800"></canvas>
    </div>
  );
}

export default Vector;
