var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody, ground;
var leftWall, bottomWall, RightWall;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	helicopterIMG = loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);


	packageSprite = createSprite(400, 80, 10, 10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.2

	helicopterSprite = createSprite(400, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale = 0.6

	groundSprite = createSprite(400, height - 35, 1000, 10);
	groundSprite.shapeColor = color(255);

	leftWall = createSprite(300, 610, 20, 100);
	leftWall.shapeColor = color("Red");
	leftBody = Bodies.rectangle(320, 610, 20, 100, { isStatic: true });

	bottomWall = createSprite(400, 650, 200, 20);
	bottomWall.shapeColor = color("Red");
	bottomBody = Bodies.rectangle(400, 635, 200, 20, { isStatic: true });

	rightWall = createSprite(500, 610, 20, 100);
	rightWall.shapeColor = color("Red");
	rightBody = Bodies.rectangle(480, 610, 20, 100, { isStatic: true });

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(400, 200, 5, { restitution: 0, isStatic: true });
	World.add(world, packageBody);
	World.add(world, leftBody);
	World.add(world, bottomBody);
	World.add(world, rightBody);

	//Create a Ground
	ground = Bodies.rectangle(400, 650, 1000, 10, { isStatic: true });
	World.add(world, ground);


	Engine.run(engine);

}


function draw() {
	rectMode(CENTER);
	background(0);
	packageSprite.x = packageBody.position.x
	packageSprite.y = packageBody.position.y
	drawSprites();

}

function keyPressed() {
	if (keyCode === DOWN_ARROW) {
		Body.setStatic(packageBody, false);
	}
	if (packageBody.isStatic) {

		if (keyCode === LEFT_ARROW) {
			helicopterSprite.x -= 20;
			var option = { x: 20, y: 0 };
			Body.translate(packageBody, option);
		}

		if (keyCode === RIGHT_ARROW) {
			helicopterSprite.x += 20;
			var option = { x: 20, y: 0 };
			Body.translate(packageBody, option);
		}
	}
}



