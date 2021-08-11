import {Rect} from '../interface/interface'

// 绘制三角公共函数
 const drawTriangle = ({ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, start, end,layers}:Rect) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    const lineargradient = ctx!.createLinearGradient(0, 0, 800, 800);
    lineargradient.addColorStop(0, start);
    lineargradient.addColorStop(1, end);
    ctx.globalAlpha = transparency;
    if (colors === '') {
      ctx!.fillStyle = lineargradient;
    } else {
      ctx.fillStyle = colors;
    };
    ctx.beginPath();
    ctx.moveTo(150 * types, 150 * types);
    ctx.lineTo(150 * types, 300 * types);
    ctx.lineTo(300 * types, 300 * types);
    ctx.fill();
    ctx.globalCompositeOperation = layers;
  };

  export default  drawTriangle