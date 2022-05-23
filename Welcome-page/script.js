const wrapper = document.createElement("div");
wrapper.classList.add('wrapper')
    // adding paragraph
const paragraph = document.createElement('p');
const paragraphTxt = document.createTextNode("Welcome to amazing");
paragraph.appendChild(paragraphTxt);
// adding title
const title = document.createElement('h1');
const titleTxt = document.createTextNode("Book Shop");
title.appendChild(titleTxt);
// adding graphic
const graphic = document.createElement('img');
graphic.src = "./assets/graphic.png";
// adding button
const startButton = document.createElement("a");
const startButtonTxt = document.createTextNode("Shop now");
startButton.href = "file:///Users/ana/Book-shop/Book-shop/Book-catalogue/index.html"
startButton.appendChild(startButtonTxt);

wrapper.appendChild(paragraph);
wrapper.appendChild(title);
wrapper.appendChild(graphic);
wrapper.appendChild(startButton);

if (document.body != null) {
    // Add fragment to a list: 
    document.body.appendChild(wrapper);
}