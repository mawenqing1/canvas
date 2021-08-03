 // 控制器函数
 const drawFillRect = (ctx_1: CanvasRenderingContext2D, originX: { current: number; }, originY: { current: number; },width: number,height: number,types:number) => {
    // 左上
    ctx_1!.fillRect(originX.current - 5, originY.current - 5, 10, 10);
    // 上中
    ctx_1!.fillRect(originX.current + width / 2 * types - 5, originY.current - 5, 10, 10);
    // 顶部翻转
    ctx_1!.fillRect(originX.current + width / 2 * types - 10, originY.current - 50, 20, 20);
    // 右上
    ctx_1!.fillRect(originX.current + width * types - 5, originY.current - 5, 10, 10);
    // 右中
    ctx_1!.fillRect(originX.current + width * types - 5, originY.current - 5 + height / 2 * types, 10, 10);
    // 右侧翻转
    ctx_1!.fillRect(originX.current + width * types + 50, originY.current - 10 + height / 2 * types, 20, 20);
    // 右下
    ctx_1!.fillRect(originX.current - 5 + width * types, originY.current - 5 + height * types, 10, 10);
    // 下中
    ctx_1!.fillRect(originX.current - 5 + width / 2 * types, originY.current - 5 + height * types, 10, 10);
    // 左下
    ctx_1!.fillRect(originX.current - 5, originY.current - 5 + height * types, 10, 10);
    // 左中
    ctx_1!.fillRect(originX.current - 5, originY.current - 5 + height / 2 * types, 10, 10);
  };

  export default drawFillRect