import judge from './judge';

// 文件图片公共函数
const drawImg = (ctx: CanvasRenderingContext2D, canvasDom: HTMLCanvasElement, myCanvasDom: HTMLCanvasElement, ctx_1: CanvasRenderingContext2D, canvasClearDom: HTMLCanvasElement, canvasClearDom_1: HTMLCanvasElement, showShadow: boolean, transparency: number, types: number, shadowX: number, shadowY: number, blur: number, shaColor: string, cir: number,pointX:number,pointY:number,shapeX:number,shapeY:number,shadow:boolean,originX: { current: number; },originY: { current: number; },originX1: { current: number; } ,originY1: { current: number; } ,beforeCir: { current: number; }) => {
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
        let jud = judge(originX.current, originY.current, img.width, img.height, x2, y2, cir,originX1,originY1);
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
        let jud = judge(originX.current - 5, originY.current - 5, 10, 10, x2, y2, cir,originX1,originY1);
        if (jud === 1) {
          myCanvasDom!.style.cursor = 'nw-resize';
        };
        let jud1 = judge(originX.current + img.width / 2 * types - 5, originY.current - 5, 10, 10, x2, y2, cir,originX1,originY1);
        if (jud1 === 1) {
          myCanvasDom!.style.cursor = 'n-resize'
        };
        let jud2 = judge(originX.current + img.width / 2 * types - 10, originY.current - 50, 20, 20, x2, y2, cir,originX1,originY1);
        if (jud2 === 1) {
          myCanvasDom!.style.cursor = 'col-resize'
        };
        let jud3 = judge(originX.current + img.width * types - 5, originY.current - 5, 10, 10, x2, y2, cir,originX1,originY1);
        if (jud3 === 1) {
          myCanvasDom!.style.cursor = 'ne-resize'
        };
        let jud4 = judge(originX.current + img.width * types - 5, originY.current - 5 + img.height / 2 * types, 10, 10, x2, y2, cir,originX1,originY1);
        if (jud4 === 1) {
          myCanvasDom!.style.cursor = 'e-resize'
        };
        let jud5 = judge(originX.current + img.width * types + 50, originY.current - 10 + img.height / 2 * types, 20, 20, x2, y2, cir,originX1,originY1);
        if (jud5 === 1) {
          myCanvasDom!.style.cursor = 'row-resize'
        };
        let jud6 = judge(originX.current - 5 + img.width * types, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir,originX1,originY1);
        if (jud6 === 1) {
          myCanvasDom!.style.cursor = 'nw-resize'
        };
        let jud7 = judge(originX.current - 5 + img.width / 2 * types, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir,originX1,originY1);
        if (jud7 === 1) {
          myCanvasDom!.style.cursor = 's-resize'
        };
        let jud8 = judge(originX.current - 5, originY.current - 5 + img.height * types, 10, 10, x2, y2, cir,originX1,originY1);
        if (jud8 === 1) {
          myCanvasDom!.style.cursor = 'sw-resize'
        };
        let jud9 = judge(originX.current - 5, originY.current - 5 + img.height / 2 * types, 10, 10, x2, y2, cir,originX1,originY1);
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

  export default drawImg