import {Qcthree} from '../interface/interface'

// 绘制三次贝塞尔曲线
  const drawQcthree = ({ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor}:Qcthree) => {
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

  export default  drawQcthree