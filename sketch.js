//Create variables here
var dog, happyDog, database, foodS, fedTime ,lastFed;
var feedDog, addFood
function preload()
{
	//load images here
  dog1=loadImage ("../images/dogImg.png");
  happyDog= loadImage("../images/dogImg1.png");
  
}

function setup() {
	createCanvas(1000,500);
   dog = createSprite(800,280)
  dog.scale=0.3;
  dog.addImage("dogimg",dog1);

  

database=firebase.database();
foodObj=new food ();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

  feed=createButton("feed the dog");
  feed.position(1100,95);
  feed.mousePressed(feedDog)

  addFood=createButton("add food");
  addFood.position(1200,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
background("pink");
foodObj.display();

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.changeImage("happyd",happyDog)
}
fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastfed=data.val();
  })
  drawSprites();
  //add styles here
 // textSize(10);
  fill(rgb(0,0,20))
  textSize(20)
  text("Press the 'feed the dog' button to feed Drago",100,50)

  textSize(30);
  text("Food Remaining: "+foodS, 115, 100);

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("last Fed :"+ lastFed%12 +"PM",350,30)

  }else if(lastFed===0){
    text("last fed : 12 Am",350,30);
  } else{
    text("last fed:"+lastFed + "AM",350,30);
  }

}




function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if (x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref ('/').update({
Food:x
})
}

function feedDog(){
  dog.addImage(happyDog);

  foodS.updateFoodStock(foodS.getFoodStock()-1)
  database.ref('/').update({
    Food:foodS.getFoodStock(),
    fedTime:hour()
  })
}

function addFoods(){
  

  foodS++;
  database.ref('/').update({
    Food:foodS
   
  })
}