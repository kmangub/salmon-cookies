'use strict';
var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var totalForEachHour = [];
var totalOfAllLocations = 0;
var tableElement = document.getElementById('sales-table');

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
Store.prototype.render = function () {
  this.calcHourlySalesArray();
  var tableEl = document.getElementById('table-body');
  var tableRowEl = document.createElement('tr');
  var tableHeadEl = document.createElement('th');
  tableHeadEl.textContent = this.location;
  tableRowEl.append(tableHeadEl);
  tableEl.append(tableRowEl);

  for (var i = 0; i < hoursOfOperation.length; i++) {
    var tableDataEl = document.createElement('td');
    tableDataEl.textContent = this.hourlySalesArray[i];
    tableRowEl.append(tableDataEl);
  }
  tableDataEl = document.createElement('td');
  tableDataEl.textContent = `Total: ${this.dailySalesTotal} cookies`;
  tableRowEl.append(tableDataEl);
  tableEl.append(tableRowEl);
};

var seattle = new Store('Seattle', 23, 65, 6.3);
var tokyo = new Store('Tokyo', 3, 24, 1.2);
var dubai = new Store('Dubai', 11, 38, 3.7);
var paris = new Store('Paris', 20, 38, 2.3);
var lima = new Store('Lima', 2, 16, 4.6);

for (var i = 0; i < allLocations.length; i++) {
  allLocations[i].render();
}


function makeHeaderRow() {
  var hoursTableEl = document.getElementById('table-head');
  var hoursRowsEl = document.createElement('tr'); // Create new row
  var tableRowEl = document.createElement('th');
  tableRowEl.textContent = 'locations';
  hoursRowsEl.appendChild(tableRowEl);
  var hoursTitleDataEl = document.createElement('td'); // Give row contents
  hoursTitleDataEl.textContent = 'Hours of Operation';
  hoursRowsEl.append(hoursTitleDataEl);

  for (var i = 0; i < hoursOfOperation.length; i++) {
    var hoursDataEl = document.createElement('td');
    hoursDataEl.textContent = hoursOfOperation[i];
    hoursRowsEl.append(hoursDataEl);
    hoursTableEl.append(hoursRowsEl);
  }
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

function makeFooterRow() {

  var totalsOfAllEl = document.getElementById('table-foot');
  var totalsRowsEl = document.createElement('tr');
  var totalsDataEl = document.createElement('th');
  totalsDataEl.textContent = 'Totals';
  totalsRowsEl.append(totalsDataEl);
  totalsOfAllEl.append(totalsRowsEl);
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

  var minCust = event.target.minCust.value;
  console.log('minCust: ', minCust);

  var maxCust = event.target.maxCust.value;
  console.log('maxCust: ', maxCust);

  var avgCookieSale = event.target.avgCookieSale.value;
  console.log('AvgCookieSale: ', avgCookieSale);

  var newLocation = new Store(location, minCust, maxCust, avgCookieSale);
  allLocations.push(newLocation);

  renderTable();
}

addNewLocation.addEventListener('submit', handleSubmit);

function renderTable() {
  tableElement.innerHTML = '';
  makeHeaderRow();
  for (var i = 0; i < allLocations.length; i++) {
    allLocations[i].render();
  }
  makeFooterRow();
}

renderTable();
