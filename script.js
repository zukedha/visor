const canvas  = document.getElementById("canvas1");
console.log(canvas);
const ctx = canvas.getContext('2d') ;
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;

//creando la funcion constructor;
function Particle(x, y, directionX, directionY, size, color){
     this.x = x;
     this.y = y;
     this.directionX = directionX; 
     this.directionY = directionY;
     this.size = size; 
     this.color = color; 
}
// agregando el metodo para las particulas
Particle.prototype.draw = function(){
     ctx.beginPath();
     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
     ctx.fillStyle = this.color;
     ctx.fill();
}
//añadiendo un metodo de actualizacion para las particulas
Particle.prototype.update = function(){
     if (this.x + this.size > canvas.width || this.x - this.size < 0){
         this.directionX = -this.directionX;
	}	
     if (this.y + this.size > canvas.height || this.y - this.size < 0){
         this.directionY = -this.directionY;
	}
	this.x += this.directionX;
    this.x += this.directionY;
	
	this.draw();	
}
//creando el arreglo de particulas
function init(){
	particleArray = [];
	for (let i=0; i < 100; i++){
	      let size = Math.random() * 20;
              let x = Math.random() * (innerWidth - size * 2);	
              let y = Math.random() * (innerHeight - size * 2);
              let directionX = (Math.random() * .1) - .5;
              let directionY = (Math.random() * .1) - .5;
              let color = "black";

	      particleArray.push(new Particle(x, y, directionX, directionY, size, color)) ;	
	}
}
// loop de animacion 
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0, innerWidth, innerHeight);

	for (let i=0; i<particleArray.length; i++){
		particleArray[i].update();
	}
}
init();
animate();

