
var meteorImg, meteor, meteorGroup;
var rocket, rocketImg;
var bg, bgImg;
var gameState = "play"

var distance = 0

function preload() {
  bgImg = loadImage("space.png")
  rocketImg = loadImage("Rocket.png")
  meteorImg = loadImage("Meteor.png")

}

function setup() {
  createCanvas(600, 600);

  meteorGroup = new Group();

  rocket = createSprite(300, 100, 50, 50);
  rocket.scale = 0.3;
  rocket.addImage(rocketImg);
  
}

function draw()  {

  background(bgImg);

  
  textSize(20);
  fill(255);
  text("Distance: " + distance, 450, 30);


  if (gameState === "play") {

    if (keyDown("left")) {
      rocket.x = rocket.x - 3;
    }

    if (keyDown("right")) {
      rocket.x = rocket.x + 3;

    }
    if (keyDown("space")) {
      rocket.velocityY = -10;

    }
   
    rocket.velocityY = rocket.velocityY + 0.8;

    spawnmeteors()

    distance = distance + Math.round(getFrameRate() / 60);
   
    if (rocket.isTouching(meteorGroup) || rocket.y > 600) {
     gameState = "END"
    }

  
     
  }

 else if (gameState == "END") {
    rocket.destroy()
    meteorGroup.destroyEach()
    

    background("black")
    textSize(40);
    fill(255)
    text("Game Over" ,200,300)

   }

  drawSprites();
}

function spawnmeteors() {
  //write code here to spawn the clouds
  if (frameCount % 50 === 0) {
    meteor = createSprite(200, -50);
    meteor.x = Math.round(random(100, 500))
    meteor.addImage(meteorImg);
    meteor.scale = 0.6;
    meteor.setCollider("rectangle", 2, 13, 160, 220)
    meteor.velocityY = (3+distance/100)
    meteorGroup.add(meteor)
  }
}
