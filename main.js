prediction_1 = ""
prediction_2 = ""

Webcam.set({
width: 350,
heigth:300,
image_format:'png',
png_quality:90

});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function( data_url) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src= "'+data_url+'"/>'
    });
}
console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/d6nTfyFEn/model.json', modelLoaded);
function modelLoaded() {

    console.log('Model Loaded!');
}
function check()
{
    img= document.getElementById('captured_image');
    classifier.classify(img, gotResult); 
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is" + prediction_1;
    speak_data_2 = "And The Second Prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisisUtterance(speak_data_1  + speak_data_2);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
    
}

function gotResult(error, results)
{
if (error) {
    console.error(error);
} else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Happy")
    {
        document.getElementById("update_emoji").innerHTML = "&#128522;";
    }
    if(results[0].label == "Sad")
    {
        document.getElementById("update_emoji").innerHTML = "&#128512;";
    }
    if(results[0].label == "Angry")
    {
        document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if(results[1].label == "happy")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    if(results[1].label == "sad")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128512;";
    }
    if(results[1].label == "angry")
    {
        document.getElementById("update_emoji2").innerHTML = "&#128532;";
    }
    
}

}
