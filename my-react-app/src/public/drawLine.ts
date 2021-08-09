import {Line} from '../interface/interface'
  
  // 绘制线条公共函数
  type Cap = "butt" | "round" | "square";

  const drawLine = ({ctx, transparency, types, colors, shadow, shadowX, shadowY, blur, shaColor, lwidth, cap, solid, dotted, deviation}:Line) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx.beginPath();
    ctx.setLineDash([solid, dotted]);
    ctx.lineDashOffset = deviation;
    ctx.lineWidth = lwidth;
    ctx.lineCap = cap;
    ctx.moveTo(150 * types, 150 * types);
    ctx.lineTo(150 * types, 300 * types);
    ctx.stroke();
  };

  export default  drawLine