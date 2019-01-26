//intialization of the model object
let mobileNet;
let video;
let label='model loading...';
//let results;
let showTutorial = true;
let block;


//setup function
function setup()
{
    //create canvas
    createCanvas(1000,1000);
    //imitialize the webcam stream in a object
    video = createCapture(VIDEO);
    //hide the webcam stream
    video.hide();

    block = rect(30, 20, 55, 55, 20); 
    // block.hide();

    //initialize the mobilenet object with a callback
    mobileNet= ml5.imageClassifier('MobileNet',video,ModelLoaded);

}


//callback function for when the model is ready for prediction
function ModelLoaded()
{
    console.log('Model is ready');
    //predicting the image
    mobileNet.predict(result)
}
//callback function to get the results
function result(err,res)
{
    //check for errors
    if(err)
    {
        //log the error if any
        console.error(err)
    }
    else{
       
        //get the label from the json result
        label = res[0].className;
       
    //predicting the image again
         mobileNet.predict(result)
    }
}
function draw()
{
    //Displaying the webcam stream
  image(video,0,0);

  //setting up text label 
    textSize(16);
    fill(255,140,0);
    text(label,10,450);

    // background(0);

    let list = ['food', 'phone', 'water', 'abaya'];
    for (i = 0; i < list.length ; i++) {
        text(list[i], 700, 50 * (i + 1));
    }

    // rect(30, 20, 55, 55, 20);
    if(showTutorial){
        
    }

    fill(0, 250, 160);
    for (i = 0; i < list.length ; i++) {
        if (label == list[i]){
            text('V', 780, 50 * (i+1));
        }
    
    }
    
}

function mouseClicked(){
    console.log('confirmation that the mouse got clicked!');
    console.log(mouseX, mouseY); //where is the mouse anyway?
  
    if(
      mouseX > 30 && //if the mouse is greather than 200 we're over the image
      mouseX < 85 && //if the mouse is less than 300 were over the image (since the image is at 200 and is 100 wide = 300)
      mouseY > 20 && //same idea but on the vertical axis.
      mouseY < 75
    ){
      showTutorial = true //set the click boolean to be true since we clicked, this will turn off the conditional statement above in the draw step and should make the image no-longer render since that code is now 'skipped'
    }
}