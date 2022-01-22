objects = [];
video = "";
   
status="";
function preload(){
    video = createVideo('video.mp4');
    
}


function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video.hide();
  
}

function start(){
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecing Objects";

}
function draw() {
    image(video,0,0,480,380);
    /*
    fill("#FF0000");
    text("Dog", 45,75);
    noFill();
    stroke("#00FF00");
    rect(30,60,450,350);

     fill("#FF0000");
    text("Cat", 320,120);
    noFill();
    stroke("#00FF00");
    rect(300,90,270,320); */
    if(status != ""){
      r = random(255);
      g = random(255);
      b = random(255);
      objectDetector.detect(video, gotResults);
        for (i=0; i < objects.length; i++){
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("number_of_objects").innerHTML = "number_of_objects  detected are: "+ objects.length;

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 14 , objects[i].y + 15);
            console.log(objects[i].label + "" + percent + "&",objects[i].x, objects[i].y);
        
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function gotResults(error,results) {
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}


