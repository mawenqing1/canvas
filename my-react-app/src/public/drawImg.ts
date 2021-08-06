import judge from '../judge';
import drawFillRect from '../controls/drawFillRect'
import {IProps,Img} from '../interface/interface'


// 文件图片公共函数
const drawImg = ({ ctx, canvasDom, myCanvasDom, ctx_1, canvasClearDom, canvasClearDom_1, state, originX, originY, originX1, originY1, beforeCir, callback }: Img) => {
  const { shadow, transparency, types, shadowX, shadowY, blur, shaColor, cir, pointX, pointY, shapeX, shapeY, imgW, imgH }:IProps = state
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

  const fileDom = document.getElementById('file') as HTMLInputElement;

  if (!fileDom || !fileDom.files || !fileDom.files.length) {
    return
  };

  const file = fileDom.files[0]
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
        ctx!.shadowOffsetX = shadowX;
        ctx!.shadowOffsetY = shadowY;
        ctx!.shadowBlur = blur;
        ctx!.shadowColor = shaColor;
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
        if (0 <= cir && cir <= 30 || 165 < cir && cir <= 210 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'nw-resize';
        } else if (30 < cir && cir <= 60 || 210 < cir && cir <= 255) {
          myCanvasDom!.style.cursor = 'n-resize';
        } else if (120 < cir && cir <= 165 || 300 < cir && cir <= 330) {
          myCanvasDom!.style.cursor = 'e-resize'
        } else {
          myCanvasDom!.style.cursor = 'ne-resize'
        }
      };
      let jud1 = judge(originX.current + imgWidth / 2 * types - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud1 === 1) {
        if (0 <= cir && cir <= 30 || 165 < cir && cir <= 210 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'n-resize';
        } else if (30 < cir && cir <= 60 || 210 < cir && cir <= 255) {
          myCanvasDom!.style.cursor = 'ne-resize';
        } else if (120 < cir && cir <= 165 || 300 < cir && cir <= 345) {
          myCanvasDom!.style.cursor = 'se-resize'
        } else {
          myCanvasDom!.style.cursor = 'w-resize'
        }
      };
      let jud2 = judge(originX.current + imgWidth / 2 * types - 10, originY.current - 50, 20, 20, x2, y2, cir, originX1, originY1);
      if (jud2 === 1) {
        myCanvasDom!.style.cursor = 'col-resize';
      };
      let jud3 = judge(originX.current + imgWidth * types - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud3 === 1) {
        if (0 <= cir && cir <= 30 || 165 < cir && cir <= 210 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'ne-resize';
        } else if (30 < cir && cir <= 60 || 210 < cir && cir <= 255) {
          myCanvasDom!.style.cursor = 'e-resize';
        } else if (120 < cir && cir <= 165 || 300 < cir && cir <= 345) {
          myCanvasDom!.style.cursor = 'n-resize'
        } else {
          myCanvasDom!.style.cursor = 'nw-resize'
        }
      };
      let jud4 = judge(originX.current + imgWidth * types - 5, originY.current - 5 + imgHeight / 2 * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud4 === 1) {
        if (0 <= cir && cir <= 30 || 165 < cir && cir <= 210 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'w-resize';
        } else if (30 < cir && cir <= 60 || 210 < cir && cir <= 255) {
          myCanvasDom!.style.cursor = 'se-resize';
        } else if (120 < cir && cir <= 165 || 300 < cir && cir <= 345) {
          myCanvasDom!.style.cursor = 'ne-resize'
        } else {
          myCanvasDom!.style.cursor = 'n-resize'
        }
      };
      let jud5 = judge(originX.current + imgWidth * types + 50, originY.current - 10 + imgHeight / 2 * types, 20, 20, x2, y2, cir, originX1, originY1);
      if (jud5 === 1) {
        myCanvasDom!.style.cursor = 'row-resize'
      };
      let jud6 = judge(originX.current - 5 + imgWidth * types, originY.current - 5 + imgHeight * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud6 === 1) {
        if (0 <= cir && cir <= 30 || 165 < cir && cir <= 210 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'nw-resize';
        } else if (30 < cir && cir <= 60 || 210 < cir && cir <= 255) {
          myCanvasDom!.style.cursor = 'n-resize';
        } else if (120 < cir && cir <= 165 || 300 < cir && cir <= 345) {
          myCanvasDom!.style.cursor = 'e-resize'
        } else {
          myCanvasDom!.style.cursor = 'ne-resize'
        }
      };
      let jud7 = judge(originX.current - 5 + imgWidth / 2 * types, originY.current - 5 + imgHeight * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud7 === 1) {
        if (0 <= cir && cir <= 30 || 165 < cir && cir <= 210 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'n-resize';
        } else if (30 < cir && cir <= 60 || 210 < cir && cir <= 255) {
          myCanvasDom!.style.cursor = 'ne-resize';
        } else if (120 < cir && cir <= 165 || 300 < cir && cir <= 345) {
          myCanvasDom!.style.cursor = 'se-resize'
        } else {
          myCanvasDom!.style.cursor = 'w-resize'
        }
      };
      let jud8 = judge(originX.current - 5, originY.current - 5 + imgHeight * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud8 === 1) {
        if (0 <= cir && cir <= 30 || 165 < cir && cir <= 210 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'sw-resize';
        } else if (30 < cir && cir <= 60 || 210 < cir && cir <= 255) {
          myCanvasDom!.style.cursor = 'w-resize';
        } else if (120 < cir && cir <= 165 || 300 < cir && cir <= 345) {
          myCanvasDom!.style.cursor = 'n-resize'
        } else {
          myCanvasDom!.style.cursor = 'nw-resize'
        }
      };
      let jud9 = judge(originX.current - 5, originY.current - 5 + imgHeight / 2 * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud9 === 1) {
        if (0 <= cir && cir <= 30 || 165 < cir && cir <= 210 || 330 < cir && cir <= 360) {
          myCanvasDom!.style.cursor = 'w-resize';
        } else if (30 < cir && cir <= 60 || 210 < cir && cir <= 255) {
          myCanvasDom!.style.cursor = 'se-resize';
        } else if (120 < cir && cir <= 165 || 300 < cir && cir <= 345) {
          myCanvasDom!.style.cursor = 'ne-resize'
        } else {
          myCanvasDom!.style.cursor = 'n-resize'
        }
      };
    });

    // 添加控制器镜像翻转功能
    // myCanvasDom!.addEventListener('click', (e) => {
    //   let x2 = e.offsetX;
    //   let y2 = e.offsetY;
    //   imgWidth = imgWidth ? imgWidth : imgW || img.width;
    //   imgHeight = imgHeight ? imgHeight : imgH || img.height;
    //   let jud2 = judge(originX.current + imgWidth / 2 * types - 10, originY.current - 50, 20, 20, x2, y2, cir, originX1, originY1);
    //   if (jud2 === 1) {
    //     ctx!.save();
    //     ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
    //     ctx!.translate(originX1.current, originY1.current);
    //     ctx!.scale(-1, 1);
    //     ctx!.translate(-(originX1.current), -(originY1.current));
    //     ctx!.drawImage(img, originX.current, originY.current, imgWidth * types, imgHeight * types);
    //     ctx!.restore();
    //   };

    //   let jud5 = judge(originX.current + imgWidth * types + 50, originY.current - 10 + imgHeight / 2 * types, 20, 20, x2, y2, cir, originX1, originY1);
    //   if (jud5 === 1) {
    //     ctx!.save();
    //     ctx!.clearRect(0, 0, canvasDom!.width, canvasDom!.height);
    //     ctx!.translate(originX1.current, originY1.current);
    //     ctx!.scale(1, -1);
    //     ctx!.translate(-(originX1.current), -(originY1.current));
    //     ctx!.drawImage(img, originX.current, originY.current, imgWidth * types, imgHeight * types);
    //     ctx!.restore();
    //   };
    // });

    // 添加控制器缩放功能
    myCanvasDom!.addEventListener('mousedown', (e) => {
      let x2 = e.offsetX;
      let y2 = e.offsetY;
      imgWidth = imgWidth ? imgWidth : imgW || img.width;
      imgHeight = imgHeight ? imgHeight : imgH || img.height;
      let jud = judge(originX.current - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud === 1) {
        myCanvasDom!.onmousemove = (e) => {
          const scale1 =
            (
              Math.pow(Math.pow(originX1.current - e.offsetX, 2) + Math.pow(originY1.current - e.offsetY, 2), 1 / 2)
            );
          const scale2 =
            (
              Math.pow(Math.pow(originX1.current - originX.current, 2) + Math.pow(originY1.current - originY.current, 2), 1 / 2)
            );
          const scale = scale1 / scale2;
          console.log(scale);
          originX.current = originX.current + (1 - scale) / 2 * imgWidth;
          originY.current = originY.current + (1 - scale) / 2 * imgHeight;
          imgWidth = scale * imgWidth;
          imgHeight = scale * imgHeight;
          callback({ imgW: imgWidth, imgH: imgHeight });
          control(imgWidth, imgHeight);
        }
      };
      let jud1 = judge(originX.current + imgWidth / 2 * types - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud1 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          originY.current = e.movementY + originY.current;
          imgHeight += -e.movementY;
          control(imgWidth, imgHeight);
        }
      };
      let jud3 = judge(originX.current + imgWidth * types - 5, originY.current - 5, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud3 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          const scale1 =
            (
              Math.pow(Math.pow(originX1.current - e.offsetX, 2) + Math.pow(originY1.current - e.offsetY, 2), 1 / 2)
            );
          const scale2 =
            (
              Math.pow(Math.pow(originX1.current - originX.current, 2) + Math.pow(originY1.current - originY.current, 2), 1 / 2)
            );
          const scale = scale1 / scale2;
          console.log(scale);
          originX.current = originX.current + (1 - scale) / 2 * imgWidth;
          originY.current = originY.current + (1 - scale) / 2 * imgHeight;
          imgWidth = scale * imgWidth;
          imgHeight = scale * imgHeight;
          callback({ imgW: imgWidth, imgH: imgHeight });
          control(imgWidth, imgHeight);
        }
      };
      let jud4 = judge(originX.current + imgWidth * types - 5, originY.current - 5 + imgHeight / 2 * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud4 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          imgWidth += e.movementX;
          control(imgWidth, imgHeight);
        }
      };
      let jud6 = judge(originX.current - 5 + imgWidth * types, originY.current - 5 + imgHeight * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud6 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          const scale1 =
            (
              Math.pow(Math.pow(originX1.current - e.offsetX, 2) + Math.pow(originY1.current - e.offsetY, 2), 1 / 2)
            );
          const scale2 =
            (
              Math.pow(Math.pow(originX1.current - originX.current, 2) + Math.pow(originY1.current - originY.current, 2), 1 / 2)
            );
          const scale = scale1 / scale2;
          console.log(scale);
          originX.current = originX.current + (1 - scale) / 2 * imgWidth;
          originY.current = originY.current + (1 - scale) / 2 * imgHeight;
          imgWidth = scale * imgWidth;
          imgHeight = scale * imgHeight;
          callback({ imgW: imgWidth, imgH: imgHeight });
          control(imgWidth, imgHeight);
        }
      };
      let jud7 = judge(originX.current - 5 + imgWidth / 2 * types, originY.current - 5 + imgHeight * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud7 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          imgHeight += e.movementY;
          control(imgWidth, imgHeight);
        }
      };
      let jud8 = judge(originX.current - 5, originY.current - 5 + imgHeight * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud8 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          const scale1 =
            (
              Math.pow(Math.pow(originX1.current - e.offsetX, 2) + Math.pow(originY1.current - e.offsetY, 2), 1 / 2)
            );
          const scale2 =
            (
              Math.pow(Math.pow(originX1.current - originX.current, 2) + Math.pow(originY1.current - originY.current, 2), 1 / 2)
            );
          const scale = scale1 / scale2;
          console.log(scale);
          originX.current = originX.current + (1 - scale) / 2 * imgWidth;
          originY.current = originY.current + (1 - scale) / 2 * imgHeight;
          imgWidth = scale * imgWidth;
          imgHeight = scale * imgHeight;
          callback({ imgW: imgWidth, imgH: imgHeight });
          control(imgWidth, imgHeight);
        }
      };
      let jud9 = judge(originX.current - 5, originY.current - 5 + imgHeight / 2 * types, 10, 10, x2, y2, cir, originX1, originY1);
      if (jud9 === 1) {
        myCanvasDom!.onmousemove = (e) => {
          originX.current = e.movementX + originX.current;
          imgWidth += -e.movementX;
          control(imgWidth, imgHeight);
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