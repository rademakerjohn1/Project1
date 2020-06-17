$(document).ready(function(){

    var textIn = "";
    var searchSel = "";
    var langSel = "";
 

    //Variables
        //Buttons
    $("#spanish").on("click", function() {
        // console.log("Spanish Selected");
        langSel = "es";
        searchSel = "Spanish";
    })
    
    $("#chinese").on("click", function() {
        // console.log("Chinese Selected");
        langSel = "zh";
        searchSel = "Chinese";
    })

    var copyBtn = $("#copyBtn").on("click", function() {
        // console.log("Copy Selected");
        if (textOut !== "") {
            var textOut = $("#outputText");
            textOut.select();
            document.execCommand("copy");
        }
    })

    $("#translateBtn").on("click", function() {
        // console.log("Translate Selected");
            $(".books").empty();
            $("#book-section-header").empty();
        if (langSel == "") {
            // console.log("Select a language");
            langAlert();
            return;
        }
        if ($("#inputText").val() === "") {
            // console.log("Text input needed to translate");
            textAlert();
            return;
        }
        if ($(langSel).val() !== "" && $("#inputText").val() !== "") {
            textIn = $("#inputText").val();
            console.log("You have both required values");
            loadAlert();
        }
    })

        // if(searchSel=== ""){
        //     console.log("searchSel if");
        //     return;
            
        // }else{
        //     textIn = $("#inputText").val();
        //     console.log(textIn);
        //     console.log("else");


        // }


    var clearBtn = $("#clearBtn").on("click", function() {
        // console.log("Clear Selected");
        $("#inputText").val("");
        $("#outputText").val("");
        $(".books").empty();
        $("#book-section-header").empty();
    })
    

    
// console.log(searchSel);
  

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
    // console.log(response);
})
    
}

// Translate Function
function translateFunc() {
    
    // console.log(langSel);
    
    //debugger;
    $.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200328T161314Z.bcd4843be4019ae7.a951bdf2b7f5fbb7821f0f8421561bb28404dea0&lang=' + langSel + '&text=' + textIn, function(json) {

        var allResponse = (JSON.stringify(json));

        // console.log(allResponse);

        var JSONObject = JSON.parse(allResponse);
        var translatedText = JSONObject["text"];
        $('#outputText').val(translatedText);

        // console.log(translatedText);
    });
}

// Book loading function
function loadBooks() {
    $.ajax({
        url:  "https://www.googleapis.com/books/v1/volumes?q=learning" + searchSel,
        method: "GET"
      }).then(function(response) {
        
        // Create header using searchSel value
        $("<h3>").text("Interested in learning more about " + searchSel + "?").appendTo("#book-section-header");
        
        for (var i = 0; i < 6; i++) {
            
            var card = $("<div>").addClass("card col-lg-2 col-sm-4 col-xs-6");
            var cardBody = $("<div>").addClass("card-body d-flex flex-column justify-content-start align-items-stretch");
            
            var thumbnail = $("<img>").addClass("card-img-top").attr("src", response.items[i].volumeInfo.imageLinks.thumbnail);
            var bookTitle = $("<h5>").addClass("card-title").text(response.items[i].volumeInfo.title);
            var preview = $("<a>").addClass("card-text").text("Preview");
            $(preview).attr({"href": response.items[i].volumeInfo.previewLink, "target": "_blank"});
    
            $(cardBody).append(bookTitle, preview);
            $(card).append(thumbnail, cardBody);
            $(".books").append(card);  
        }
    })
}

// GIF loading function
function loadGif() {
    $.ajax({
        url:"https://api.giphy.com/v1/stickers/random?apikey=7blOnFlsou2ztWcQmEG5aqY5m2sMr5A5&tag=" + searchSel + "&limit=1&rating=G",
        method: "GET"
        }).then(function(response) {
            $("#search-sel").text("Getting your " + searchSel + " translation");
            $("#modal-img").attr("src", response.data.image_url);
            setTimeout(function() {
                $('#loading-modal').modal('hide');
                translateFunc();
                loadBooks();
                }, 
              2000);
        })
}
// 

function langAlert() {
    $("#translateBtn").attr({"data-toggle": "modal", "data-target": "#alert-modal"});
    $("#alert-message").text("Please select a language");
}

function textAlert() {
    $("#translateBtn").attr({"data-toggle": "modal", "data-target": "#alert-modal"});
    $("#alert-message").text("Text input needed to translate");
}

function loadAlert() {
    $("#translateBtn").attr({"data-toggle": "modal", "data-target": "#loading-modal"});
    loadGif();

}


});    






