let story = `Sara had never been to a big city before. She was so [feeling] that she couldn't sleep the night before her trip. Her hometown was so small that it only had one [noun] and a gas station. Everyone knew each other's names, and life was so simple that Sara often found herself daydreaming of amazing adventures.

Finally, the day came. She got on the  [vehicle] and watched as her small town disappeared into the distance. When she arrived in the city, she was so  [-ed adjective] by the skyscrapers. They were such [adjective] buildings that she had to tilt her head back just to see the tops. The streets were so busy, filled with people rushing around, taxis  [-ing verb], and the distant sound of sirens. It was such a different world from her quiet life back home.

Eager to explore, Sara found herself in a market. It was such a lively market and the air was filled with the smell of [adjective] spices and freshly baked  [noun]. There were so many [plural noun] and [plural noun] that Sara felt like she was in a different country. She was so happily lost in the sights and sounds that she didn't notice how [-ly adverb] the time was passing.

After the market, Sara decided to visit an art museum. The art was so [adjective] that she spent [amount of time] just looking at a few pieces. She was so focused that she almost forgot to  [verb] her phone. When she did, she realized it was getting late.

Finally, Sara sat down at a cafe near a  [noun]. She was so tired from her day of  [-ing verb] but also so thrilled about her new  [noun]. As she  [simple past verb] her coffee, she watched as
[plural noun] played in the park and  [plural noun] walked hand in hand. It was such a peaceful moment, a stark contrast to the hustle and bustle of the rest of the city.

As the sun  [simple past verb], painting the sky with shades of  [color] and  [color], Sara felt so  [feeling] for this adventure. She couldn't wait to see what other [noun] the city had in store for her. She knew this trip was just the beginning of many more to come.
`;
let wordsArray = [];

function loadStory() {
  wordsArray = story.match(/\[(.*?)\]/g).map(word => word.replace(/[\[\]]/g, ''));
  displayInputFields();
}

function displayInputFields() {
  let inputFieldsDiv = document.getElementById("inputFields");
  let ol = document.createElement("ol");
  wordsArray.forEach((word, index) => {
    let li = document.createElement("li");
    li.innerHTML = `<input type="text" id="input${index}" oninput="checkInputs()" placeholder="${word}">`;
    ol.appendChild(li);
  });
  inputFieldsDiv.appendChild(ol);
}

function checkInputs() {
  let allFilled = wordsArray.every((_, index) => {
    return document.getElementById(`input${index}`).value !== "";
  });
  document.getElementById("submitBtn").disabled = !allFilled;
}

function submitMadLib() {
    let resultDiv = document.getElementById("result");
    let inputFieldsDiv = document.getElementById("inputFields");
    let submitBtn = document.getElementById("submitBtn");
    let loadStoryBtn = document.getElementById("loadStoryBtn");
  
    let finalStory = story;
    wordsArray.forEach((_, index) => {
      let userInput = document.getElementById(`input${index}`).value;
      finalStory = finalStory.replace(`[${wordsArray[index]}]`, `<span class="highlight">${userInput}</span>`);
    });
  
    // Hide input fields, submit button, and load story button
    inputFieldsDiv.style.display = "none";
    submitBtn.style.display = "none";
    loadStoryBtn.style.display = "none";
  
    resultDiv.innerHTML = finalStory;
  }  
  
  
