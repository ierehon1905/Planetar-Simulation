var a = 0;
var stars = [];

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	function DOMStuff() {
		var frameRateDiv = select('#frameRateDiv');
		setInterval(function() {frameRateDiv.html(ceil(frameRate()), false)}, 1000);
	}
	DOMStuff();

	goal = createVector(0, 0, 0);

	camera(500, 500, 0, 0, 0, 0, 0, 1, 0);
	noStroke();
	ambientMaterial(255);

	//test stars
	stars.push(new Star(200, 200, 0));
	stars.push(new Star(-200, -100, 0));
	stars.push(new Star(-100, 200, 0));
	stars.push(new Star(250, -300, 0));

	//setInterval(createRandomRocket, 10);
}
////////////////////////////////////////////////////////////////////////////////
function draw() {
	background(0);

	rotateX(a);
	a += 0.003;

	pointLight(255, 205, 0, 0, 0, -500);
	ambientMaterial(255);
	//camera(0, -1000, -1000, stars[0].pos.x,stars[0].pos.y,stars[0].pos.z, 0,1,0);
	sphere(5);


	//main interator
	for (str of stars) {
		str.update();
		str.show();
	}
	coordVectors();
}
////////////////////////////////////////////////////////////////////////////////
function coordVectors() {
	push();
	// Y
	fill(0,255,0);
	translate(0,50,0);
	cylinder(2,100);
	// Z
	fill(0,0,255);
	translate(0,-50,50);
	rotateX(HALF_PI);
	cylinder(2,100);
	// X
	fill(255,0,0);
	translate(50,-50,0);
	rotateZ(HALF_PI);
	cylinder(2, 100);
	pop();
}
////////////////////////////////////////////////////////////////////////////////
function Star(x_, y_, z_, vx_, vy_, vz_, color_) {
	//constants
	this.mass = random(300, 1000);
	//some easter eggs
	if (random() < 0.05) {
		this.mass = 2000;
		this.color = color(255, 205, 0);
	}
	this.r = map(this.mass, 300, 1000, 8, 30);
	if (color_) this.color = color_;
	//phisics
	this.pos = createVector(x_, y_, z_);

	if(vx_ && vy_ && vz_) {
		this.vel = createVector(vx_, vy_, vz_);
	} else {
		this.vel = createVector(5, 5, 5);
	}

	this.vel.div(10);
	this.acc = createVector(0, 0, 0);
	//
	this.update = function() {
		this.acc = p5.Vector.sub(goal, this.pos).normalize().mult(this.mass / sq(p5.Vector.dist(this.pos, goal)));
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		//this.vel.limit(50);
	}
	//this.isOutside = function() {
	//	return this.pos.x > width || this.pos.y > height || this.pos.x < 0 || this.pos.y < 0;
	//}
	if (this.color) {
		this.show = function() {
			push();
			//fill(this.color);
			translate(this.pos.x, this.pos.y, this.pos.z);
			sphere(this.r);
			pop();
		}
	} else {
		this.show = function() {
			push();
			//fill(this.vel.magSq() * 7);
			translate(this.pos.x, this.pos.y, this.pos.z);
			sphere(this.r);
			pop();
		}
	}
}
////////////////////////////////////////////////////////////////////////////////
function createRandomStar() {
	stars.push( new Star( floor(random(-300, 300)),
											  floor(random(-300, 300)),
											  floor(random(-300, 300))));
}
////////////////////////////////////////////////////////////////////////////////
function createCoordStar() {
	//getting inputs
	var xPos = int(select('#xPos').value());
	var yPos = int(select('#yPos').value());
	var zPos = int(select('#zPos').value());
	var xVel = int(select('#xVel').value());
	var yVel = int(select('#yVel').value());
	var zVel = int(select('#zVel').value());
	console.log(xPos, yPos, zPos, xVel, yVel, zVel);
	stars.push(new Star(xPos, yPos, zPos, xVel, yVel, zVel));
}
function mouseClicked() {
	//createRandomRocket();
}
