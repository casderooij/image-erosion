var images = document.images;

var pageHeight = Math.max(
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
    );

var img;
var erosions = [];

var sketch = function(p) {

  p.setup = function() {
    p.createCanvas(innerWidth, pageHeight);

    p.background('rgba(0,0,0,0)');

    p.noStroke();

    for(var i = 0; i < images.length; i++) {
        erosions.push(new p.Erosion(images[i].x, images[i].y, images[i].width, images[i].height));
    }
  }

  p.draw = function() {
    for(var i = 0; i < erosions.length; i++) {
        erosions[i].display();
    }
  }

  p.Erosion = function(xPos, yPos, rectWidth, rectHeight) {
    this.brightnessPixel = 150;
    this.color = p.color('rgba(0, 0, 0, 0)');
    this.pixelSize = 10;
    this.speed = 1;
    this.x = xPos;
    this.y = yPos;
    this.width = rectWidth;
    this.height = rectHeight;

    this.display = function() {
      if(this.brightnessPixel < 1200) {
        this.brightnessPixel += this.speed;
    } else if(this.brightnessPixel > 1200) {
        p.noLoop();
    }

      for(var x = this.x; x < this.width + this.x; x+=this.pixelSize) {
        for(var y = this.y; y < this.height + this.y; y+=this.pixelSize) {
          var c = this.brightnessPixel * p.noise(0.01 * x, 0.01 * y);

          if(c < 125) {
            c = this.color;
          } else {
            c = 255;
          }

          p.fill(c);
          p.rect(x, y, this.pixelSize, this.pixelSize);
        }
      }
    }
  }
}

var node = document.createElement('div');
node.className="noise";
node.style.position="absolute";
node.style.pointerEvents="none";
node.style.top="0px";
window.document.body.appendChild(node);
new p5(sketch, node);


console.log("images = " + images.length);
