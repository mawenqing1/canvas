 // 绘制圆公共函数
 const drawCircle = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string, start: string, end: string,layers: string) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    const lineargradient = ctx!.createLinearGradient(0, 0, 800, 800);
    lineargradient.addColorStop(0, start);
    lineargradient.addColorStop(1, end);
    ctx!.globalAlpha = transparency;
    if (colors === '') {
      ctx!.fillStyle = lineargradient;
    } else {
      ctx!.fillStyle = colors;
    };
    ctx!.beginPath();
    ctx!.arc(300, 300, 150 * types, 0, 2 * Math.PI);
    ctx!.fill();
    ctx!.globalCompositeOperation = layers;
  };

  export default  drawCircle