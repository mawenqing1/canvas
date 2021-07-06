# canvas
img.onload = function() {
                console.log(111);
                var pattern = ctx.createPattern(img, 'repeat');
                ctx.fillStyle = pattern;
                ctx.fillRect(150, 150, 400, 400);
            };
            img.src = picture.src;






            var x = 0;
                    var y = 0;
                    canvas.onclick = function(e) {
                        x = e.offsetX - img.width / 2;
                        y = e.offsetY - img.height / 2;
                        console.log(x, y);
                    };
                    setInterval(function() {
                        ctx.clearRect(0, 0, 700, 700);
                        ctx.drawImage(img, x, y);
                    }, 20);