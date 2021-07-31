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

  export default  drawArc