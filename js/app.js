'use strict';
var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var totalForEachHour = [];
var totalOfAllLocations = 0;
// var tableElement = document.getElementById('sales-table');

//source from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

var allLocations = [];

function Store(location, minCust, maxCust, avgCookieSale) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSale = avgCookieSale;
  this.hourlySalesArray = [];
  this.dailySalesTotal = 0;
  allLocations.push(this);
}

Store.prototype.calcHourlySalesArray = function () {
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var hourlySales = Math.ceil(getRandomIntInclusive(this.minCust, this.maxCust) * this.avgCookieSale);
    this.hourlySalesArray.push(hourlySales);
    this.dailySalesTotal += hourlySales;
  }
};
var tableEl = document.getElementById('table-body');
Store.prototype.render = function () {
  this.calcHourlySalesArray();
  var tableRowEl = document.createElement('tr');
  var tableHeadEl = document.createElement('td');
  tableHeadEl.textContent = this.location;
  tableRowEl.append(tableHeadEl);
  tableEl.append(tableRowEl);

  for (var i = 0; i < hoursOfOperation.length; i++) {
    var tableDataEl = document.createElement('td');
    tableDataEl.textContent = this.hourlySalesArray[i];
    tableRowEl.append(tableDataEl);
  }
  tableDataEl = document.createElement('td');
  tableDataEl.textContent = this.dailySalesTotal;
  tableRowEl.append(tableDataEl);
  tableEl.append(tableRowEl);
};

new Store('Seattle', 23, 65, 6.3);
new Store('Tokyo', 3, 24, 1.2);
new Store('Dubai', 11, 38, 3.7);
new Store('Paris', 20, 38, 2.3);
new Store('Lima', 2, 16, 4.6);

for (var i = 0; i < allLocations.length; i++) {
  allLocations[i].render();
}


var hoursTableEl = document.getElementById('table-head');
function makeHeaderRow() {
  console.log(hoursTableEl);
  var hoursRowsEl = document.createElement('tr'); // Create new row
  var tableRowEl = document.createElement('th');
  tableRowEl.textContent = 'locations';
  hoursRowsEl.appendChild(tableRowEl);

  // var hoursTitleDataEl = document.createElement('td'); // Give row contents
  // hoursTitleDataEl.textContent = 'Hours of Operation';
  // hoursRowsEl.appendChild(hoursTitleDataEl);

  for (var i = 0; i < hoursOfOperation.length; i++) {
    var hoursDataEl = document.createElement('th');
    hoursDataEl.textContent = hoursOfOperation[i];
    hoursRowsEl.appendChild(hoursDataEl);
  }
  tableRowEl = document.createElement('th');
  tableRowEl.textContent = 'Totals';
  hoursRowsEl.append(tableRowEl);
  hoursTableEl.appendChild(hoursRowsEl);
}

function getTotalHourSales() {
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var hourTotal = 0;
    for (var j = 0; j < allLocations.length; j++) {
      hourTotal += allLocations[j].hourlySalesArray[i];
    }
    totalOfAllLocations += hourTotal;
    totalForEachHour[i] = hourTotal;
  }
}

getTotalHourSales();


var tableFoot = document.getElementById('table-foot');
function makeFooterRow() {

  var totalsRowsEl = document.createElement('tr');
  var totalsDataEl = document.createElement('th');
  totalsDataEl.textContent = 'Totals';
  totalsRowsEl.append(totalsDataEl);
  tableFoot.append(totalsRowsEl);
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var totalHourlyData = document.createElement('td');
    totalHourlyData.textContent = totalForEachHour[i];
    totalsRowsEl.append(totalHourlyData);
  }
  var grandTotal = document.createElement('td');
  grandTotal.textContent = totalOfAllLocations;
  totalsRowsEl.append(totalOfAllLocations);
}
// Forms ------------------------------------------------------
var addNewLocation = document.getElementById('new-place');

function handleSubmit(event) {
  event.preventDefault();

  var location = event.target.location.value;
  console.log('location: ', location);

  var minCust = parseInt(event.target.minCust.value);
  console.log('minCust: ', typeof minCust);

  var maxCust = parseInt(event.target.maxCust.value);
  console.log('maxCust: ', typeof maxCust);

  var avgCookieSale = parseInt(event.target.avgCookieSale.value);
  console.log('AvgCookieSale: ', typeof avgCookieSale);

  var newLocation = new Store(location, minCust, maxCust, avgCookieSale);
  newLocation.render();
  tableFoot.innerHTML = '';
  totalForEachHour = [];
  totalOfAllLocations = 0;
  getTotalHourSales();
  makeFooterRow();

  event.target.location.value = null;
}
makeHeaderRow();
makeFooterRow();
addNewLocation.addEventListener('submit', handleSubmit);

// function renderTable() {
//   // tableElement.innerHTML = '';
//   makeHeaderRow();
//   for (var i = 0; i < allLocations.length; i++) {
//     allLocations[i].render();
//   }
//   makeFooterRow();
// }

// renderTable();
