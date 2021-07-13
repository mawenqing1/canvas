import React, { useState, useEffect, useRef } from 'react'
import { render } from 'react-dom';
import './App.less'
type IAlign = "start" | "center" | "end" | "left" | "right";
type BaseLine = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";
type TextDir = "inherit" | "ltr" | "rtl";
type Cap = "butt" | "round" | "square";
// 更改颜色透明度大小组件
function Change(props: any) {
  const { changeHandler } = props;
  const [colors, setColors] = useState<string>('');
  const [transparency, setTransparency] = useState<number>(1);
  const [types, setTypes] = useState<number>(1);

  useEffect(() => {
    changeHandler(colors, transparency, types)
  }, [transparency, types, colors]);

  return (
    <header className="Change">
      {/* 颜色更改模块 */}
      <div id="ys" >
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
  )

};
// 点击显示隐藏组件
function Block(props: any) {
  const { asider } = props;

  return (
    <div id="aside" className="Block" >
      <ul>
        <li>
          <button id="a-btn0" onClick={() => asider('rect')}>绘制矩形</button>
        </li>
        <li>
          <button id="a-btn1" onClick={() => asider('triangle')}>绘制三角形</button>
        </li>
        <li>
          <button id="a-btn2" onClick={() => asider('circle')}>绘制圆形</button>
        </li>
        <li>
          <button onClick={() => asider('line')}>绘制线条</button>
        </li>
        <li>
          <button onClick={() => asider('arc')}>绘制圆弧</button>
        </li>
        <li>
          <button onClick={() => asider('qctwo')}>绘制二次贝塞尔曲线</button>
        </li>
        <li>
          <button onClick={() => asider('qcthree')}>绘制三次贝塞尔曲线</button>
        </li>
        <li>
          <input type="file" accept="image/*" id="file" placeholder="选择提交的照片" />
          <button onClick={() => asider('img')} id="a-btn3">确认选择/清除图片</button>
          <button id="a-btn6">开启图片拖拽</button>
        </li>
      </ul>
    </div>
  )
};
// 旋转组件
function RoteBox(props: any) {
  const { rots, cir } = props;

  return (
    <div className="RoteBox">
      <button onClick={() => rots(!cir)} id="a-btn4">旋转</button>
    </div>
  )
};

// 平铺组件
function TileBox(props: any) {
  const { changeTile } = props;

  return (
    <div className="TileBox">
      <button onClick={() => changeTile(true)} id="a-btn5">平铺</button>
    </div>
  )
};

// 绘制文本组件
function Texts(props: any) {
  const { changeText } = props;
  let [increase, setIncrease] = useState<boolean>(false);
  return (
    <div className="Texts">
      <input onChange={(e) => changeText(e.target.value)} type="text" placeholder="输入想要添加的文字" />
      <button onClick={() => changeText(!increase)}>添加文字</button>
    </div>
  )
};

// 清空画布组件
function Clear(props: any) {
  const { changeClear } = props;
  const [clear, setClear] = useState<boolean>(false);

  return (
    <div className="Clear">
      <button onClick={() => changeClear(!clear)}>清空画布</button>
    </div>
  )
};

// 增加阴影组件
function ShadowBox(props: any) {
  const { changeShadow } = props;
  const [shadow, setShadow] = useState(false);

  return (
    <div className="ShadowBox">
      <button onClick={() => { changeShadow(!shadow) }}>添加阴影</button>
    </div>
  )
};

// 修改阴影组件
function ChangeBox(props: any) {
  const { ChangeShadowBox } = props;

  return (
    <div className="ChangeBox">
      <ul>
        <li><input onChange={(e) => ChangeShadowBox('offX', e.target.value)} type="text" placeholder="横向阴影" /></li>
        <li><input onChange={(e) => ChangeShadowBox('offY', e.target.value)} type="text" placeholder="纵向阴影" /></li>
        <li><input onChange={(e) => ChangeShadowBox('blurs', e.target.value)} type="text" placeholder="模糊程度" /></li>
        <li><input onChange={(e) => ChangeShadowBox('setcolor', e.target.value)} type="text" placeholder="阴影颜色" /></li>
      </ul>
    </div>
  )
};

// 文本对齐组件
function ChangeTextBox(props: any) {
  const { alignment } = props;
  return (
    <div className="ChangeTextBox">
      <ul>
        <li>
          <p>文本对齐选项</p>
          <select onChange={(e) => alignment('texts', e.target.value)}>
            <option value="start">start</option>
            <option value="end">end</option>
            <option value="left">left</option>
            <option value="right">right</option>
            <option value="center">center</option>
          </select>
        </li>
        <li>
          <p>基线对齐选项</p>
          <select onChange={(e) => alignment('bases', e.target.value)}>
            <option value="alphabetic">alphabetic</option>
            <option value="top">top</option>
            <option value="hanging">hanging</option>
            <option value="middle">middle</option>
            <option value="ideographic">ideographic</option>
            <option value="bottom">bottom</option>
          </select></li>
        <li>
          <p>文本方向</p>
          <select onChange={(e) => alignment('textDir', e.target.value)}>
            <option value="inherit">inherit</option>
            <option value="ltr">ltr</option>
            <option value="rtl">rtl</option>
          </select>
        </li>
      </ul>



    </div>
  )
};

// 更改线型组件
function ChangeLine(props: any) {
  const { lineStyle } = props;

  return (
    <div className="ChangeLine">
      <ul>
        <li><p>设置线宽</p>
          <input onChange={(e) => lineStyle('lineWidth', e.target.value)} type="text" placeholder="输入数字" /></li>
        <li><p>设置末端样式</p>
          <select onChange={(e) => lineStyle('type', e.target.value)}>
            <option value="butt">方形</option>
            <option value="round">圆形</option>
            <option value="square">区域</option>
          </select></li>
      </ul>
    </div>
  )
};

// 修改文本字体大小组件
function ChangeBig(props: any) {
  const { fontSize } = props;

  return (
    <div className="ChangeBig">
      <p>字号</p>
      <input onChange={(e) => fontSize(e.target.value)} type="text" placeholder="输入数字" />
    </div>
  )
};

// 图片剪裁组件
function ChangeShape(props: any) {
  const { shape } = props;

  return (
    <div className="ChangeShape">
      <ul>
        <li>
          <p>切片X</p>
          <input onChange={(e) => shape('shapeOffX', e.target.value)} type="range" step="0.1" min="1" max="10" defaultValue='10' />
        </li>
        <li>
          <p>切片Y</p>
          <input onChange={(e) => shape('shapeOffY', e.target.value)} type="range" step="0.1" min="1" max="10" defaultValue='10' />
        </li>
        <li>
          <p>原点坐标X</p>
          <input onChange={(e) => shape('originX', e.target.value)} type="range" step="0.5" min="0" max="5" defaultValue='0' />
        </li>
        <li>
          <p>原点坐标Y</p>
          <input onChange={(e) => shape('originY', e.target.value)} type="range" step="0.5" min="0" max="5" defaultValue='0' />
        </li>
      </ul>
    </div>
  )
};

// 虚线修改组件
function ChangeDash(props: any) {
  const { drawDash } = props;

  return (
    <div className="ChangeDash">
      <ul>
        <li>
          <p>虚线中实线长度</p>
          <input onChange={(e) => drawDash('solids',e.target.value)} type="text"  placeholder="请输入数字" />
        </li>
        <li>
          <p>虚线中空白长度</p>
          <input onChange={(e) => drawDash('dottdeds',e.target.value)} type="text" placeholder="请输入数字" />
        </li>
        <li>
          <p>虚线起始偏移</p>
          <input onChange={(e) => drawDash('deviations',e.target.value)} type="text" placeholder="请输入数字" />
        </li>
      </ul>
    </div>
  )
};

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

  // 平铺旋转声明
  let [tile, setTile] = useState(false);
  const [cir, setCir] = useState<boolean>(false);
  const [angle, setAngle] = useState<number>(0);

  // 阴影声明
  let [shadow, setShadow] = useState(false);

  // 绘制文本声明
  let [tex, setTex] = useState('');
  let [increase, setIncrease] = useState(false);

  // 清空声明
  let [clear, setClear] = useState(false);

  // 修改阴影声明
  const [shadowX, setShadowX] = useState<number>(10);
  const [shadowY, setShadowY] = useState<number>(10);
  const [blur, setBlur] = useState<number>(10);
  const [shaColor, setShaColor] = useState<string>('pink');

  // 修改文本声明
  const [align, setAlign] = useState<IAlign>('start');
  const [baseline, setBaseline] = useState<BaseLine>('alphabetic');
  const [textDirection, setTextDirection] = useState<TextDir>('inherit');

  // 修改线型声明
  const [lwidth, setLwidth] = useState<number>(1);
  const [cap, setCap] = useState<Cap>('butt');

  // 修改字体大小声明
  const [size, setSize] = useState<number>(48);

  // 切片声明
  const [shapeX, setShapeX] = useState<number>(10);
  const [shapeY, setShapeY] = useState<number>(10);
  const [pointX, setPointX] = useState<number>(0);
  const [pointY, setPointY] = useState<number>(0);

  // 虚线声明
  const [solid, setSolid] = useState<number>(0);
  const [dotted, setDotted] = useState<number>(0);
  const [deviation,setDeviation] = useState<number>(0);

  // 点击显示隐藏
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
    ctx!.fillStyle = typeof ctx!.fillStyle === 'object' ? '#000' : ctx!.fillStyle;
    ctx!.save();
    ctx!.beginPath();
    ctx!.rect(0 + pointX * 10, 0 + pointY * 10, 500 * (shapeX / 5), 500 * (shapeY / 5));
    ctx!.stroke();
    ctx!.closePath();
    ctx!.clip();

    setTile(false)
    if (isShow) {
      switch (show) {
        case 'rect':
          drawRect(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor);
          break;
        case 'triangle':
          drawTriangle(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor);
          break;
        case 'circle':
          drawCircle(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor);
          break;
        case 'line':
          drawLine(ctx!, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, lwidth, cap,solid,dotted,deviation);
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
          drawImg(ctx!, canvasDom!, shadow, transparency, types, shadowX, shadowY, blur, shaColor);
          break;
        default:
          return undefined;
      }

    } else {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
    }
    ctx!.restore();
  }, [isShow, show, shadow, transparency, types, shadowX, shadowY, blur, shaColor, lwidth, cap, shapeX, shapeY, pointY, pointX,cap,solid,dotted,deviation]);

  // 旋转组件
  let jd: number = 30;
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
          jd = angle + Math.PI / 180 * 30

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
  // 平铺组件
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
  // 绘制文本组件
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    if (!increase) {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
      if (shadow) {
        ctx!.shadowOffsetX = shadowX;
        ctx!.shadowOffsetY = shadowY;
        ctx!.shadowBlur = blur;
        ctx!.shadowColor = shaColor;
      };
      ctx!.textAlign = align;
      ctx!.textBaseline = baseline;
      ctx!.font = `${size}px serif`;
      ctx!.direction = textDirection;
      // const newTex = textDirection === 'rtl' ? tex.split('').reverse().join('') : tex;
      ctx!.fillText(tex, 400, 100);
    }
  }, [tex, increase, align, baseline, textDirection, size])

  // 清空画布组件
  useEffect(() => {
    const canvasDom = canvas.current;
    const ctx = canvasDom!.getContext('2d');
    if (clear) {
      ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height)
    }
  }, [clear]);

  // 绘制矩形公共函数
  const drawRect = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx!.globalAlpha = transparency;
    ctx!.fillStyle = colors;
    ctx!.fillRect(150, 150, 400 * types, 400 * types);

  };

  // 绘制三角公共函数
  const drawTriangle = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx!.globalAlpha = transparency;
    ctx!.fillStyle = colors;
    ctx!.beginPath();
    ctx!.moveTo(150 * types, 150 * types);
    ctx!.lineTo(150 * types, 300 * types);
    ctx!.lineTo(300 * types, 300 * types);
    ctx!.fill();
  };

  // 绘制线条公共函数
  const drawLine = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string, lwidth: number, cap: Cap,solid:number, dotted:number,deviation:number) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };

    ctx!.beginPath();
    ctx!.setLineDash([solid, dotted]);
    ctx!.lineDashOffset = deviation;
    ctx!.lineWidth = lwidth;
    ctx!.lineCap = cap;
    ctx!.moveTo(150 * types, 150 * types);
    ctx!.lineTo(150 * types, 300 * types);
    ctx!.stroke();
  };

  // 绘制圆弧公共函数
  const drawArc = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx!.globalAlpha = transparency;
    ctx!.fillStyle = colors;
    ctx!.beginPath();
    ctx!.arc(100, 100, 100 * types, 0, Math.PI * types, true);
    ctx.stroke();
  };

  // 绘制圆公共函数
  const drawCircle = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx!.globalAlpha = transparency;
    ctx!.fillStyle = colors;
    ctx!.beginPath();
    ctx!.arc(300, 300, 150 * types, 0, 2 * Math.PI);
    ctx!.fill();
  };

  // 绘制二次贝塞尔曲线
  const drawQctwo = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx!.globalAlpha = transparency;
    ctx!.fillStyle = colors;
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25 * types, 25 * types, 25 * types, 62.5 * types);
    ctx.quadraticCurveTo(25 * types, 100 * types, 50 * types, 100 * types);
    ctx.stroke();
  };

  // 绘制三次贝塞尔曲线
  const drawQcthree = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx!.globalAlpha = transparency;
    ctx!.fillStyle = colors;
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.bezierCurveTo(75 * types, 37 * types, 70 * types, 25 * types, 50 * types, 25 * types);
    ctx.bezierCurveTo(20 * types, 25 * types, 20 * types, 62.5 * types, 20 * types, 62.5 * types);
    ctx.fill();
  };

  // 文件图片公共函数
  const drawImg = (ctx: CanvasRenderingContext2D, canvasDom: HTMLCanvasElement, showShadow: boolean, transparency: number, types: number, shadowX: number, shadowY: number, blur: number, shaColor: string) => {
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
        ctx!.save();
        ctx!.beginPath();
        ctx!.rect(0 + pointX * 10, 0 + pointY * 10, 500 * (shapeX / 5), 500 * (shapeY / 5));
        ctx!.stroke();
        ctx!.closePath();
        ctx!.clip();
        if (shadow) {
          ctx.shadowOffsetX = shadowX;
          ctx.shadowOffsetY = shadowY;
          ctx.shadowBlur = blur;
          ctx.shadowColor = shaColor;
        };
        // 添加拖拽效果
        a_btn6!.onclick = () => {
          let x = 0;
          let y = 0;
          canvasDom!.onclick = (e) => {
            x = e.offsetX - img.width / 2;
            y = e.offsetY - img.height / 2;
          };
          setInterval(() => {
            ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
            ctx!.drawImage(img, x, y);
          }, 20);
        };
        ctx!.globalAlpha = transparency;
        ctx!.drawImage(img, 150, 150, img.width * types, img.height * types);
        ctx.restore();
      }
    }
  };

  const changeHandler = (colors: string, transparency: number, types: number) => {
    setColors(colors);
    setTransparency(transparency);
    setTypes(types);
  };

  const asider = (show: string, shadow: boolean) => {
    setIsShow(!isShow);
    setShow(show);
    setShadow(shadow);
  };

  const rots = (cir: boolean, angle: number) => {
    setCir(cir);
  };

  const changeTile = (tile: boolean) => {
    setTile(true);
  };

  const changeText = (tex: string, increase: boolean) => {
    setTex(tex);
    setIncrease(increase);
  };

  const changeClear = (clear: boolean) => {
    setClear(clear);
  };

  const changeShadow = (shadow: boolean) => {
    setShadow(shadow);
  };

  const ChangeShadowBox = (type: string, value: number | string) => {
    if (type === 'offX') {
      setShadowX(value as number);
    } else if (type === 'offY') {
      setShadowY(value as number);
    } else if (type === 'blurs') {
      setBlur(value as number);
    } else {
      setShaColor(value as string);
    }
  };

  const alignment = (type: string, value: IAlign | BaseLine | TextDir) => {
    if (type === 'texts') {
      setAlign(value as IAlign);
    } else if (type === 'bases') {
      setBaseline(value as BaseLine);
    } else {
      setTextDirection(value as TextDir);
    }
  };

  const lineStyle = (type: string, value: Cap | number) => {
    if (type === 'type') {
      setCap(value as Cap);
    } else {
      setLwidth(value as number);
    }
  };

  const fontSize = (size: number) => {
    setSize(size);
  };

  const shape = (type: string, value: number) => {
    if (type === 'shapeOffX') {
      setShapeX(value);
    } else if (type === 'shapeOffY') {
      setShapeY(value);
    } else if (type === 'originX') {
      setPointX(value);
    } else {
      setPointY(value);
    }
  };

  const drawDash = (type:string,value:number) => {
    if(type === 'solids') {
      setSolid(value);
    }else if(type === 'dottdeds') {
      setDotted(value);
    }else{
      setDeviation(value);
    }
  };

  return (
    <div className="App">
      <div className="topH">
        <Change changeHandler={changeHandler} />
        <ChangeBox ChangeShadowBox={ChangeShadowBox} />
        <ChangeTextBox alignment={alignment} />
        <ChangeBig fontSize={fontSize} />
        <ChangeLine lineStyle={lineStyle} />
        <ChangeDash drawDash={drawDash} />
      </div>
      <div className="asiderL">
        <Block asider={asider} />
        <RoteBox rots={rots} cir={cir} />
        <TileBox changeTile={changeTile} />
        <Texts changeText={changeText} />
        <Clear changeClear={changeClear} />
        <ShadowBox changeShadow={changeShadow} />
        <ChangeShape shape={shape} />
      </div>

      <div className="huabu">
        <canvas ref={canvas} width="700" height="700">浏览器不支持canvas</canvas>
      </div>
    </div>
  )
}

export default App


