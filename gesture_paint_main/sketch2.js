var leftBuffer;
var rightBuffer;

let x1;
let y1;
let x2;
let y2;

let linex=[] ; let liney=[];
let tempPoses;
let gi=0;

let video;
let poseNet;
let pose; 
let skeleton;

function setup(){
    createP('WRIST MOVEMENT PLOTTER ( Try to get full body in the frame)');
    createCanvas(1281, 480);
    leftBuffer = createGraphics(640, 480);
    rightBuffer = createGraphics(641, 480);
    video = createCapture(VIDEO);
    video.hide(); 
    background(240);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
 
function gotPoses(poses){
    console.log(poses);
    if(poses.length>0){
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;

        if(pose){
            for(let i=0;i<poses.length;i++){
                linex[i]=poses[0].pose.rightWrist.x;
                liney[i]=poses[0].pose.rightWrist.y;
            }
        }

    }
}

function modelLoaded(){
    console.log('ready');
}

function draw(){ 

     // Draw on your buffers however you like
     drawLeftBuffer();
     drawRightBuffer();
     // Paint the off-screen buffers onto the main canvas
     image(leftBuffer,0,0);
     image(rightBuffer,681,0);

}

function drawLeftBuffer() {
//  translate(width,0);
    // scale(-1,1);
    image(video,0,0,leftBuffer.width,leftBuffer.height);
    if(pose){

        let righteye=pose.rightEye;
        let lefteye=pose.leftEye;
        let distance = dist(righteye.x,righteye.y,lefteye.x,lefteye.y);

    fill(255,0,0);
    ellipse(pose.nose.x, pose.nose.y,distance);
    fill(255,255,0);
    ellipse(pose.rightWrist.x, pose.rightWrist.y,distance);
    fill(255,0,255);
    ellipse(pose.leftWrist.x, pose.leftWrist.y,distance);

    for(let i=0; i<pose.keypoints.length; i++){
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(0,255,0);
        ellipse(x,y,16,16);
        // display body part name
        let bodypart = pose.keypoints[i].part;
       textSize(20);
       text(bodypart, x, y);
        // display accuracy
        // let score = pose.keypoint[i].score;
        // text(score, x, y);

    }

      for(let i=0; i<skeleton.length ; i++){
          let x0 = skeleton[i][0].position.x;
          let y0 = skeleton[i][0].position.y;
          let x1 = skeleton[i][1].position.x;
          let y1 = skeleton[i][1].position.y;

        // line property
        strokeWeight(2);
        stroke(255);

        // draw line
          line(x0,y0,x1,y1);

      }
}
}

function drawRightBuffer() {
 rightBuffer.background(255, 100, 255);

   // rightBuffer.image(video,0,0,rightBuffer.width,rightBuffer.height);
    if(pose){
    rightBuffer.fill(255,0,0);
    rightBuffer.ellipse(pose.nose.x, pose.nose.y,16);
    rightBuffer.fill(255,255,0);
    rightBuffer.ellipse(pose.rightWrist.x, pose.rightWrist.y,16);
    rightBuffer.fill(255,0,0);
    rightBuffer.ellipse(pose.leftWrist.x, pose.leftWrist.y,16);


 // line property
 rightBuffer.strokeWeight(4);
 rightBuffer.stroke(255);
    }

    rightBuffer.textSize(32);
    rightBuffer.text("GET YOUR RIGHT WRIST IN FRAME", 50, 50);

    // draw line
    rightBuffer.strokeWeight(8);
    rightBuffer.stroke(255);
 // rightBuffer.line(x1, y1, x2, y2);
 
for(let i=0;(linex[i]!=null)||(liney[i]!=null);i++){
//  for(let m = 0; (i+m+1)<tempPoses ; m++){
        rightBuffer.line(linex[i], liney[i],linex[i+1], liney[i+1]);
    //  }
 }
 
}