'use strict';
var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var totalForEachHour = [];
var totalOfAllLocations = 0;

//source from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}


function Store(location, minCust, maxCust, avgCookieSale) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSale = avgCookieSale;
  this.hourlySalesArray = [];
  this.dailySalesTotal = 0;
}

Store.prototype.calcHourlySalesArray = function () {
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var hourlySales = Math.ceil(getRandomIntInclusive(this.minCust, this.maxCust) * this.avgCookieSale);
    this.hourlySalesArray.push(hourlySales);
    this.dailySalesTotal += hourlySales;
  }
};

var hoursTableEl = document.getElementById('table-head');
var hoursRowsEl = document.createElement('tr'); // Create new row

var hoursTitleDataEl = document.createElement('td'); // Give row contents
hoursTitleDataEl.textContent = 'Hours of Operation';
hoursRowsEl.append(hoursTitleDataEl);

for (var i = 0; i < hoursOfOperation.length; i++) {
  var hoursDataEl = document.createElement('td');
  hoursDataEl.textContent = hoursOfOperation[i];
  hoursRowsEl.append(hoursDataEl);
  hoursTableEl.append(hoursRowsEl);
}

Store.prototype.render = function () {
  this.calcHourlySalesArray();
  var tableEl = document.getElementById('table-body');
  var tableRowEl = document.createElement('tr');
  var tableHeadEl = document.createElement('th');
  tableHeadEl.textContent = this.location;
  tableRowEl.append(tableHeadEl);
  tableEl.append(tableRowEl);

  for (i = 0; i < hoursOfOperation.length; i++) {
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

var allLocations = [seattle, tokyo, dubai, paris, lima];

seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();


function getTotalHourSales() {
  for (i = 0; i < hoursOfOperation.length; i++) {
    var hourTotal = 0;
    for (var j = 0; j < allLocations.length; j++) {
      hourTotal += allLocations[j].hourlySalesArray[i];
    }
    totalOfAllLocations += hourTotal;
    totalForEachHour[i] = hourTotal;
  }
}

getTotalHourSales();

var totalsOfAllEl = document.getElementById('table-foot');
var totalsRowsEl = document.createElement('tr');
var totalsDataEl = document.createElement('th');
totalsDataEl.textContent = 'totals';
totalsRowsEl.append(totalsDataEl);
totalsOfAllEl.append(totalsRowsEl);
for (i = 0; i <hoursOfOperation.length; i++) {
  var totalHourlyData = document.createElement('td');
  totalHourlyData.textContent = totalForEachHour[i];
  totalsRowsEl.append(totalHourlyData);
}
var grandTotal = document.createElement('td');
grandTotal.textContent = totalOfAllLocations;
totalsRowsEl.append(totalOfAllLocations);
