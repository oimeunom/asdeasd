prediction_1 = ""
prediction_2 = ""

//Defina as seguintes características para a câmera:

Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 90,
  });

  //Utilize o código 'document.getElementById' para pegar o id da câmera
  //Para descobrir o id da camera, volte ao código html
camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        //Na linha 24, você deverá adicionar o id do resultado
        //Para descobrir qual é o id, volte para o html
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  
  //Adicione o link do teacheable machine
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json');



function speak(){
var synth = window.speechSynthesis;
//Adicione as variáveis 'prediction_1' e 'prediction_2', pois elas guardam as previsões
speak_data_1 = "A primeira previsão é " + prediction_1;
speak_data_2 = "E a segunda previsão é " + prediction_2;
var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
//Utilize o código 'synth.speak' para fazer uma voz falar a variável 'utterThis'
syinth.speak(utterThis)
}


function check()
{
  img = document.getElementById('captured_image');
  //Utilize o código 'classifier.classify' para iniciar a classificação da imagem
  classifier.classify(img, gotResult);
}


function gotResult(error, results) {
  //Programe que...
  //Se acontecer um erro, mostre no console esse erro
if (error){
console.log(error)
 
} else {
  document.getElementById("result_emotion_name").innerHTML = results[0].label;
  document.getElementById("result_emotion_name2").innerHTML = results[1].label;
  prediction_1 = results[0].label;
  prediction_2 = results[1].label;
  speak();


  //Adicione o número 0, pois ele corresponde a primeira previsão
  if(results[0].label == "feliz")
  {
    document.getElementById("update_emoji").innerHTML = "&#128522;";
  }
  if(results[0].label == "triste")
  {
    document.getElementById("update_emoji").innerHTML = "&#128532;";
  }
  if(results[0].label == "irritado")
  {
    document.getElementById("update_emoji").innerHTML = "&#128548;";
  }

  //Adicione o número 1, pois ele corresponde a segunda previsão
  if(results[1].label == "feliz")
  {
    document.getElementById("update_emoji2").innerHTML = "&#128522;";
  }
  if(results[1].label == "triste")
  {
    document.getElementById("update_emoji2").innerHTML = "&#128532;";
  }
  if(results[1].label == "irritado")
  {
    document.getElementById("update_emoji2").innerHTML = "&#128548;";
  }
}
}