// New Version main-2.js
// to do: find out about nested array like json to add more data fields per side, like word, description, etc.

// navigation



a counter
left and right arrows
every time left is pressed, number goes down
every time right is pressed, number goes up
html comes directly from array each time pressed, instead of creating a bunch of divs














//create flashcards
var items = [
{
"Side1": "do homework",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
},
{
"Side1": "do yoga",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
},
{
"Side1": "go hiking",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
},
{
"Side1": "go jogging",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
},
{
"Side1": "go online",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
},
{
"Side1": "go shopping",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
},
{
"Side1": "go to the movies",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
},
{
"Side1": "have coffee with friends",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
},
{
"Side1": "listen to music",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
},
{
"Side1": "listen to boring music",
"Side1Image": "",
"Side2": "XXX",
"Side2Image": ""
}
]



function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    console.log(arra1);
    return arra1;

}

function makeDivs(shuffleOrInOrder) {
  if (shuffleOrInOrder==="shuffle") {
    shuffle(items);
  }
  for (var z = 0; z < items.length; z++) {
    var divs = document.createElement("DIV");
    divs.setAttribute("class", "slide");
    divs.setAttribute("data-anchor", z);

    if (items[0].Side1Image !== "" && items[0].Side1 !== "") {
      cardHTML = `<div class='card-div'><div class='card-item'><h2 class='sizeable' id='image${z}' onclick='toggleAnswer()'>${items[z].Side1}</h2></div><div class='card-item'><img src='${items[z].Side1Image}'></div></div>`;
    }
    else if (items[0].Side1Image !== "" && items[0].Side1 == "") {
      cardHTML = `<div class='card-div-full'><img id='image${z}' onclick='toggleAnswer()' src='${items[z].Side1Image}'><h2 class='sizeable' onclick='toggleAnswer()' id='answer${z}' style='display: none;'>${items[z].Side2}</h2></div>`;
    }
    else { if (side2first === false)
      {cardHTML = `<div class='card-div-full'><h2 class='sizeable' id='image${z}' onclick='toggleAnswer()'>${items[z].Side1}</h2><h2 class='sizeable' onclick='toggleAnswer()' id='answer${z}' style='display: none;'>${items[z].Side2}</h2></div>`;}

      else {cardHTML = `<div class='card-div-full'><h2 class='sizeable' id='image${z}' onclick='toggleAnswer()'>${items[z].Side2}</h2><h2 class='sizeable' onclick='toggleAnswer()' id='answer${z}' style='display: none;'>${items[z].Side1}</h2></div>`;}
    }
    divs.innerHTML=cardHTML;
    document.getElementById("fullpage-div").appendChild(divs);
  }
}

function makeFullPage() {
  var myFullpage = new fullpage('#fullpage', {
    menu: '#menu',
    anchors:[''],
    scrollingSpeed: 300,
    continuousHorizontal: false,
    touchSensitivity: 1,
    sectionsColor: ['#ffffff', '#ffffff', ],
    controlArrows: false
  });
}


function nextSlide() {
  fullpage_api.moveSlideRight();
}

function prevSlide() {
  fullpage_api.moveSlideLeft();
}

function toggleAnswer() {
  var activeSlide = fullpage_api.getActiveSlide();
  var anchor = activeSlide.anchor;
  var answer = "answer" + anchor
  var image = "image" + anchor
  var answerElement = document.getElementById(answer);
  var imageElement = document.getElementById(image);
  if (answerElement.style.display === "none") {
    answerElement.style.display = "inline-block";
    imageElement.style.display = 'none';
  } else {
    answerElement.style.display = 'none';
    imageElement.style.display = "inline-block";
  };
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode == 40 || event.keyCode == 32)
      toggleAnswer();
  });

document.getElementById("start").addEventListener("click", function() {
    makeDivs(shuffleOrNot);
    hideButtons();
    makeFullPage();

});


//------------------------------------------------------------------------------
var shuffleOrNot = "not"
document.getElementById("toggleShuffle").addEventListener("click", function() {
  if (shuffleOrNot == "not") {
    shuffleOrNot = "shuffle";
    document.getElementById("toggleShuffle").innerHTML="Shuffle";
    document.getElementById("toggleShuffle").style.backgroundColor="#31AFD4";
    document.getElementById("toggleShuffle").style.color="white";
  }
  else {
    shuffleOrNot = "not";
    document.getElementById("toggleShuffle").innerHTML="In Order"
    document.getElementById("toggleShuffle").style.backgroundColor="transparent";
    document.getElementById("toggleShuffle").style.color="black";
  }
  //change text and color
  console.log(shuffleOrNot);
});

//------------------------------------------------------------------------------
var side2first = false;
function toggleSides() {
  if (side2first === false) {
    side2first = true;
    document.getElementById("toggleSidesButton").innerHTML="Side 2";
    document.getElementById("toggleSidesButton").style.backgroundColor="#31AFD4";
    document.getElementById("toggleSidesButton").style.color="white";
  } else {
    side2first = false;
    document.getElementById("toggleSidesButton").innerHTML="Side 1"
    document.getElementById("toggleSidesButton").style.backgroundColor="transparent";
    document.getElementById("toggleSidesButton").style.color="black";
  }
}
