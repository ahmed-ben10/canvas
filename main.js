var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 2;
canvas.height = window.innerHeight - 6;
var c = canvas.getContext("2d");

// //box
// c.fillStyle = 'rgba(255,0,0, 0.5)';
// c.fillRect(700, 100, 100, 100);
// c.fillStyle = 'rgba(0,255,0, 0.5)';

// c.fillRect(250, 400, 100, 100);
// c.fillStyle = 'rgba(0,0,255, 0.5)';
// c.fillRect(400, 200, 100, 100);

// //line
// c.beginPath();
// c.moveTo(110 ,200);
// c.lineTo(120,100);
// c.lineTo(130, 400);
// c.stroke();

// //circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle ="rgba(255, 125, 0)";
// c.stroke();

function Circle(x, y, radius, dx, dy, maxRadius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.maxRadius = 40;
    this.minRadius = radius;
    this.color = Math.floor(Math.random() * colorArray.length);
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = colorArray[this.color]
        c.fill();
    }

    this.update = function(){
        if ((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();

        //interactivity
         if((mouse.x - this.x) < 100 && (mouse.x - this.x) > -50 && (mouse.y - this.y) < 50 && (mouse.y - this.y) > -50 ){
            if(this.radius < this.maxRadius){
                this.radius+= 1;
            }
        } else if(this.radius > this.minRadius){
            this.radius--;
        }
    }
}

window.addEventListener("resize", () =>{
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 6;
    init();
});

canvas.addEventListener("mousemove", (e) =>{
    mouse.x = e.x;
    mouse.y = e.y;
});
canvas.addEventListener("mouseout", (e) =>{
    mouse.x = undefined;
    mouse.y = undefined;
}); 

var mouse ={ 
    x: undefined,
    y: undefined
};
var circleArray = [];
var colorArray =[
    '#2c3e50',
    '#e74c3c',
    '#ecf0f1',
    '#3498db',
    '#2980b9'
];
function init(){
    for (let i = 0; i < 800; i++) {
        var radius = Math.random()* 3 +1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = Math.random() - 0.5;
        var dy = Math.random() - 0.5;
        circleArray.push(new Circle(x, y, radius, dx, dy));  
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();