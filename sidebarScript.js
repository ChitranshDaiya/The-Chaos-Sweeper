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

function changeVolume(volume) {
    var audio = document.getElementById('bgMusic');
    audio.volume = volume;
}