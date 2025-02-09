function getClue(button, value) {
    var clue = '';
    var color = '';
    switch(value) {
        case '1':
            clue = 'Clue 1. The prime path I lead, symmetry I guard. Divide my worth, and triumph isn\'t hard.';
            color = 'green';
            break;
        case '2':
            clue = 'Clue 2. From a genie\'s lamp to curses dark, fate and musketeers leave their mark.';
            color = 'green';
            break;
        case '3':
            clue = 'Clue 3. Olympic rings abound, a hand\'s full band. Your senses stay sharp in a weekend-less land.';
            color = 'green';
            break;
        case '4':
            clue = 'Clue 4. In races won, I\'m the ace you find, in binary’s realm, I lead the kind.';
            color = 'green';
            break;
        default:
            clue = 'There\'s nothing here, should try somewhere else.';
            color = 'red';
    }
    button.textContent = clue;
    button.style.backgroundColor = color;
    button.disabled = true;
}
function enterDigit(digit) {
    const pinInput = document.getElementById('pinInput');
    if (pinInput.value.length < 4) {
        pinInput.value += digit;
    }
}
function deleteLastDigit() {
    const pinInput = document.getElementById('pinInput');
    pinInput.value = pinInput.value.slice(0, -1);
}
function checkCode() {
    const code = document.getElementById('pinInput').value;
    if (code === "2351") {
        showScreen('#enterCode', '#p2_2')
    } else {
        document.getElementById('result').innerText = "Incorrect code. Please try again.";
        document.getElementById('result').style.color = "#ff0000"; 
    }
}
function checkLength() {
    const pinInput = document.getElementById('pinInput');
    if (pinInput.value.length > 4) {
        pinInput.value = pinInput.value.slice(0, 4);
    }
}
function handleKeyDown(event) {
    const pinInput = document.getElementById('pinInput');
    if (event.key === "Backspace" && pinInput.value.length > 0) {
        deleteLastDigit();
        event.preventDefault();
    } else if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
    }
}

let selectedOptions = {};
function selectOption(step, option) {
    selectedOptions[step] = option;
    if (step < 5) {
        document.getElementById(`step${step + 1}`).style.display = 'block';
    } else {
        document.getElementById('submitBtn').style.display = 'block';
    }
}
function checkCombination() {
    const correctCombination = ['C', 'D', 'B', 'C', 'A'];
    let isCorrect = true;
    for (let i = 1; i <= 5; i++) {
        if (selectedOptions[i] !== correctCombination[i - 1]) {
            isCorrect = false;
            break;
        }
    }
    if (isCorrect) {
        showScreen('#p3_2', '#whyCorrect');
    } else {
        showScreen('#p3_2', '#p4_2');
    }
}