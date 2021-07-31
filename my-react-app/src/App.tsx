import React, { useState, useEffect, useRef, Props, useReducer } from 'react'
import { initData, reducer, ContextData } from './block'
import { render } from 'react-dom';
import './App.less'
import ChangeComponent from './component/Change'
import BlockComponent from './component/Block'
import RotateComponent from './component/RoteBox'
import TileComponent from './component/TileBox'
import TextComponent from './component/TextBox'
import ClearComponent from './component/ClearBox'
import ShadowComponent from './component/ShadowBox'
import ChangeShadowComponent from './component/ChangeShadowBox'
import ChangeTextBoxComponent from './component/ChangeTextBox'
import ChangeLineBoxComponent from './component/ChangeLineBox'
import ChangeSizeBoxComponent from './component/ChangeSizeBox'
import ShapeBoxComponent from './component/ShapeBox'
import ChangeDashBoxComponent from './component/ChangeDashBox'
import ChangeColorBoxComponent from './component/ChangeColorBox'
import ChangeLayerBoxComponent from './component/ChangeLayerBox'
import drawRect from './drawRect'
import drawTriangle from './drawTriangle'
import drawLine from './drawLine'
import drawArc from './drawArc'
import drawCircle from './drawCircle'
import drawQctwo from './drawQctwo'
import drawQcthree from './drawQcthree'
// import drawImg from './drawImg'
// import judge from './judge'

function App() {
  const [state, dispatch] = useReducer(reducer, initData);
  const { isShow, show, colors, types, transparency, cir, tile, tex, clear, shadow, shadowX, shadowY, blur, shaColor,align,baseline,textDirection,lwidth,cap,size,fonts,shapeX,shapeY,pointX,pointY,solid, dotted,deviation,start,end,layers} = state;

  const canvas = useRef<HTMLCanvasElement>(null);
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const canvasClear = useRef<HTMLCanvasElement>(null);
  const canvasClear_1 = useRef<HTMLCanvasElement>(null);
  const originX = useRef<number>(0);
  const originY = useRef<number>(0);
  const originX1 = useRef<number>(0)
  const originY1 = useRef<number>(0)
  const beforeCir = useRef<number>(0);
 

  // 点击显示隐藏
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    const myCanvasDom = myCanvas.current;
    const ctx_1 = myCanvasDom!.getContext('2d');
    const canvasClearDom = canvasClear.current;
    const canvasClearDom_1 = canvasClear_1.current;
    ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
    ctx_1!.clearRect(0, 0, myCanvasDom!.width, myCanvasDom!.height);
    ctx!.fillStyle = typeof ctx!.fillStyle === 'object' ? '#000' : ctx!.fillStyle;
    ctx!.save();
    ctx!.beginPath();
    ctx!.rect(0 + pointX * 50, 0 + pointY * 50, 500 * (shapeX / 5), 500 * (shapeY / 5));
    ctx!.stroke();
    ctx!.closePath();
    ctx!.clip();

    if (isShow) {
      switch (show) {
        case 'rect':
          drawRect(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, start, end, layers);

          break;
        case 'triangle':
          drawTriangle(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, start, end, layers);

          break;
        case 'circle':
          drawCircle(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, start, end, layers);

          break;
        case 'line':
          drawLine(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, lwidth, cap, solid, dotted, deviation);
          break;
        case 'arc':
          drawArc(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor);
          break;
        case 'qctwo':
          drawQctwo(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor);
          break;
        case 'qcthree':
          drawQcthree(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor);
          break;
        case 'img':
          drawImg(ctx!, canvasDom!, myCanvasDom!, ctx_1!, canvasClearDom!, canvasClearDom_1!, shadow, transparency, types, shadowX, shadowY, blur, shaColor, cir,pointX,pointY,shapeX,shapeY,shadow);
          break;
        default:
          return undefined;
      }

    } else {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
    }
    ctx!.restore();
  }, [isShow, show, shadow, transparency, types, shadowX, shadowY, blur, shaColor, lwidth, cap, shapeX, shapeY, pointY, pointX, cap, solid, dotted, deviation, start, end, layers, cir]);

  // 平铺组件
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    const myCanvasDom = myCanvas.current;
    const ctx_1 = myCanvasDom!.getContext('2d');
    if (tile) {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
      ctx_1!.clearRect(0, 0, myCanvasDom!.width, myCanvasDom!.height);
      let img = new Image();
      let file = document.getElementById("file")!.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        let data: any = reader.result;
        img.src = data;
        img.onload = () => {
          let pattern: any = ctx!.createPattern(img, 'repeat');
          ctx!.fillStyle = pattern;
          ctx!.fillRect(150, 150, 500, 500);
        }
      };
    }
  }, [tile])
  // 绘制文本组件
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
    if (shadow) {
      ctx!.shadowOffsetX = shadowX;
      ctx!.shadowOffsetY = shadowY;
      ctx!.shadowBlur = blur;
      ctx!.shadowColor = shaColor;
    };
    ctx!.textAlign = align;
    ctx!.textBaseline = baseline;
    ctx!.font = `${size}px ${fonts}`;
    ctx!.direction = textDirection;
    // const newTex = textDirection === 'rtl' ? tex.split('').reverse().join('') : tex;
    ctx!.fillText(tex, 400, 100);
  }, [tex, align, baseline, textDirection, size, fonts])

  // 清空画布组件
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    if (clear) {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height)
    }
  }, [clear]);

  // 判断点是否在区域内
  const judge = (x1: number, y1: number, width: number, height: number, x2: number, y2: number, cir: number) => {
    let ltX = (x1 - originX1.current) * Math.cos((Math.PI / 180) * (-cir)) + (y1 - originY1.current) * Math.sin((Math.PI / 180) * (-cir)) + originX1.current;
    let ltY = (y1 - originY1.current) * Math.cos(Math.PI / 180 * (-cir)) - (x1 - originX1.current) * Math.sin(Math.PI / 180 * (-cir)) + originY1.current;

    let rtX = (x1 + width - originX1.current) * Math.cos((Math.PI / 180) * (-cir)) + (y1 - originY1.current) * Math.sin((Math.PI / 180) * (-cir)) + originX1.current;
    let rtY = (y1 - originY1.current) * Math.cos(Math.PI / 180 * (-cir)) - (x1 + width - originX1.current) * Math.sin(Math.PI / 180 * (-cir)) + originY1.current;

    let rbX = (x1 + width - originX1.current) * Math.cos((Math.PI / 180) * (-cir)) + (y1 + height - originY1.current) * Math.sin((Math.PI / 180) * (-cir)) + originX1.current;
    let rbY = (y1 + height - originY1.current) * Math.cos(Math.PI / 180 * (-cir)) - (x1 + width - originX1.current) * Math.sin(Math.PI / 180 * (-cir)) + originY1.current;

    let lbX = (x1 - originX1.current) * Math.cos((Math.PI / 180) * (-cir)) + (y1 + height - originY1.current) * Math.sin((Math.PI / 180) * (-cir)) + originX1.current;
    let lbY = (y1 + height - originY1.current) * Math.cos(Math.PI / 180 * (-cir)) - (x1 - originX1.current) * Math.sin(Math.PI / 180 * (-cir)) + originY1.current;
    // fabric源码判断点是否在区域内
    const oCoords: any = {
      tl: {
        x: ltX,
        y: ltY
      },
      tr: {
        x: rtX,
        y: rtY
      },
      br: {
        x: rbX,
        y: rbY
      },
      bl: {
        x: lbX,
        y: lbY
      }
    };
    const point = {
      x: x2,
      y: y2
    };
    function lineBox(oCoords: any) {

      var lines: any = {
        topline: {
          o: oCoords.tl,
          d: oCoords.tr
        },
        rightline: {
          o: oCoords.tr,
          d: oCoords.br
        },
        bottomline: {
          o: oCoords.br,
          d: oCoords.bl
        },
        leftline: {
          o: oCoords.bl,
          d: oCoords.tl
        },
      };
      return lines;
    };
    let lines = lineBox(oCoords);
    function pointBox(point: { y: number; x: number; }, lines: any) {

      var b1, b2, a1, a2, xi, // yi,
        xcount = 0,
        iLine;

      for (var lineKey in lines) {
        iLine = lines[lineKey];
        // optimisation 1: line below point. no cross
        if ((iLine.o.y < point.y) && (iLine.d.y < point.y)) {
          continue;
        }
        // optimisation 2: line above point. no cross
        if ((iLine.o.y >= point.y) && (iLine.d.y >= point.y)) {
          continue;
        }
        // optimisation 3: vertical line case
        if ((iLine.o.x === iLine.d.x) && (iLine.o.x >= point.x)) {
          xi = iLine.o.x;
          // yi = point.y;
        }
        // calculate the intersection point
        else {
          b1 = 0;
          b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);
          a1 = point.y - b1 * point.x;
          a2 = iLine.o.y - b2 * iLine.o.x;

          xi = -(a1 - a2) / (b1 - b2);
          // yi = a1 + b1 * xi;
        }
        // dont count xi < point.x cases
        if (xi >= point.x) {
          xcount += 1;
        }
        // optimisation 4: specific for square images
        if (xcount === 2) {
          break;
        }
      }
      return xcount;
    };
    let jud = pointBox(point, lines);
    return jud;
  }

  // 文件图片公共函数
  const drawImg = (ctx: CanvasRenderingContext2D, canvasDom: HTMLCanvasElement, myCanvasDom: HTMLCanvasElement, ctx_1: CanvasRenderingContext2D, canvasClearDom: HTMLCanvasElement, canvasClearDom_1: HTMLCanvasElement, showShadow: boolean, transparency: number, types: number, shadowX: number, shadowY: number, blur: number, shaColor: string, cir: number,pointX:number,pointY:number,shapeX:number,shapeY:number,shadow:boolean) => {
    let img = new Image();
    // 控制器函数
    const drawFillRect = () => {
      ctx_1!.fillRect(originX.current - 5, originY.current - 5, 10, 10);
      ctx_1!.fillRect(originX.current + img.width / 2 * types - 5, originY.current - 5, 10, 10);
      ctx_1!.fillRect(originX.current + img.width / 2 * types - 10, originY.current - 50, 20, 20);
      ctx_1!.fillRect(originX.current + img.width * types - 5, originY.current - 5, 10, 10);
      ctx_1!.fillRect(originX.current + img.width * types - 5, originY.current - 5 + img.height / 2 * types, 10, 10);
      ctx_1!.fillRect(originX.current + img.width * types + 50, originY.current - 10 + img.height / 2 * types, 20, 20);
      ctx_1!.fillRect(originX.current - 5 + img.width * types, originY.current - 5 + img.height * types, 10, 10);
      ctx_1!.fillRect(originX.current - 5 + img.width / 2 * types, originY.current - 5 + img.height * types, 10, 10);
      ctx_1!.fillRect(originX.current - 5, originY.current - 5 + img.height * types, 10, 10);
      ctx_1!.fillRect(originX.current - 5, originY.current - 5 + img.height / 2 * types, 10, 10);
    };
    // 旋转函数
    const imgRotate = () => {
      ctx!.save();
      ctx_1!.save();
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
      ctx_1!.clearRect(0, 0, myCanvasDom!.width, myCanvasDom!.height);
      ctx!.translate(originX1.current, originY1.current);
      ctx_1!.translate(originX1.current, originY1.current);
      ctx!.rotate(Math.PI / 180 * cir);
      ctx_1!.rotate(Math.PI / 180 * cir);
      ctx!.translate(-(originX1.current), -(originY1.current));
      ctx_1!.translate(-(originX1.current), -(originY1.current));
      ctx_1!.strokeRect(originX.current, originY.current, img.width * types, img.height * types);
      drawFillRect();
      ctx!.drawImage(img, originX.current, originY.current, img.width * types, img.height * types);
      ctx!.restore();
      ctx_1!.restore();
    };
    let file = document.getElementById("file")!.files[0];
    if (!file) {
      return;
    }
    // 采用fileReader构造器将上传图片转化为64位编码
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let data: any = reader.result;
      img.src = data;
      img.onload = () => {
        ctx!.save();
        ctx!.beginPath();
        ctx!.rect(0 + pointX * 50, 0 + pointY * 50, 500 * (shapeX / 5), 500 * (shapeY / 5));
        ctx!.closePath();
        ctx!.clip();
        if (shadow) {
          ctx.shadowOffsetX = shadowX;
          ctx.shadowOffsetY = shadowY;
          ctx.shadowBlur = blur;
          ctx.shadowColor = shaColor;
        };
        img.style.display = 'none';
        ctx!.restore();
        // 旋转
        ctx!.globalAlpha = transparency;
        imgRotate();
      };
      // 检测像素点更改鼠标样式
      myCanvasDom!.addEventListener('mousemove', (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        const pixel = ctx!.getImageData(x, y, 1, 1);
        const base = pixel.data;
        if (base[3] / 255 !== 0) {
          myCanvasDom!.style.cursor = 'move';
        } else {
          myCanvasDom!.style.cursor = 'default';
        }
      })
      // 判断旋转是否同步
      if (beforeCir.current !== cir) {
        beforeCir.current = cir;
      } else {
        originX.current = img.offsetLeft;
        originY.current = img.offsetTop;
      };
      // 添加拖拽效果
      let isDown = false;
      myCanvasDom!.onmousedown = (e) => {
        // 获取鼠标点击坐标
        let x2 = e.offsetX;
        let y2 = e.offsetY;
        let jud = judge(originX.current, originY.current, img.width, img.height, x2, y2, cir);
        if (jud === 1) {
          if (isDown) {
            ctx_1!.save();
            ctx_1!.clearRect(0, 0, myCanvasDom!.width, myCanvasDom!.height);
            ctx_1!.translate(originX.current + img.width / 2 * types, originY.current + img.height / 2 * types);
            ctx_1!.rotate(Math.PI / 180 * cir);
            ctx_1!.translate(-(originX.current + img.width / 2 * types), -(originY.current + img.height / 2 * types));
            ctx_1!.strokeRect(originX.current, originY.current, img.width * types, img.height * types);
            drawFillRect();
            ctx_1!.restore();
          }
          myCanvasDom!.onmousemove = (e) => {
            isDown = false;
            originX.current = e.movementX + originX.current;
            originY.current = e.movementY + originY.current;
            originX1.current = originX.current + img.width / 2;
            originY1.current = originY.current + img.height / 2;
            ctx!.globalAlpha = transparency;
            imgRotate();
          }
        };
        myCanvasDom!.onmouseup = () => {
          myCanvasDom!.onmousemove = null;
        };
      };

      // 点击清除边框
      canvasClearDom!.onclick = () => {
        ctx_1!.clearRect(0, 0, myCanvasDom!.width, myCanvasDom!.height);
        isDown = true;

      };
      canvasClearDom_1!.onclick = () => {
        ctx_1!.clearRect(0, 0, myCanvasDom!.width, myCanvasDom!.height);
        isDown = true;
      };

      // 添加控制器功能
      myCanvasDom!.addEventListener('mousemove', (e) => {
        let x2 = e.offsetX;
        let y2 = e.offsetY;
        let jud = judge(originX.current - 5, originY.current - 5, 10, 10, x2, y2, cir);
        if (jud === 1) {
          myCanvasDom!.style.cursor = 'nw-resize';
        };
        let jud1 = judge(originX.current + img.width / 2 * types - 5, originY.current - 5, 10, 10, x2, y2, cir);
        if (jud1 === 1) {
          myCanvasDom!.style.cursor = 'n-resize'
        };
        let jud2 = judge(originX.current + img.width / 2 * types - 10, originY.current - 50, 20, 20, x2, y2, cir);
        if (jud2 === 1) {
          myCanvasDom!.style.cursor = 'col-resize'
        };
        let jud3 = judge(originX.current + img.width * types - 5, originY.current - 5, 10, 10, x2, y2, cir);
        if (jud3 === 1) {
          myCanvasDom!.style.cursor = 'ne-resize'
        };
        let jud4 = judge(originX.current + img.width * types - 5, originY.current - 5 + img.height / 2 * types, 10, 10, x2, y2, cir);
        if (jud4 === 1) {
          myCanvasDom!.style.cursor = 'e-resize'
        };
        let jud5 = judge(originX.current + img.width * types + 50, originY.current - 10 + img.height / 2 * types, 20, 20, x2, y2, cir);
        if (jud5 === 1) {
          myCanvasDom!.style.cursor = 'row-resize'
        };
        let jud6 = judge(originX.current - 5 + img.width * types, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir);
        if (jud6 === 1) {
          myCanvasDom!.style.cursor = 'nw-resize'
        };
        let jud7 = judge(originX.current - 5 + img.width / 2 * types, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir);
        if (jud7 === 1) {
          myCanvasDom!.style.cursor = 's-resize'
        };
        let jud8 = judge(originX.current - 5, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir);
        if (jud8 === 1) {
          myCanvasDom!.style.cursor = 'sw-resize'
        };
        let jud9 = judge(originX.current - 5, originY.current - 5 + img.height / 2 * types, 10, 10, x2, y2, cir);
        if (jud9 === 1) {
          myCanvasDom!.style.cursor = 'w-resize'
        };
      })

      // 吸色功能
      const colorPick = document.getElementById('color');
      const draw = document.getElementById('draw');
      draw!.onclick = function pick(e: any) {
        const x = e.offsetX;
        const y = e.offsetY;
        const pixel = ctx!.getImageData(x, y, 1, 1);
        const base = pixel.data;
        const rgba = `rgba(${base[0]}, ${base[1]}, ${base[2]}, ${base[3] / 255})`;
        colorPick!.style.background = rgba;
        canvasDom!.addEventListener('mousemove', pick);
      };
    };
  };

  return (
    <ContextData.Provider value={{ state, dispatch }}>
      <div className="App">
        <div className="topH">
          <ChangeComponent></ChangeComponent>
          <ChangeShadowComponent></ChangeShadowComponent>
          <ChangeTextBoxComponent></ChangeTextBoxComponent>
          <ChangeSizeBoxComponent></ChangeSizeBoxComponent>
          <ChangeLineBoxComponent></ChangeLineBoxComponent>
          <ChangeDashBoxComponent></ChangeDashBoxComponent>
          <ChangeColorBoxComponent></ChangeColorBoxComponent>
          <div className="obtain">
            <button id="draw">吸色</button>
            <div id="color"></div>
          </div>
          <ChangeLayerBoxComponent></ChangeLayerBoxComponent>
        </div>
        <div className="asiderL">
          <BlockComponent></BlockComponent>
          <RotateComponent></RotateComponent>
          <TileComponent></TileComponent>
          <TextComponent></TextComponent>
          <ClearComponent></ClearComponent>
          <ShadowComponent></ShadowComponent>
          <ShapeBoxComponent></ShapeBoxComponent>
        </div>
        <div className="huabu">
          <ul>
            <li>
              <canvas ref={canvasClear_1} className="cancel"></canvas>
            </li>
            <li>
              <canvas ref={canvas} width="800" height="700">浏览器不支持canvas</canvas>
              <canvas ref={myCanvas} id="myCanvas" width="800" height="700">浏览器不支持canvas</canvas>
            </li>
            <li>
              <canvas ref={canvasClear} className="cancel_1"></canvas>
            </li>
          </ul>
        </div>
      </div>
    </ContextData.Provider>
  )
}

export default App