// to do: find out about nested array like json to add more data fields per side, like word, description, etc.

// navigation
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function changeSizeBySlider() {
  var cont = document.querySelectorAll(".sizeable")
  var slider = document.getElementById("slider");
  for (i = 0; i < cont.length; i++) {
    cont[i].style.fontSize = slider.value + "px";
  }
};






var menuItems = items
levels = ["A1A", "A1B", "A1C", "A1D", "A2A", "A2B", "A2C", "A2D", "B1A", "B1B", "B1C", "B1D", "B1+A", "B1+B", "B1+C", "B1+D", "B2A", "B2B", "B2C", "B2D", "B2E", "B2F", "C1A", "C1B", "C1C", "C1D", "C1E", "C1F", "any"]

function makeAccordianPanels() {
  for (var z = 0; z < levels.length; z++) {
    var b = document.createElement("button");
    b.setAttribute("class", "accordion");
    b.setAttribute("id", "button"+z);
    b.innerHTML = levels[z];
    document.getElementById("overlay-menu").appendChild(b);
    var d = document.createElement("div");
    d.setAttribute("class", "panel");
    d.setAttribute("id", "panel"+z);
    document.getElementById("overlay-menu").appendChild(d);
    var d2 = document.createElement("div");
    d2.setAttribute("style", "display: inline-block;");
    d2.setAttribute("id", "panelinner"+z);
    document.getElementById("panel"+z).appendChild(d2);
    var p = document.createElement("p");
    p.setAttribute("id", "accordion-section-"+levels[z]);
    p.setAttribute("style", "display: inline-block;");
    document.getElementById("panelinner"+z).appendChild(p);
  }

  for (var w = 0; w < menuItems.length; w++) {
    var a = document.createElement("A");
    a.setAttribute("href", menuItems[w].url);
    a.innerHTML = menuItems[w].name;
    var level = menuItems[w].level;
    // var x = document.getElementById("accordion-section-"+level);
    // console.log(x);
    document.getElementById("accordion-section-"+level).appendChild(a);
  }
}

makeAccordianPanels();







//create flashcards
var items = Words


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

function hideButtons() {
  document.getElementById("toggleSidesButton").style.display = "none";
  document.getElementById("toggleShuffle").style.display = "none";
  document.getElementById("start").style.display = "none";
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

//------------------------------------------------------------------------------
// accordion script
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "inline") {
      panel.style.display = "none";
    } else {
      panel.style.display = "inline";
    }
  });
}

//------------------------------------------------------------------------------
// Slider script
// $("#slider").on("input",function () {
//             $('#name').css("font-size", $(this).val() + "px");
//     });
