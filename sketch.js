var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
var survivalTime = 0;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,10000000,20);
  ground.velocityX = -4;
  ground.x = ground.width/10;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}


function draw() {
    background(255);
  

    if(ground.x<0){
    ground.x = ground.width/2;
}
   if(keyDown("space")){
    monkey.velocityY = -12;
     }
    monkey.velocityY = monkey.velocityY + 0.8;
  
   survivalTime = Math.ceil(frameCount/frameRate())
  
   monkey.collide(ground);
  
   drawSprites();
  
   
  spawnFood();
  spawnObstacles();

  stroke("black");
  textSize(20);
  fill("black");
  text("score; " + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime: "+ survivalTime, 100,50);

  
   if(obstaclesGroup.isTouching(monkey)){
     
     ground.velocityX = 0;
     monkey.velocityY = 0;
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
      }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    monkey.scale = monkey.scale+0.1;
    score = score+1;
     
     }
}
  

function spawnFood(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
    
    banana.lifetime = 500;
    monkey.depth = banana.depth + 1;
    
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}


