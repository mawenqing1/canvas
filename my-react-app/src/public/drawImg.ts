import judge from '../judge';
import drawFillRect from '../controls/drawFillRect'

interface IProps {
  showShadow: boolean;
  transparency: number;
  types: number;
  shadowX: number;
  shadowY: number;
  blur: number;
  shaColor: string;
  cir: number;
  pointX: number;
  pointY: number;
  shapeX: number;
  shapeY: number;
  shadow: boolean;
  imgW: number;
  imgH: number;
}
// 文件图片公共函数
const drawImg = (ctx: CanvasRenderingContext2D, canvasDom: HTMLCanvasElement, myCanvasDom: HTMLCanvasElement, ctx_1: CanvasRenderingContext2D, canvasClearDom: HTMLCanvasElement, canvasClearDom_1: HTMLCanvasElement, state: IProps, originX: { current: number; }, originY: { current: number; }, originX1: { current: number; }, originY1: { current: number; }, beforeCir: { current: number; }, callback: (data: any) => void) => {
  const { shadow, transparency, types, shadowX, shadowY, blur, shaColor, cir, pointX, pointY, shapeX, shapeY, imgW, imgH } = state
  let img = new Image();
  let imgWidth = imgW || img.width;
  let imgHeight = imgH || img.height;

  // 旋转函数
  const imgRotate = () => {
    imgWidth = imgWidth ? imgWidth : imgW || img.width;
    imgHeight = imgHeight ? imgHeight : imgH || img.height;
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
    ctx_1!.strokeRect(originX.current, originY.current, imgWidth * types, imgHeight * types);
    drawFillRect(ctx_1, originX, originY, imgWidth, imgHeight, types);
    ctx!.drawImage(img, originX.current, originY.current, imgWidth * types, imgHeight * types);
    ctx!.restore();
    ctx_1!.restore();
  };
  // 控制器重绘
  const control = (imgWidth: number, imgHeight: number) => {
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
    ctx_1!.strokeRect(originX.current, originY.current, imgWidth, imgHeight);
    drawFillRect(ctx_1, originX, originY, imgWidth, imgHeight, types);
    ctx!.drawImage(img, originX.current, originY.current, imgWidth, imgHeight);
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
      let jud = judge(originX.current, originY.current, imgWidth, imgHeight, x2, y2, cir, originX1, originY1);
      if (jud === 1) {
        if (isDown) {
          ctx_1!.save();
          ctx_1!.clearRect(0, 0, myCanvasDom!.width, myCanvasDom!.height);
          ctx_1!.translate(originX.current + imgWidth / 2 * types, originY.current + imgHeight / 2 * types);
          ctx_1!.rotate(Math.PI / 180 * cir);
          ctx_1!.translate(-(originX.current + imgWidth / 2 * types), -(originY.current + imgHeight / 2 * types));
          ctx_1!.strokeRect(originX.current, originY.current, imgWidth * types, imgHeight * types);
          drawFillRect(ctx_1, originX, originY, imgWidth, imgHeight, types);
          ctx_1!.restore();
        }
        myCanvasDom!.onmousemove = (e) => {
          isDown = false;
          originX.current = e.movementX + originX.current;
          originY.current = e.movementY + originY.current;
          originX1.current = originX.current + imgWidth / 2;
          originY1.current = originY.current + imgHeight / 2;
          ctx!.globalAlpha = transparency;
          console.log(imgWidth);
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

    // 添加控制器鼠标样式
    myCanvasDom!.addEventListener('mousemove', (e) => {
      let x2 = e.offsetX;
      let y2 = e.offsetY;
      let jud = judge(originX.current - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud === 1) {
        if (0 <= cir && cir <= 30 || 150 < cir && cir <= 180 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'nw-resize';
        } else if (30 < cir && cir <= 60 || 180 < cir && cir <= 210) {
          myCanvasDom!.style.cursor = 'n-resize';
        } else if (120 < cir && cir <= 150 || 300 < cir && cir <= 330) {
          myCanvasDom!.style.cursor = 'e-resize'
        } else {
          myCanvasDom!.style.cursor = 'ne-resize'
        }
      };
      let jud1 = judge(originX.current + img.width / 2 * types - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud1 === 1) {
        if (0 <= cir && cir <= 30 || 150 < cir && cir <= 180 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'n-resize';
        } else if (30 < cir && cir <= 60 || 180 < cir && cir <= 210) {
          myCanvasDom!.style.cursor = 'w-resize';
        } else if (120 < cir && cir <= 150 || 300 < cir && cir <= 330) {
          myCanvasDom!.style.cursor = 's-resize'
        } else {
          myCanvasDom!.style.cursor = 'w-resize'
        }
      };
      let jud2 = judge(originX.current + img.width / 2 * types - 10, originY.current - 50, 20, 20, x2, y2, cir, originX1, originY1);
      if (jud2 === 1) {
        myCanvasDom!.style.cursor = 'col-resize';
      };
      let jud3 = judge(originX.current + img.width * types - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud3 === 1) {
        if (0 <= cir && cir <= 30 || 150 < cir && cir <= 180 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'ne-resize';
        } else if (30 < cir && cir <= 60 || 180 < cir && cir <= 210) {
          myCanvasDom!.style.cursor = 'e-resize';
        } else if (120 < cir && cir <= 150 || 300 < cir && cir <= 330) {
          myCanvasDom!.style.cursor = 'n-resize'
        } else {
          myCanvasDom!.style.cursor = 'nw-resize'
        }
      };
      let jud4 = judge(originX.current + img.width * types - 5, originY.current - 5 + img.height / 2 * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud4 === 1) {
        if (0 <= cir && cir <= 30 || 150 < cir && cir <= 180 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'e-resize';
        } else if (30 < cir && cir <= 60 || 180 < cir && cir <= 210) {
          myCanvasDom!.style.cursor = 's-resize';
        } else if (120 < cir && cir <= 150 || 300 < cir && cir <= 330) {
          myCanvasDom!.style.cursor = 'w-resize'
        } else {
          myCanvasDom!.style.cursor = 's-resize'
        }
      };
      let jud5 = judge(originX.current + img.width * types + 50, originY.current - 10 + img.height / 2 * types, 20, 20, x2, y2, cir, originX1, originY1);
      if (jud5 === 1) {
        myCanvasDom!.style.cursor = 'row-resize'
      };
      let jud6 = judge(originX.current - 5 + img.width * types, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud6 === 1) {
        if (0 <= cir && cir <= 30 || 150 < cir && cir <= 180 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'nw-resize';
        } else if (30 < cir && cir <= 60 || 180 < cir && cir <= 210) {
          myCanvasDom!.style.cursor = 'n-resize';
        } else if (120 < cir && cir <= 150 || 300 < cir && cir <= 330) {
          myCanvasDom!.style.cursor = 'e-resize'
        } else {
          myCanvasDom!.style.cursor = 'ne-resize'
        }
      };
      let jud7 = judge(originX.current - 5 + img.width / 2 * types, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud7 === 1) {
        if (0 <= cir && cir <= 30 || 150 < cir && cir <= 180 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 's-resize';
        } else if (30 < cir && cir <= 60 || 180 < cir && cir <= 210) {
          myCanvasDom!.style.cursor = 'w-resize';
        } else if (120 < cir && cir <= 150 || 300 < cir && cir <= 330) {
          myCanvasDom!.style.cursor = 's-resize'
        } else {
          myCanvasDom!.style.cursor = 'w-resize'
        }
      };
      let jud8 = judge(originX.current - 5, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud8 === 1) {
        if (0 <= cir && cir <= 30 || 150 < cir && cir <= 180 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'sw-resize';
        } else if (30 < cir && cir <= 60 || 180 < cir && cir <= 210) {
          myCanvasDom!.style.cursor = 'w-resize';
        } else if (120 < cir && cir <= 150 || 300 < cir && cir <= 330) {
          myCanvasDom!.style.cursor = 'n-resize'
        } else {
          myCanvasDom!.style.cursor = 'nw-resize'
        }
      };
      let jud9 = judge(originX.current - 5, originY.current - 5 + img.height / 2 * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud9 === 1) {
        if (0 <= cir && cir <= 30 || 150 < cir && cir <= 180 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'w-resize';
        } else if (30 < cir && cir <= 60 || 180 < cir && cir <= 210) {
          myCanvasDom!.style.cursor = 's-resize';
        } else if (120 < cir && cir <= 150 || 300 < cir && cir <= 330) {
          myCanvasDom!.style.cursor = 'w-resize'
        } else {
          myCanvasDom!.style.cursor = 's-resize'
        }
      };
    });

    // 添加控制器镜像翻转功能
    myCanvasDom!.addEventListener('click', (e) => {
      let x2 = e.offsetX;
      let y2 = e.offsetY;

      let jud2 = judge(originX.current + img.width / 2 * types - 10, originY.current - 50, 20, 20, x2, y2, cir, originX1, originY1);
      if (jud2 === 1) {
        ctx!.save();
        ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
        ctx!.translate(originX1.current, originY1.current);
        ctx!.scale(-1, 1);
        ctx!.translate(-(originX1.current), -(originY1.current));
        ctx!.drawImage(img, originX.current, originY.current, img.width * types, img.height * types);
        ctx!.restore();
      };

      let jud5 = judge(originX.current + img.width * types + 50, originY.current - 10 + img.height / 2 * types, 20, 20, x2, y2, cir, originX1, originY1);
      if (jud5 === 1) {
        ctx!.save();
        ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
        ctx!.translate(originX1.current, originY1.current);
        ctx!.scale(1, -1);
        ctx!.translate(-(originX1.current), -(originY1.current));
        ctx!.drawImage(img, originX.current, originY.current, img.width * types, img.height * types);
        ctx!.restore();
      };
    });

    // 添加控制器缩放功能
    myCanvasDom!.addEventListener('mousedown', (e) => {
      let x2 = e.offsetX;
      let y2 = e.offsetY;
      imgWidth = imgWidth ? imgWidth : imgW || img.width;
      imgHeight = imgHeight ? imgHeight : imgH || img.height;
      let jud = judge(originX.current - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud === 1) {
        myCanvasDom!.onmousemove = (e) => {
          if (0 <= cir && cir <= 60 || 300 < cir && cir <= 360) {
            let scale = (e.movementX + e.movementY) / 2;
            originX.current = scale + originX.current;
            originY.current = scale + originY.current;
            imgWidth += -scale * 2;
            imgHeight += -scale * 2;
            callback({ imgW: imgWidth, imgH: imgHeight })
            control(imgWidth, imgHeight);
          } else if (60 < cir && cir <= 120) {
            let scale = (e.movementX - e.movementY) / 2;
            originY.current = -scale + originY.current;
            originX.current = -scale + originX.current;
            img.width += scale * 2;
            img.height += scale * 2;
            control();
          } else if (120 < cir && cir <= 190) {
            let scale = (e.movementX + e.movementY) / 2;
            originY.current = -scale + originY.current;
            originX.current = -scale + originX.current;
            img.width += scale * 2;
            img.height += scale * 2;
            control();
          } else {
            let scale = (e.movementX - e.movementY) / 2;
            originX.current = scale + originX.current;
            originY.current = scale + originY.current;
            img.width += -scale * 2;
            img.height += -scale * 2;
            control();
          }
        }
      };
      let jud1 = judge(originX.current + img.width / 2 * types - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud1 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          originY.current = e.movementY + originY.current;
          img.height += -e.movementY;
          control();
        }
      };
      let jud3 = judge(originX.current + img.width * types - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud3 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          let scale = (e.movementX - e.movementY) / 2;
          originY.current = -scale + originY.current;
          originX.current = -scale + originX.current;
          img.width += scale * 2;
          img.height += scale * 2;
          control();
        }
      };
      let jud4 = judge(originX.current + img.width * types - 5, originY.current - 5 + img.height / 2 * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud4 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          img.width += e.movementX;
          control();
        }
      };
      let jud6 = judge(originX.current - 5 + img.width * types, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud6 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          let scale = (e.movementX + e.movementY) / 2;
          originY.current = -scale + originY.current;
          originX.current = -scale + originX.current;
          img.width += scale * 2;
          img.height += scale * 2;
          control();
        }
      };
      let jud7 = judge(originX.current - 5 + img.width / 2 * types, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud7 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          img.height += e.movementY;
          control();
        }
      };
      let jud8 = judge(originX.current - 5, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud8 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          let scale = (e.movementX - e.movementY) / 2;
          originX.current = scale + originX.current;
          originY.current = scale + originY.current;
          img.width += -scale * 2;
          img.height += -scale * 2;
          control();
        }
      };
      let jud9 = judge(originX.current - 5, originY.current - 5 + img.height / 2 * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud9 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          originX.current = e.movementX + originX.current;
          img.width += -e.movementX;
          control();
        }
      };
      myCanvasDom!.onmouseup = () => {
        myCanvasDom!.onmousemove = null;
      }
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

export default drawImg