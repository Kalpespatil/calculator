const MAX_DIGITS = 15; // Limit for entering numbers for calculation

function clearDisplay() {
    document.getElementById('display').innerText = '0';
}

function clearLastCharacter() {
    const display = document.getElementById('display');
    if (display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1) || '0';
    } else {
        display.innerText = '0';
    }
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    const currentText = display.innerText;

    if (currentText.length < MAX_DIGITS) {
        if (currentText === '0' && value !== '.') {
            display.innerText = value;
        } else if (value === '.' && !currentText.includes('.')) {
            display.innerText += value;
        } else if (['+', '-', '*', '/'].includes(value)) {
            const lastChar = currentText.slice(-1);
            if (['+', '-', '*', '/'].includes(lastChar)) {
                display.innerText = currentText.slice(0, -1) + value;
            } else {
                display.innerText += value;
            }
        } else {
            display.innerText += value;
        }
    }
}

function calculateResult() {
    const display = document.getElementById('display');
    try {
        const result = new Function('"use strict"; return (' + display.innerText + ')')();
        display.innerText = result.toString().length <= MAX_DIGITS ? result : result.toExponential();
    } catch (e) {
        display.innerText = 'Error';
        setTimeout(clearDisplay, 1500); // Reset display after 1.5 seconds
    }
}

// Add event listeners for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        clearLastCharacter();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
