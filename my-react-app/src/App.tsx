import React, { useState, useEffect, useRef } from 'react'
import { render } from 'react-dom';
import './App.less'


function App() {
  const canvas = useRef<HTMLCanvasElement>(null);

  // 公共选择声明
  let [show, setShow] = useState('');

  // 点击显示隐藏赋值
  let [isShow, setIsShow] = useState(false);

  // 顔色更改聲明
  let [colors, setColors] = useState('');

  // 图片缩放声明
  let [types, setTypes] = useState(1);

  // 图片透明度声明
  let [transparency, setTransparency] = useState(1);

  // 平铺声明
  let [tile, setTile] = useState(false);

  // 旋转声明
  let [cir, setCir] = useState(false);

  // 阴影声明
  let [shadow, setShadow] = useState(false);

  // 清空声明
  let [clear, setClear] = useState(false);

  const [angle, setAngle] = useState<number>(0)

  // 绘制矩形公共函数
  const drawRect = (ctx: CanvasRenderingContext2D, transparency: number, types: number) => {
    ctx!.globalAlpha = transparency;
    ctx!.fillStyle = colors;
    ctx!.fillRect(150, 150, 400 * types, 400 * types);
  };

  // 绘制三角公共函数
  const drawTriangle = (ctx: CanvasRenderingContext2D, transparency: number, types: number) => {
    ctx!.globalAlpha = transparency;
    ctx!.fillStyle = colors;
    ctx!.beginPath();
    ctx!.moveTo(150 * types, 150 * types);
    ctx!.lineTo(150 * types, 300 * types);
    ctx!.lineTo(300 * types, 300 * types);
    ctx!.fill();
  };

  // 绘制圆公共函数
  const drawCircle = (ctx: CanvasRenderingContext2D, transparency: number, types: number) => {
    ctx!.globalAlpha = transparency;
    ctx!.fillStyle = colors;
    ctx!.beginPath();
    ctx!.arc(300, 300, 150 * types, 0, 2 * Math.PI);
    ctx!.fill();
  };

  // 文件图片公共函数
  const drawImg = (ctx: CanvasRenderingContext2D, transparency: number, types: number, canvasDom: HTMLCanvasElement, showShadow: boolean) => {
    const shad = () => {
      ctx!.shadowOffsetX = 15;
      ctx!.shadowOffsetY = 15;
      ctx!.shadowBlur = 2;
      ctx!.shadowColor = "rgba(0, 0, 0, 0.5)";
    }
    let img = new Image();
    let file = document.getElementById("file")!.files[0];
    if (!file) {
      return;
    }
    const a_btn6 = document.getElementById("a-btn6");
    // 采用fileReader构造器将上传图片转化为64位编码
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let data: any = reader.result;
      img.src = data;
      img.onload = () => {
        showShadow && shad();
        // 添加拖拽效果
        a_btn6!.onclick = () => {
          let x = 0;
          let y = 0;
          canvasDom!.onclick = (e) => {
            x = e.offsetX - img.width / 2;
            y = e.offsetY - img.height / 2;
            // console.log(x, y);
          };
          setInterval(() => {
            ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
            ctx!.drawImage(img, x, y);
          }, 20);
        }
        ctx!.globalAlpha = transparency;
        ctx!.drawImage(img, 150, 150, img.width * types, img.height * types);
      }
    }
  };

  // 点击显示隐藏透明缩放颜色
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height)
    console.log(ctx?.fillStyle, typeof ctx?.fillStyle);

    ctx!.fillStyle = typeof ctx?.fillStyle === 'object' ? '#000' : ctx!.fillStyle;
    setTile(false)
    if (isShow) {
      switch (show) {
        case 'rect':
          drawRect(ctx!, transparency, types);
          break;
        case 'triangle':
          drawTriangle(ctx!, transparency, types);
          break;
        case 'circle':
          drawCircle(ctx!, transparency, types);
          break;
        case 'img':
          drawImg(ctx!, transparency, types, canvasDom!, shadow);
          break;
        default:
          return undefined;
      }

    } else {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
    }
  }, [isShow, show, transparency, types, colors, shadow, transparency, types]);

  // 平铺
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    if (tile) {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
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

  // 旋转
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    if (cir) {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height)
      let img = new Image();
      let file = document.getElementById("file")!.files[0];
      if (!file) {
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let data: any = reader.result;
        img.src = data;

        img.onload = () => {
          const jd = angle + Math.PI / 180 * 30

          setAngle(jd)
          ctx!.save()
          ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
          ctx!.translate(canvasDom!.width / 2, canvasDom!.height / 2);
          ctx!.rotate(Math.PI / 6 + jd);
          ctx!.translate(-canvasDom!.width / 2, -canvasDom!.height / 2);
          ctx!.drawImage(img, 0, 0);
          ctx!.restore();
        }
      }
    }
  }, [cir]);

  // 增加图片阴影
  // useEffect(() => {
  //   const canvasDom = canvas.current;
  //   const ctx = canvasDom!.getContext('2d');
  //   const shad = () => {
  //     ctx!.shadowOffsetX = 15;
  //     ctx!.shadowOffsetY = 15;
  //     ctx!.shadowBlur = 2;
  //     ctx!.shadowColor = "rgba(0, 0, 0, 0.5)";
  //   };
  //   if (shadow) {
  //     switch (show) {
  //       case 'rect':
  //         shad();
  //         drawRect(ctx!, transparency, types);
  //         break;
  //       case 'triangle':
  //         shad();
  //         drawTriangle(ctx!, transparency, types);
  //         break;
  //       case 'circle':
  //         shad();
  //         drawCircle(ctx!, transparency, types);
  //         break;
  //       case 'img':
  //         drawImg(ctx!, transparency, types, canvasDom!);
  //       default:
  //         return undefined;
  //     }
  //   }
  // }, [shadow, show, transparency, types]);

  // 清空画布
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    if (clear) {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height)
    }
  }, [clear])

  return (
    <div className="App">
      {/* 头部功能栏 */}
      <header>
        {/* 颜色更改模块 */}
        <div id="ys">
          <input onChange={(e) => { setColors(e.target.value) }} id="input" type="text" placeholder="请输入要改变的颜色" />
          <button id="btn" type="submit" >更改</button>
        </div>

        {/* 图片缩放模块 */}
        <div id="sf">
          <span>图片缩放</span>
          <input onChange={(e) => { setTypes(Number(e.target.value)) }} type="range" id="scale-range" min="0" max="2.0" step="0.01" defaultValue='1' />
        </div>
        {/* 增加透明度 */}
        <div id="transparency">
          <span>更改透明度</span>
          <input onChange={(e) => { setTransparency(Number(e.target.value)) }} type="range" id="tp-range" min="0" max="1.0" step="0.1" defaultValue='1' />
        </div>
      </header>

      {/* 侧边功能栏 */}
      <div id="aside" >
        <ul>
          <li>
            <button id="a-btn0" onClick={() => [setIsShow(!isShow), setShow('rect')]}>绘制矩形</button>
          </li>
          <li>
            <button id="a-btn1" onClick={() => [setIsShow(!isShow), setShow('triangle')]}>绘制三角形</button>
          </li>
          <li>
            <button id="a-btn2" onClick={() => [setIsShow(!isShow), setShow('circle')]}>绘制圆形</button>
          </li>
          <li>
            <input type="file" accept="image/*" id="file" placeholder="选择提交的照片" />
            <button onClick={() => [setIsShow(!isShow), setShow('img')]} id="a-btn3">确认选择/清除图片</button>
            <button onClick={() => { setCir(!cir) }} id="a-btn4">旋转</button><button onClick={() => { setTile(true) }} id="a-btn5">平铺</button>
          </li>
          <li>
            <button id="a-btn6">开启图片拖拽</button>
          </li>
          <li>
            <button onClick={() => { setShadow(!shadow) }} id="a-btn7">增加图片阴影</button>
          </li>
          <li>
            <button onClick={() => { setClear(!clear) }}>清空画布</button>
          </li>
        </ul>
      </div>

      <div className="huabu">
        <canvas ref={canvas} width="700" height="700">浏览器不支持canvas</canvas>
      </div>
    </div>
  )
}

export default App
function shad() {
  throw new Error('Function not implemented.');
}

