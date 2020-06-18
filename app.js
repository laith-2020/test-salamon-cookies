'use strict';

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var cites = [];

function Shop(cityName, minCus, maxCus, avgCookie) {
    this.cityName = cityName;
    this.minCus = minCus;
    this.maxCus = maxCus;
    this.avgCookie = avgCookie;
    this.cusPerHour = [];
    this.cookiePerHour = [];
    this.total = 0;
    cites.push(this);
}

Shop.prototype.getCustPerHour = function () {
    for (var i = 0; i < hours.length; i++) {
        this.cusPerHour[i] = getRandomNum(this.minCus, this.maxCus);
    }

}

Shop.prototype.getCookiePerHour = function () {
    for (var i = 0; i < hours.length; i++) {
        this.cookiePerHour[i] = Math.floor(this.cusPerHour[i] * this.avgCookie);
        this.total += this.cookiePerHour[i];
    }
}

Shop.prototype.renderTable = function () {
    var container1 = document.getElementById('tableInfo');
    var trow2 = document.createElement('tr');
    container1.appendChild(trow2);

    var tdata1 = document.createElement('td');
    trow2.appendChild(tdata1);
    tdata1.textContent = this.cityName;

    for (var i = 0; i < hours.length; i++) {
        var tdata2 = document.createElement('td');
        trow2.appendChild(tdata2);
        tdata2.textContent = this.cookiePerHour[i];
    }

    var tdata3 = document.createElement('td');
    trow2.appendChild(tdata3);
    tdata3.textContent = this.total;
}


function header() {
    var container = document.getElementById('unord');
    var table1 = document.createElement('table');
    container.appendChild(table1);
    table1.setAttribute('id', 'tableInfo');

    var trow1 = document.createElement('tr');
    table1.appendChild(trow1);

    var thead1 = document.createElement('th');
    trow1.appendChild(thead1);
    thead1.textContent = " ";

    for (var i = 0; i < hours.length; i++) {
        var thead2 = document.createElement('th');
        trow1.appendChild(thead2);
        thead2.textContent = hours[i] + ' : ';
    }

    var thead3 = document.createElement('th');
    trow1.appendChild(thead3);
    thead3.textContent = ' Daily Total :';

}


var seattle = new Shop('Seattle', 23, 65, 6.3);
var tokyo = new Shop('tokyo', 3, 24, 1.2);
var dubai = new Shop('dubai', 11, 38, 3.7);
var paris = new Shop('paris', 20, 38, 2.5);
var lima = new Shop('lima', 2, 16, 4.6);

function calling() {
    for (var i = 0; i < cites.length; i++) {
        cites[i].getCustPerHour();
        cites[i].getCookiePerHour();
        cites[i].renderTable();
    }
}


function tableFooter() {
    var container1 = document.getElementById('tableInfo');
    var trow3 = document.createElement('tr');
    container1.appendChild(trow3);

    var tablehead1 = document.createElement('th');
    trow3.appendChild(tablehead1);
    tablehead1.textContent = 'Total : ';

    var totalOfTotal = 0;
    for (var i = 0; i < hours.length; i++) {
        var totalOfHours = 0;
        for (var j = 0; j < cites.length; j++) {
            totalOfHours += cites[j].cookiePerHour[i];
            totalOfTotal += cites[j].cookiePerHour[i];

        }
        var tdata4 = document.createElement('td');
        trow3.appendChild(tdata4);
        tdata4.textContent = totalOfHours;

    }
    var tdata5 = document.createElement('td');
    trow3.appendChild(tdata5);
    tdata5.textContent = totalOfTotal;

}

function deleteLastRow() {
    document.getElementById('tableInfo').deleteRow(length - 1);
}

var salesForm = document.getElementById('salesForm');
salesForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var shopNameValue = event.target.shopName.value;
    var minCusValue = event.target.minCus.value;
    var maxCusValue = event.target.maxCus.value;
    var avgCookieValue = event.target.avgCookie.value;

    var newCity = new Shop(shopNameValue, minCusValue, maxCusValue, avgCookieValue);

    newCity.getCustPerHour();
    newCity.getCookiePerHour();
    deleteLastRow();
    newCity.renderTable();
    tableFooter();


});

header();
calling();
tableFooter();

// // var cusPerHour = [];
// var seattle = {
//     minCus: 23,
//     maxCus: 65,
//     avgCookie: 6.3,
//     cusPerHour: [],
//     cookiePerHour: [],
//     sales: [],
//     hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
//     getCustPerHour: function(){
//         for(var i=0; i< this.hours.length; i++){
//             this.cusPerHour[i] = getRandomNum(this.minCus ,this.maxCus);
//         }

//     },
//     getCookiePerHour: function(){
//         var total= 0 ;
//         for(var i = 0 ; i < this.hours.length; i++ ){
//             this.cookiePerHour[i] = Math.floor(this.cusPerHour[i] * this.avgCookie);
//             total += this.cookiePerHour[i];  

//         }
//         this.sales[14] =' total :' + total +' cookies';
//         console.log(total);
//     },
//     render: function(){
//         var container = document.getElementById('unord');
//         var ulc1 = document.createElement('ul');
//         container.appendChild(ulc1);

//         for(var i = 0 ; i < this.hours.length; i++){
//             var lic1 = document.createElement('li');
//             ulc1.appendChild(lic1);

//             lic1.textContent = this.hours[i] + ' : ' + this.cookiePerHour[i] + " cookies " ;
//         }
//         var li2 =document.createElement('li');
//         ulc1.appendChild(li2);
//         li2.textContent = this.sales;        
//     }
// };

// seattle.getCustPerHour();
// // console.log('Number of cust', seattle.cusPerHour);
// seattle.getCookiePerHour();
// // console.log('Number of cook', seattle.cookiePerHour);
// seattle.render();


