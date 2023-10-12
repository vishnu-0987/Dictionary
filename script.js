let input = document.getElementById("input");
let searchButton = document.getElementById("searchButton");
let resultContainer = document.getElementById("resultContainer");
let resultWord = document.getElementById("resultWord");
let resultPhonetic = document.getElementById("resultPhonetic");
let resultSpeech = document.getElementById("resultSpeech");
let resultDefinition = document.getElementById("resultDefinition");
let resultExample = document.getElementById("resultExample");
let resultAudio = document.getElementById("resultAudio");
let inputVal ="";


function resultsOnPage(word, phonetic, meanings, defi, phone)
{
    resultWord.textContent = word;
    resultPhonetic.textContent = phonetic;
    resultSpeech.textContent = meanings[0].partOfSpeech;
    resultDefinition.textContent = defi.definitions[0].definition;
    resultExample.textContent = defi.definitions[0].example;
    resultAudio.src=phone;
}

function definitionCall(phonetics)
{
    for(let i of phonetics)
    {
        if (i.audio!="")
        {
            return i.audio;
        }
    }
    return "";
}

async function displayResults(searchResults)
{
    console.log(searchResults);
    let { word } = searchResults;
    console.log(word);
    let { phonetic } = searchResults;
    console.log(phonetic);
    let { meanings } = searchResults;
    console.log(meanings);

    let { phonetics } = searchResults;
    let phone = definitionCall(phonetics);
    console.log(phonetics);
    resultsOnPage(word,phonetic,meanings,meanings[0],phone);
}

async function apiCall(inputVal)
{
    let url="https://api.dictionaryapi.dev/api/v2/entries/en/"+inputVal;
    let options = {
        method: "GET"
    };

    await fetch(url, options)
        .then(function (response)
        {
            return response.json();
        })
        .then(function(jsonData)
        {
            console.log(jsonData);
            let [ search_results ] = jsonData;
            displayResults(search_results);
        });

}

searchButton.addEventListener("click", function() {
    resultContainer.classList.remove("result-container-visibility");
    inputVal = input.value;
    apiCall(inputVal);

});

