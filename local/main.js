//intialization of the model object
let mobileNet;
let video;
let label='model loading...';
//let results;
let classifier;
let button1;
let button2;
let button3;


//setup function
function setup()
{
    //create canvas
    createCanvas(640,480);
    //imitialize the webcam stream in a object
    video=createCapture(VIDEO);
    //hide the webcam stream
    video.hide();

    //initialize the mobilenet object with a callback
    // mobileNet = ml5.imageClassifier('MobileNet',video,modelLoaded);
    mobileNet = ml5.featureExtractor('MobileNet', modelReady);

    classifier = mobileNet.classification(video, videoReady);

    button1 = createButton("Stapler");
    button1.mousePressed( function () {
        classifier.addImage("Stapler")
    });

    button2 = createButton("Eraser");
    button2.mousePressed( function () {
        classifier.addImage("Eraser")
    });

    button3 = createButton("Train");
    button3.mousePressed( function () {
        classifier.train(whileTraining);
    });


}

function whileTraining (loss) {
    if (loss == null) {
        console.log('Training is complete');
        classifier.classify(result);
    }
    else {
        console.log(loss);
    }
}

function modelReady()
{
    console.log('Model is ready');
    //predicting the image
    // mobileNet.predict(result)
}

//callback function for when the model is ready for prediction
function modelLoaded()
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
        label = res;
       
    //predicting the image again
        //  mobileNet.predict(result)
        classifier.classify(result);
    }
}

function videoReady () {

}

function draw()
{
    //Displaying the webcam stream
  image(video,0,0);

  //setting up text label 
    textSize(32);
    fill(255,140,0);
    text(label,10,450);
}