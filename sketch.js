
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(50,350,50,50);
  monkey.addAnimation("monkeyRunning",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,390,1500,10);
  ground.velocityX = -3;
  
  score = 0;
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  background("white");
    
  if(keyDown("space")&& monkey.y >= 159){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY+0.5;
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(ground);
  
  
  Food();
  Obstacles();
  
  stroke("black");
  textSize(15);
  fill("black");
  survivalTime = Math.round(frameCount/frameRate())
  text("survivalTime= "+survivalTime,280,50);
  
  if(monkey.isTouching(obstaclesGroup)){
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
  }
  
  
  
  
  
  drawSprites();
}

function Food(){
  if(World.frameCount % 80 === 0){
    banana = createSprite(700,400,20,20);
    banana.y = Math.round(random(200,300));
    banana.addImage(bananaImage);
    banana.velocityX = -7;
    banana.scale = 0.1;
    banana.lifetime = 150;
    
    bananaGroup.add(banana);
  }
}

function Obstacles(){
    if(World.frameCount % 300 === 0){
      obstacle = createSprite(700,370,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -7;
      obstacle.scale = 0.1;
      obstacle.lifetime = 150;
      
      obstaclesGroup.add(obstacle);
    }
  }


