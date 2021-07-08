const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// 点击显示隐藏赋值
let isShow = true;
// 图片缩放声明
let type = '';
// 图片透明度声明
let transparency = '';
// 增加阴影声明
let shadow = '';

// 绘制矩形

const a_btn0 = document.getElementById("a-btn0");
a_btn0.onclick = () => {
    if (isShow) {
        ctx.fillRect(150, 150, 400, 400);
        isShow = false;
    } else {
        isShow = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// 更改颜色
const btn = document.getElementById("btn");
const input = document.getElementById("input");
btn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(150, 150, 400, 400);
    ctx.fillStyle = input.value;
    ctx.fill();

}, false);

// 图片缩放
const slider = document.getElementById("scale-range");
slider.addEventListener('change', () => {
    ctx.clearRect(0, 0, 700, 700);
    ctx.save();
    switch (type) {
        case 'img':
            let img = new Image();
            let file = document.getElementById("file").files[0];
            // 采用fileReader构造器将上传图片转化为64位编码
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                var data = reader.result;
                img.src = data;
                img.onload = () => {
                    ctx.drawImage(img, 150, 150, img.width * slider.value, img.height * slider.value);
                }
            };
            break;
        case 'triangle':
            ctx.beginPath();
            ctx.moveTo(150 * slider.value, 150 * slider.value);
            ctx.lineTo(150 * slider.value, 300 * slider.value);
            ctx.lineTo(300 * slider.value, 300 * slider.value);
            ctx.fill();
            break;
        case 'circle':
            ctx.beginPath();
            ctx.arc(300, 300, 150 * slider.value, 0, 2 * Math.PI);
            // ctx.stroke();
            ctx.fill();
            break;
        default:
            ctx.fillRect(150, 150, 400 * slider.value, 400 * slider.value);
            break;

    }

    // ctx.scale(slider.value, slider.value);
    // ctx.setTransform(slider.value, 0, 0, slider.value, 0, 0);
    ctx.restore();
})

// 图层叠加
const btn1 = document.getElementById("btn1");
btn1.addEventListener('click', () => {
    console.log(111);
    ctx.clearRect(200, 200, 200, 200);
    ctx.rect(200, 200, 200, 200);
    ctx.fillStyle = "white";
    ctx.fillRect(200, 200, 200, 200);
    // ctx.strokeRect(200, 200, 200, 200);

}, false);
// 更改图层颜色
const btn2 = document.getElementById("btn2");
const input1 = document.getElementById("input1");
btn2.addEventListener('click', () => {
    ctx.clearRect(0, 0, 700, 700);
    ctx.rect(200, 200, 200, 200);
    ctx.fillStyle = input1.value;
    ctx.fill();
}, false)

// 绘制三角形
const a_btn1 = document.getElementById("a-btn1");
a_btn1.onclick = () => {
    type = 'triangle';
    transparency = 'triangle';
    shadow = 'triangle';
    if (isShow) {
        ctx.rect(150, 150, 400, 400);
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.lineTo(150, 300);
        ctx.lineTo(300, 300);
        ctx.fill();
        isShow = false;
    } else {
        isShow = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// 绘制圆形
const a_btn2 = document.getElementById("a-btn2");
a_btn2.onclick = () => {
    type = 'circle';
    transparency = 'circle';
    shadow = 'circle';
    if (isShow) {
        ctx.rect(150, 150, 400, 400);
        ctx.beginPath();
        ctx.arc(300, 300, 150, 0, 2 * Math.PI);
        // ctx.stroke();
        ctx.fill();
        isShow = false;
    } else {
        isShow = true;
        ctx.clearRect(0, 0, 700, 700);
    }
}

// 选择图片
const a_btn3 = document.getElementById("a-btn3");
const a_btn6 = document.getElementById("a-btn6");
a_btn3.addEventListener('click', () => {
    type = 'img';
    transparency = 'img';
    shadow = 'img';
    let img = new Image();
    let file = document.getElementById("file").files[0];
    // 采用fileReader构造器将上传图片转化为64位编码
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        var data = reader.result;
        img.src = data;
        img.onload = () => {
            // 添加拖拽效果
            a_btn6.onclick = () => {
                let x = 0;
                let y = 0;
                canvas.onclick = (e) => {
                    x = e.offsetX - img.width / 2;
                    y = e.offsetY - img.height / 2;
                    // console.log(x, y);
                };
                setInterval(() => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, x, y);
                }, 20);
            }
            ctx.drawImage(img, 150, 150);
        }
    };
})

// 平铺
const a_btn4 = document.getElementById("a-btn4");
a_btn4.addEventListener('click', () => {
    var img = new Image();
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        var data = reader.result;
        img.src = data;
        img.onload = () => {
            var pattern = ctx.createPattern(img, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(150, 150, 400, 400);
        }
    };
})

// 旋转
const a_btn5 = document.getElementById("a-btn5");
a_btn5.addEventListener('click', () => {
    let img = new Image();
    let file = document.getElementById("file").files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        let data = reader.result;
        img.src = data;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(Math.PI / 6);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            ctx.drawImage(img, 0, 0)
        }
    };
})

// 透明度

const tp = document.getElementById("tp-range");
tp.addEventListener('change', () => {
    let num = parseFloat(tp.value);
    ctx.clearRect(0, 0, 700, 700);
    ctx.save();
    switch (transparency) {
        case 'img':
            let img = new Image();
            let file = document.getElementById("file").files[0];
            // 采用fileReader构造器将上传图片转化为64位编码
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                var data = reader.result;
                img.src = data;
                img.onload = () => {
                    ctx.globalAlpha = num;
                    ctx.drawImage(img, 150, 150, img.width * slider.value, img.height * slider.value);
                }
            };
            break;
        case 'triangle':
            console.log(num);
            ctx.globalAlpha = num;
            ctx.beginPath();
            ctx.moveTo(150 * slider.value, 150 * slider.value);
            ctx.lineTo(150 * slider.value, 300 * slider.value);
            ctx.lineTo(300 * slider.value, 300 * slider.value);
            ctx.fill();
            break;
        case 'circle':
            ctx.globalAlpha = num;
            ctx.beginPath();
            ctx.arc(300, 300, 150 * slider.value, 0, 2 * Math.PI);
            // ctx.stroke();
            ctx.fill();
            break;
        default:
            ctx.globalAlpha = num;
            ctx.fillRect(150, 150, 400 * slider.value, 400 * slider.value);
            break;
    }
    ctx.restore();
})

// 增加图片阴影
const a_btn7 = document.getElementById("a-btn7");
const shad = () => {
    ctx.shadowOffsetX = 15;
    ctx.shadowOffsetY = 15;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
}
a_btn7.addEventListener('click', () => {
    if (isShow) {
        // ctx.save();
        isShow = false;
        switch (shadow) {
            case 'img':
                let img = new Image();
                let file = document.getElementById("file").files[0];
                // 采用fileReader构造器将上传图片转化为64位编码
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    var data = reader.result;
                    img.src = data;
                    img.onload = () => {
                        shad();
                        ctx.globalAlpha = num;
                        ctx.drawImage(img, 150, 150, img.width * slider.value, img.height * slider.value);
                    }
                };
                break;
            case 'triangle':
                // console.log(num);
                shad();
                ctx.globalAlpha = num;
                ctx.beginPath();
                ctx.moveTo(150 * slider.value, 150 * slider.value);
                ctx.lineTo(150 * slider.value, 300 * slider.value);
                ctx.lineTo(300 * slider.value, 300 * slider.value);
                ctx.fill();
                break;
            case 'circle':
                shad();
                ctx.globalAlpha = num;
                ctx.beginPath();
                ctx.arc(300, 300, 150 * slider.value, 0, 2 * Math.PI);
                // ctx.stroke();
                ctx.fill();
                break;
            default:
                shad();
                ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                ctx.fillRect(150, 150, 400 * slider.value, 400 * slider.value);
                break;
        }
    } else {
        isShow = true;
    }
})