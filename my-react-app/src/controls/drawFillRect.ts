import {controls} from '../interface/interface'

 // 控制器函数
 const drawFillRect = ({ctx_1, originX, originY,imgWidth,imgHeight,types}:controls) => {
    // 左上
    ctx_1!.fillRect(originX.current - 5, originY.current - 5, 10, 10);
    // 上中
    ctx_1!.fillRect(originX.current + imgWidth / 2 * types - 5, originY.current - 5, 10, 10);
    // 顶部翻转
    ctx_1!.fillRect(originX.current + imgWidth / 2 * types - 10, originY.current - 50, 20, 20);
    // 右上
    ctx_1!.fillRect(originX.current + imgWidth * types - 5, originY.current - 5, 10, 10);
    // 右中
    ctx_1!.fillRect(originX.current + imgWidth * types - 5, originY.current - 5 + imgHeight / 2 * types, 10, 10);
    // 右侧翻转
    ctx_1!.fillRect(originX.current + imgWidth * types + 50, originY.current - 10 + imgHeight / 2 * types, 20, 20);
    // 右下
    ctx_1!.fillRect(originX.current - 5 + imgWidth * types, originY.current - 5 + imgHeight * types, 10, 10);
    // 下中
    ctx_1!.fillRect(originX.current - 5 + imgWidth / 2 * types, originY.current - 5 + imgHeight * types, 10, 10);
    // 左下
    ctx_1!.fillRect(originX.current - 5, originY.current - 5 + imgHeight * types, 10, 10);
    // 左中
    ctx_1!.fillRect(originX.current - 5, originY.current - 5 + imgHeight / 2 * types, 10, 10);
  };

  export default drawFillRect