const drawRect = (ctx: CanvasRenderingContext2D, transparency: number, types: number, colors: string, shadow: boolean, shadowX: number, shadowY: number, blur: number, shaColor: string, start: string, end: string, layers: string) => {
    if (shadow) {
      ctx.shadowOffsetX = shadowX;
      ctx.shadowOffsetY = shadowY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = shaColor;
    };
    ctx!.beginPath();
    const lineargradient = ctx!.createLinearGradient(0, 0, 800, 800);
    lineargradient.addColorStop(0, start);
    lineargradient.addColorStop(1, end);

    ctx!.globalAlpha = transparency;
    if (colors === '') {
      ctx!.fillStyle = lineargradient;
    } else {
      ctx!.fillStyle = colors;
    };
    ctx!.fillRect(150, 150, 400 * types, 400 * types);
    ctx!.globalCompositeOperation = layers;
    ctx!.font = "48px serif";
    ctx!.fillText('图层模式', 200, 200);
  };
  export default drawRect