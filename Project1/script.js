$(document).ready(function(){

    //Variables
        //Buttons
    var spanishBtnSel = $("#spanish").on("click", function() {
        console.log("Spanish Selected");
        langSel = "es";
    })
    
    var chineseBtnSel = $("#chinese").on("click", function() {
        console.log("Chinese Selected");
        langSel = "zh";
    })

    var copyBtn = $("#copyBtn").on("click", function() {
        console.log("Copy Selected");
        // if (textOut !== ""){
        // var copyText = $("outputText").val();
        // console.log("There's text to copy");
        // }
        // console.log("No text to be copied");
    })

    var translateBtn = $("#translateBtn").on("click", function() {
        console.log("Translate Selected");
        if(langSel=== ""){
            console.log("if");
            return;
            
        }else{
            textIn = $("#inputText").val();
            console.log(textIn);
            console.log("else");
        }
        
        translateFunc();
    })

    var clearBtn = $("#clearBtn").on("click", function() {
        console.log("Clear Selected");
        $("#inputText").val("");
        $("#outputText").val("");
        console.log(langSel);
    })
    
    var langSel = "";
    var textIn = "";
    var textOut = $("#outputText").val();
        
  

const apiKey = "trnsl.1.1.20200328T161314Z.bcd4843be4019ae7.a951bdf2b7f5fbb7821f0f8421561bb28404dea0";

// Set endpoints
const endpoints = {
  translate: "",
  detect: "detect",
  languages: "languages"
};

// Abstract API request function
function makeApiRequest(endpoint, data, type, authNeeded) {
  url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en-es&key=trnsl.1.1.20200328T161314Z.bcd4843be4019ae7.a951bdf2b7f5fbb7821f0f8421561bb28404dea0" + endpoint;
  url += "?key=" + apiKey;

  // If not listing languages, send text to translate
  if (endpoint !== endpoints.languages) {
    url += "&q=" + encodeURI(data.textToTranslate);
  }

  // If translating, send target and source languages
  if (endpoint === endpoints.translate) {
    url += "&target=" + data.targetLang;
    url += "&source=" + data.sourceLang;
  }

$.ajax({
    url:  "https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=" + langSel + "&key=trnsl.1.1.20200328T161314Z.bcd4843be4019ae7.a951bdf2b7f5fbb7821f0f8421561bb28404dea0",
    method: "GET"
  }).then(function(response) {
    console.log(response);})
    
}

function translateFunc() {


    console.log(langSel);

    $(document).ready(function() {
        //debugger;
        $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200328T161314Z.bcd4843be4019ae7.a951bdf2b7f5fbb7821f0f8421561bb28404dea0&lang=' + langSel + '&text=' + textIn, function(json) {

            var allResponse = (JSON.stringify(json));

            console.log(allResponse);

            var JSONObject = JSON.parse(allResponse);
            var translatedText = JSONObject["text"];
            document.querySelector('#outputText').innerHTML = translatedText;

            console.log(translatedText);
        });
    });
}

});



