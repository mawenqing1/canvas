import React, { useEffect, useRef, useReducer } from 'react'
import { initData, reducer, ContextData } from './canvasPublic/initData'
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
import FabricBoxComponent from './component/FabricBox'
import drawRect from './canvasPublic/drawRect'
import drawTriangle from './canvasPublic/drawTriangle'
import drawLine from './canvasPublic/drawLine'
import drawArc from './canvasPublic/drawArc'
import drawCircle from './canvasPublic/drawCircle'
import drawQctwo from './canvasPublic/drawQctwo'
import drawQcthree from './canvasPublic/drawQcthree'
import drawImg from './canvasPublic/drawImg'

function Home() {
  const [state, dispatch] = useReducer(reducer, initData);
  const { isShow, show, colors, types, transparency, cir, tile, tex, clear, shadow, shadowX, shadowY, blur, shaColor, align, baseline, textDirection, lwidth, cap, size, fonts, shapeX, shapeY, pointX, pointY, solid, dotted, deviation, start, end, layers } = state;

  let canvas = useRef<HTMLCanvasElement>(null);
  let myCanvas = useRef<HTMLCanvasElement>(null);
  let canvasClear = useRef<HTMLCanvasElement>(null);
  let canvasClear_1 = useRef<HTMLCanvasElement>(null);
  let originX = useRef<number>(0);
  let originY = useRef<number>(0);
  let originX1 = useRef<number>(0)
  let originY1 = useRef<number>(0)
  let beforeCir = useRef<number>(0);

  // ????????????????????????????????????????????????
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
          if (ctx) {
            drawRect({ ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, start, end, layers });
          };
          break;
        case 'triangle':
          if (ctx) {
            drawTriangle({ ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, start, end, layers });
          };
          break;
        case 'circle':
          if (ctx) {
            drawCircle({ ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, start, end, layers });
          };
          break;
        case 'line':
          if (ctx) {
            drawLine({ ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, lwidth, cap, solid, dotted, deviation });
          };
          break;
        case 'arc':
          if (ctx) {
            drawArc({ ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor });
          };
          break;
        case 'qctwo':
          if (ctx) {
            drawQctwo({ ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor });
          };
          break;
        case 'qcthree':
          if (ctx) {
            drawQcthree({ ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor });
          };
          break;
        case 'img':
          const callback = (data: { imgW: number, imgH: number }) => {
            dispatch({
              type: 'changeState',
              data
            })
          }
          if (ctx && canvasDom && myCanvasDom && ctx_1 && canvasClearDom && canvasClearDom_1) {
            drawImg({ ctx, canvasDom, myCanvasDom, ctx_1, canvasClearDom, canvasClearDom_1, state, originX, originY, originX1, originY1, beforeCir, callback })
          };
          break;
        default:
          return undefined;
      }
    } else {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
    }
    ctx!.restore();
  }, [isShow, show, shadow, transparency, types, shadowX, shadowY, blur, shaColor, lwidth, cap, shapeX, shapeY, pointY, pointX, cap, solid, dotted, deviation, start, end, layers, cir]);

  // ????????????
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    const myCanvasDom = myCanvas.current;
    const ctx_1 = myCanvasDom!.getContext('2d');
    if (tile) {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
      ctx_1!.clearRect(0, 0, myCanvasDom!.width, myCanvasDom!.height);
      let img = new Image();
      const fileDom = document.getElementById('file') as HTMLInputElement;

      if (!fileDom || !fileDom.files || !fileDom.files.length) {
        return
      };

      const file = fileDom.files[0]
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
  // ??????????????????
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

  // ??????????????????
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    if (clear) {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height)
    }
  }, [clear]);

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
            <button id="draw">??????</button>
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
              <canvas ref={canvasClear_1} width="200" height="700" className="cancel"></canvas>
            </li>
            <li>
              <canvas ref={canvas} id="canvas" width="800" height="700">??????????????????canvas</canvas>
              <canvas ref={myCanvas} id="myCanvas" width="800" height="700">??????????????????canvas</canvas>
            </li>
            <li>
              <canvas ref={canvasClear} width="200" height="700" className="cancel_1"></canvas>
            </li>
          </ul>
        </div>
        <FabricBoxComponent></FabricBoxComponent>
      </div>
    </ContextData.Provider>
  )
}

export default Home
