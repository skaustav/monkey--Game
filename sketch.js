var PLAY = 1;
var END = 0;
var gameState  = PLAY;

var monkey , monkey_running, invisibleGround, background, backgroundImage, gameOver, gameOverImage;
var banana ,bananaImage, obstacle, obstacleImage, display, gameState, groundImage;
var bananaGroup, obstacleGroup
var score = 0
var survivalTime = 0;


function preload(){
backgroundImage = loadImage("jungle.jpg");
  
  monkey_running =            loadAnimation("Monkey_10.png","Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 
}
function setup() {
  createCanvas(600, 500)
  
  background = createSprite(0, 0);
  background.addImage(backgroundImage);
  background.scale = 2.5;
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 450, 900, 10);
  ground.velocityX = -100;
  ground.x = ground.width/ -20;
  console.log(ground.x);
  ground.visible = false;
   
  
  
  //creating an invisible ground so that the monkey dont crosses the screen
  invisibleGround = createSprite(200, 0, 400, 10);
  invisibleGround.visible = false;
  

    
  //creating the food and the obstacles group 
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  score = 0;
  
}
function draw() {
if(gameState === PLAY){
  //displaying the scores
  fill("black");
  stroke("black");
  textSize(17);
  text("Score = "+score, 500, 27);
  score.visible = true;
  
    
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    
    score = score+2;
  }
  
  else
{
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    score = 1;
    fill("red");
    text("GAME OVER", 200, 200)
    textSize(20);
    gameOver.visible = false
    ;
    
    bananaGroup.destroyEach();
    bananaGroup.setVelocityXEach(0);
  }
} 

  
   if(ground.x < 0){
    ground.x = ground.width/ 2;
  }
  
  if(keyDown("space")) {
    monkey.velocityY = -12;
  } 
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.2
  }

    
 monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  monkey.collide(invisibleGround);  
}
  //spawn the foods
  spawnBanana();
  spawnObstacles();
       
  drawSprites();
}
function spawnBanana(){
  //spawning the bananas
  if(frameCount %60 == 0){
    banana = createSprite(200, 215);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(300, 10));
    banana.scale = 0.1;
    banana.velocityX = -2;
    
    banana.depth = monkey.depth
    monkey.depth = monkey.depth + 2;
    
    bananaGroup.add(banana);
  }
}
function spawnObstacles(){
  //spawning the obstacles
  if(frameCount %60 == 0){
    var obstacle = createSprite(210, 426);
    obstacle.addImage(obstacleImage) ;
    obstacle.scale = 0.1;
    obstacle.velocityX = -2
  
  var rand=Math.round(random(300, 10));
  switch(rand){
    case 1: obstacles.addImage(obstacleImage);
      break;
      default: break;
  }

    obstacleGroup.add(obstacle);
  }
}