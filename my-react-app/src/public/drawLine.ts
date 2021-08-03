  // 绘制线条公共函数
  type Cap = "butt" | "round" | "square";

  const drawLine = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string, lwidth: number, cap: Cap, solid: number, dotted: number, deviation: number) => {
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

  export default  drawLine