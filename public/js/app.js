let beerArray = [];

document.addEventListener('DOMContentLoaded', () => {
  const url = 'https://api.punkapi.com/v2/beers';

  makeRequest(url, populateBeer);
});

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
}

const populateBeer = function() {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  beerArray = JSON.parse(jsonString);
  const beerListContainer = document.querySelector('#beer-list');
  console.log(beerArray);
  beerArray.forEach(beer => renderBeer(beerListContainer, beer));
  populateBeerSelector();
}

const renderBeer = function(parent, beerObject) {
  const container = document.createElement('div');

  const name = document.createElement('h3');
  name.textContent = beerObject.name;

  const image = document.createElement('img');
  image.src = beerObject.image_url;
  image.classList.add('beer-image');

  container.appendChild(name);
  container.appendChild(image);

  parent.appendChild(container);
}

const populateBeerSelector = function() {
  const selector = document.querySelector('#beer-selector')
  let index = 0;
  beerArray.forEach(beer => {
    createBeerSelection(selector, beer, index);
    index ++;
  });
}

const createBeerSelection = function(parent, beer, index) {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = beer.name;
  parent.appendChild(option);
  parent.onchange=onBeerOptionListener;
}

const onBeerOptionListener = function() {
  const beer = beerArray[this.value];
  const beerWrapper = document.querySelector('#beer-list');
  beerWrapper.innerHTML = '';
  renderBeer(beerWrapper, beer);
}
