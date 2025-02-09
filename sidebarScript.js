document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('time').innerText = timeFormat(time);
    document.getElementById('energy').innerText = energy;
    document.getElementById('moneyPast').innerText = goldCoin;
    document.getElementById('moneyPresent').innerText = cash;
    document.getElementById('moneyFuture').innerText = bitCoin;
    document.getElementById('strength').innerText = strength;
    document.getElementById('intelligence').innerText = intelligence;
});

function openSidebar() {
    document.getElementById('mySidebar').style.display = 'block';
    document.getElementById('open-btn').style.display = 'none';
}

function closeSidebar() {
    document.getElementById('mySidebar').style.display = 'none';
    document.getElementById('open-btn').style.display = 'inline-flex';
}

var time = parseInt(sessionStorage.getItem('time')) || 4320;
var energy = parseInt(sessionStorage.getItem('energy')) || 100;
var goldCoin = parseInt(sessionStorage.getItem('goldCoin')) || 500;
var cash = parseInt(sessionStorage.getItem('cash')) || 1000;
var bitCoin = parseInt(sessionStorage.getItem('bitCoin')) || 250;
var strength = parseInt(sessionStorage.getItem('strength')) || 20;
var intelligence = parseInt(sessionStorage.getItem('intelligence')) || 35;

function updateValues() {
    sessionStorage.setItem('time', time);
    sessionStorage.setItem('energy', energy);
    sessionStorage.setItem('bitCoin', bitCoin);
    sessionStorage.setItem('cash', cash);
    sessionStorage.setItem('goldCoin', goldCoin);
    sessionStorage.setItem('strength', strength);
    sessionStorage.setItem('intelligence', intelligence);
}

function timeFormat(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

function navigate(url, button, value) {
    let canGo = true;
    if(value.time && value.time > time) canGo = false;
    if(value.energy && value.energy > energy) canGo = false;
    if(value.moneyPast && value.moneyPast > goldCoin) canGo = false;
    if(value.moneyPresent && value.moneyPresent > cash) canGo = false;
    if(value.moneyFuture && value.moneyFuture > bitCoin) canGo = false;
    if(value.strength && value.strength > strength) canGo = false;
    if(value.intelligence && value.intelligence > intelligence) canGo = false;

    if (canGo) {
        if(value.time) time -= value.time;
        if(value.energy) energy -= value.energy;
        if(value.moneyPast) goldCoin -= value.moneyPast;
        if(value.moneyPresent) cash -= value.moneyPresent;
        if(value.moneyFuture) bitCoin -= value.moneyFuture;

        updateValues();
        location.href = url;
    } else {
        button.innerText = "Not enough resources";
        button.style.backgroundColor = 'Red';
    }
}

function changeValue(attribute, value, op) {
    if(op === '+') {
        window[attribute] += value;
    } else if(op === '-') {
        window[attribute] -= value;
    }
    
    updateValues();
}