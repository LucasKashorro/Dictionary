var api
let word

let headerInput = document.getElementById('search-bar-input-header')
let initialInput = document.getElementById('search-bar-input-inital-screen')
headerInput.addEventListener('input', wordUpdate)
initialInput.addEventListener('input', wordUpdate)

function wordUpdate(e) {
  api = `https://api.dictionaryapi.dev/api/v2/entries/en/${e.target.value}`
  
  fetch(api)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    word = data
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
}

// When the user press enter it works at the same way when you press the button of search 
function pressEnter() {
  addEventListener('keypress', (event)=> {
    if(event.key === 'Enter') {
      checkContent()
      wordUpdate()
    }
  })
  
}



let initialScreen = document.getElementById('initial-screen')
let header = document.getElementsByTagName('header')

let wordContent = document.getElementById('word-content');

let alreadyUsed = false;

//This function checks if there is some content on the word content div and checks if the initial search bar have been already used
function checkContent() {
  
  if(alreadyUsed === false) {
    alreadyUsed = true
    search()
  } else {
    while(wordContent.firstChild) {
      wordContent.removeChild(wordContent.firstChild)
    }
    alreadyUsed = false
    checkContent()
  }


  //remove the initial screen and shows the header
  initialScreen.remove()
  header[0].style.top = '0px'
}


function search() {

  //title
  let wordTitle = document.createElement('h1')
  wordTitle.classList.add('word-title')
  let wordTitleString = word[0].word.charAt(0).toUpperCase() + word[0].word.slice(1)
  wordTitle.textContent = wordTitleString
  wordContent.appendChild(wordTitle)

  //meanings
  let meanings = word[0].meanings
  let meaingContainer = document.createElement('div')
  meaingContainer.classList.add('meaning-container')
  wordContent.appendChild(meaingContainer)


  meanings.forEach(element => {

    //part of speech
    let partOfSpeechContainer = document.createElement('div')
    partOfSpeechContainer.classList.add('part-of-speech-container')
    meaingContainer.appendChild(partOfSpeechContainer)

    let partOfSpeech = document.createElement('h4')
    partOfSpeech.classList.add('meaning')
    let partOfSpeechString = element.partOfSpeech.charAt(0).toUpperCase() + element.partOfSpeech.slice(1)
    partOfSpeech.textContent = partOfSpeechString
    partOfSpeechContainer.appendChild(partOfSpeech);

    
    
    //definitions
    let definitions = element.definitions
    definitions.forEach(element => {
      let definition = document.createElement('p')
      definition.classList.add('definition')
      definition.textContent = element.definition
      partOfSpeechContainer.appendChild(definition)
    });
    
    //synonyms
    if(element.synonyms.length > 0) {
      let synonymsTitle = document.createElement('h5')
      synonymsTitle.classList.add('synonyms-title')
      synonymsTitle.textContent = "Synonyms:"
      partOfSpeechContainer.appendChild(synonymsTitle)
      
      element.synonyms.forEach(element => {
        
        let synonym = document.createElement('p')
        synonym.classList.add('synonym')
        let synonymString = element.charAt(0).toUpperCase() + element.slice(1)
        synonym.textContent = synonymString
        partOfSpeechContainer.appendChild(synonym)
      });
    }
    
    //antonyms
    if(element.antonyms.length > 0) {
      let antonymsTitle = document.createElement('h5')
      antonymsTitle.classList.add('antonyms-title')
      antonymsTitle.textContent = "Antonyms:"
      partOfSpeechContainer.appendChild(antonymsTitle)
      
      element.antonyms.forEach(element => {
        
        let antonyms = document.createElement('p')
        antonyms.classList.add('antonym')
        let antonymsString = element.charAt(0).toUpperCase() + element.slice(1)
        antonyms.textContent = antonymsString
        partOfSpeechContainer.appendChild(antonyms)
      });
    }
    //division
    let division = document.createElement('span')
    division.classList.add('division')
    partOfSpeechContainer.appendChild(division)
  });
  
  //phonetic
  let phonetics = word[0].phonetics
  let phoneticContainer = document.createElement('div')
  phoneticContainer.classList.add('phonetic-container')
  meaingContainer.appendChild(phoneticContainer)
  
  for(var i = 0; i<phonetics.length; i++) {
    if(phonetics[i].text !== undefined) {
      let phoneticTitle = document.createElement('h3');
      phoneticTitle.classList.add('phonetic-title')
      phoneticTitle.textContent = 'Pronunciation:'
      phoneticContainer.appendChild(phoneticTitle)
      
      let phonetic = document.createElement('p');
      phonetic.classList.add('phonetic')
      phonetic.textContent = phonetics[i].text
      phoneticContainer.appendChild(phonetic)
      
      break
    }
  }
}