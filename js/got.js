function getGameOfThronesCharacteraliveCharacterss(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacteraliveCharacterss(xhttp) {
  // Nem szabad globálisba kitenni a useraliveCharacterss-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  var aliveCharacters = aliveSearch(userDatas);
  aliveSort(aliveCharacters);
  balFeltoltes(aliveCharacters);
  addEventListenerToImg(aliveCharacters);
  clickOnCharacters(aliveCharacters);
  clickie(aliveCharacters);
}

getGameOfThronesCharacteraliveCharacterss(
  "./json/got.json",
  successGetGameOfThronesCharacteraliveCharacterss
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */



// kik élnek, kimentve tömbbe.
function aliveSearch(aliveCharacters) {
  var alive = [];
  for (var a = 0; a < aliveCharacters.length; a++) {
    if (!aliveCharacters[a].dead) {
      alive.push(aliveCharacters[a]);
    }
  }
  return alive;
}

//meglévő tömb ABC sorrendbe állítása.
function aliveSort(aliveCharacters) {
  aliveCharacters.sort(function customSort(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });
}
// Baloldal feltöltése képekkel és nevekkel.
function balFeltoltes(aliveChars) {
  var leftDiv = document.querySelector(".left___div");
  for (var p = 0; p < aliveChars.length; p++) {
    leftDiv.innerHTML += `<div class="div___left--portraits">
    <img class="alivePort" src="./${aliveChars[p].portrait}" alt="${
      aliveChars[p].name
    }">
    <p class="div___left--names">${aliveChars[p].name}</p>
    </div>`;
  }
}
//
function clickie(aliveCharacters) {
  var aliveC = aliveCharacters;
  var buttonClick = document.getElementById('srcBtn');
  var idetedd = document.querySelector(".right___div___clicked");
  buttonClick.addEventListener('click', function kereses(aliveCharacters) {
    var inputData = document.getElementById('srcField').value;
    for (var s = 0; s < aliveC.length; s++) {
      if (aliveC[s].name === inputData) {
        idetedd.innerHTML = `
        <img  class="pct" src="./${aliveC[s].picture}">
        <p><b>${aliveC[s].name} </b>
        <br>
        <br>
        <img class="character__houses-pic" src="assets/houses/${aliveC[s].house}.png">
        <br>
        ${aliveC[s].bio}</p>`;
      }
      if (aliveC[s].name === inputData && !aliveC[s].house) {
        idetedd.innerHTML = `
        <img  class="pct" src="./${aliveC[s].picture}">
        <p><b>${aliveC[s].name} </b>
        <br>
        <br>
        ${aliveC[s].bio}</p>`;
      }
    }
  })

}



//Eventlistener ráfűzés

function addEventListenerToImg(aliveChars) {
  var clickOnImages = document.querySelectorAll(".alivePort"); // kiválasztom az összeset, de többre egyszerre nem
  for (var i = 0; i < clickOnImages.length; i += 1) {
    clickOnImages[i].addEventListener("click", function fn() {
      // itt ad ténylegesen figyelőt mindegyiknek külön
      clickOnCharacters(aliveChars, this.alt);
      house(aliveChars, this.alt);
    });
  }
}

function clickOnCharacters(aliveChars, character) {
  var clickPlace = document.querySelector(".right___div___clicked");
  for (var i = 0; i < aliveChars.length; i += 1) {
    if (aliveChars[i].name === character) {
      clickPlace.innerHTML = `<div>
      <img  class="pct" src="./${aliveChars[i].picture}">
      <p><b>${aliveChars[i].name} </b>
      <br>
      <br>
      ${aliveChars[i].bio}</p>
      </div>`;
    }
    house(aliveChars, aliveChars[i]);
  }
}

// van e házikó

function house(aliveCharacters, character) {
  var houseDiv = document.querySelector(".right___div___clicked");
  for (var h = 0; h < aliveCharacters.length; h++) {
    if (aliveCharacters[h].name === character && aliveCharacters[h].house) {
      houseDiv.innerHTML += `<img class="character__houses-pic" src="assets/houses/${
        aliveCharacters[h].house
      }.png">`;
    }
  }
}