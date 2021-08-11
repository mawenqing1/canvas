import {Qcthree} from '../interface/interface'
 
 // 绘制二次贝塞尔曲线
 const drawQctwo = ({ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor}:Qcthree) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx.globalAlpha = transparency;
    ctx.fillStyle = colors;
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25 * types, 25 * types, 25 * types, 62.5 * types);
    ctx.quadraticCurveTo(25 * types, 100 * types, 50 * types, 100 * types);
    ctx.stroke();
  };

  export default  drawQctwo