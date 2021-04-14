var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstaclesGroup
var score , survivalTime
var jungleImg
var gamestate="play"

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  jungleImg = loadImage("Jungle.jpg")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,400);
    jungle = createSprite(600, 200, 600, 400);
  jungle.addImage(jungleImg)
  jungle.velocityX =-4;
  jungle.x =jungle.width/2;

  monkey = createSprite(50, 360, 10, 10);
monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1
  

  
  ground = createSprite(300, 380, 600, 40);
  ground.visible = false
  console.log(ground.x)
  
  

  foodGroup = new Group();
  obstaclesGroup = new Group();
  
score = 0
survivalTime = 0
}


function draw() {
background("turquoise")
drawSprites();
  
  stroke("white")
  textSize(20)
  fill("white")
   text("Score: "+ score, 500,50);
   
  stroke("black")
  textSize(20)
  fill("black")
  
  text("Survival Time: "+ survivalTime, 100,50);
  if(gamestate==="play"){
  survivalTime=Math.round(frameCount/60)
  if(jungle.x<190){
    jungle.x = jungle.width/2
  }
  
   if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -7;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  
  if(monkey.isTouching(foodGroup)){
     score = score+1
    foodGroup.destroyEach()
     }
  
      switch(score){
        case 10: monkey.scale = 0.12
          break;
        case 20: monkey.scale = 0.14
          break;
        case 30: monkey.scale = 0.16
          break;
        case 40: monkey.scale = 0.18
          break;
    }
  if(monkey.isTouching(obstaclesGroup)){
  gamestate="end"  
    
    
  }
  
  
  
  monkey.collide(ground)
  
  spawnBananas();
  spawnObstacles();
}
else if(gamestate==="end"){
jungle.velocityX=0  
monkey.visible = false;
obstaclesGroup.destroyEach()
foodGroup.destroyEach()
textSize(30)
fill(255)
text("GAME OVER",300,200)
}
}
function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(610,340,10,40);
   obstacle.velocityX = -4
 
  
   obstacle.addImage(obstacleImage);
  
  obstacle.scale = 0.1;
    obstacle.lifetime = 300;
  obstaclesGroup.add(obstacle);
  
 }
}

function spawnBananas(){
 if (frameCount % 200 === 0){
   var banana = createSprite(610,340,10,40);
   banana.velocityX = -4
 banana.y = Math.round(random(100, 200))
  
   banana.addImage(bananaImage);
  
  banana.scale = 0.1;
    banana.lifetime = 300;
 foodGroup.add(banana);
  
 }
}

