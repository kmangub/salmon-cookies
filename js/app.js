'use strict';
var hoursOfOperation = ['6am','7am', '8am','9am', '10am','11am','12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

//console.log(document);

// Manipulate the DOM! with js

//Seattle --------------------------------

var seattle = {
  location: 'Seattle',
  minCust: 23,
  maxCust: 65,
  avgCookieSale: 6.3,
  hourlySalesArray: [],
  dailySalesTotal: 0,
  calcHourlySalesArray: function () {
    for(var i = 0; i < hoursOfOperation.length; i++) {
      var hourlySales = Math.ceil(getRandomIntInclusive(this.minCust, this. maxCust) * this.avgCookieSale);
      this.hourlySalesArray.push(hourlySales);
      this.dailySalesTotal += hourlySales;
    }
  },
  render: function(){
    this.calcHourlySalesArray();
    var ulEl = document.getElementById('seattle');
    for (var i = 0; i < hoursOfOperation.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = `${hoursOfOperation[i]}: ${this.hourlySalesArray[i]} cookies`;
      ulEl.append(liEl);
    }
    liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.dailySalesTotal} cookies`;
    ulEl.append(liEl);
  }
};

//Tokyo ----------------------------------

var tokyo = {
  location: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  avgCookieSale: 1.2,
  hourlySalesArray: [],
  dailySalesTotal: 0,
  calcHourlySalesArray: function () {
    for(var i = 0; i < hoursOfOperation.length; i++) {
      var hourlySales = Math.ceil(getRandomIntInclusive(this.minCust, this. maxCust) * this.avgCookieSale);
      this.hourlySalesArray.push(hourlySales);
      this.dailySalesTotal += hourlySales;
    }
  },
  render: function(){
    this.calcHourlySalesArray();
    var ulEl = document.getElementById('tokyo');
    for (var i = 0; i < hoursOfOperation.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = `${hoursOfOperation[i]}: ${this.hourlySalesArray[i]} cookies`;
      ulEl.append(liEl);
    }
    liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.dailySalesTotal} cookies`;
    ulEl.append(liEl);
  }
};

var dubai = {
  location: 'Dubai',
  minCust: 11,
  maxCust: 38,
  avgCookieSale: 3.7,
  hourlySalesArray: [],
  dailySalesTotal: 0,
  calcHourlySalesArray: function () {
    for(var i = 0; i < hoursOfOperation.length; i++) {
      var hourlySales = Math.ceil(getRandomIntInclusive(this.minCust, this. maxCust) * this.avgCookieSale);
      this.hourlySalesArray.push(hourlySales);
      this.dailySalesTotal += hourlySales;
    }
  },
  render: function(){
    this.calcHourlySalesArray();
    var ulEl = document.getElementById('dubai');
    for (var i = 0; i < hoursOfOperation.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = `${hoursOfOperation[i]}: ${this.hourlySalesArray[i]} cookies`;
      ulEl.append(liEl);
    }
    liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.dailySalesTotal} cookies`;
    ulEl.append(liEl);
  }
};

var paris = {
  location: 'Paris',
  minCust: 20,
  maxCust: 38,
  avgCookieSale: 2.3,
  hourlySalesArray: [],
  dailySalesTotal: 0,
  calcHourlySalesArray: function () {
    for(var i = 0; i < hoursOfOperation.length; i++) {
      var hourlySales = Math.ceil(getRandomIntInclusive(this.minCust, this. maxCust) * this.avgCookieSale);
      this.hourlySalesArray.push(hourlySales);
      this.dailySalesTotal += hourlySales;
    }
  },
  render: function(){
    this.calcHourlySalesArray();
    var ulEl = document.getElementById('paris');
    for (var i = 0; i < hoursOfOperation.length; i++){
      var liEl = document.createElement('li');
      liEl.textContent = `${hoursOfOperation[i]}: ${this.hourlySalesArray[i]} cookies`;
      ulEl.append(liEl);
    }
    liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.dailySalesTotal} cookies`;
    ulEl.append(liEl);
  }
};

// var lima = {
//   location: 'Lima',
//   minCust: 2,
//   maxCust: 16,
//   avgCookieSale: 4.6
// };

//source from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}


seattle.render();
tokyo.render();
dubai.render();
paris.render();


