img = ""
status1 = ""
objects = []
loadSound = ""
function preload(){
    song = loadSound("schoolalarm.mp3");
}
function setup(){
    canvas = createCanvas(380, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}
function draw(){
    image(video, 0, 0, 380, 380)
    if(status1 == ""){
        song.play()
        song.setVolume(1)
        song.rate(1)
    }
    if(status1 != ""){
        r = random(255)
        g = random(255)
        b = random(255)
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("baby").innerHTML = "Ameya has been detected";
            fill(r, g, b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label+" "+percent+ "%", objects[i].x, objects[i].y)
            noFill()
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}
function modelLoaded(){
    console.log("Model has been loaded")
    status1 = true;
    objectDetector.detect(video, gotResult)
}
function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        objects = results;
    }
}
function home(){
    window.location.replace("index.html")
}