import{Arc} from '../interface/interface'

// 绘制圆弧公共函数
 const drawArc = ({ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor}:Arc) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx.globalAlpha = transparency;
    ctx.fillStyle = colors;
    ctx.beginPath();
    ctx.arc(100, 100, 100 * types, 0, Math.PI * types, true);
    ctx.stroke();
  };

  export default  drawArc