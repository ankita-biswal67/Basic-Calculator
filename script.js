const display = document.getElementById('display');
let currentExpression = '';
let lastActionWasEquals = false;


function showMessageBox(message) {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    messageText.textContent = message;
    messageBox.style.display = 'flex'; 
}


function hideMessageBox() {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'none'; 


function appendCharacter(char) {
   
    if (lastActionWasEquals && !isNaN(char)) {
        currentExpression = ''; 
        lastActionWasEquals = false;
    } else if (lastActionWasEquals && (char === '+' || char === '-' || char === '*' || char === '/')) {
        
        lastActionWasEquals = false;
    } else if (lastActionWasEquals && char === '.') {
        
        currentExpression = '0.'; 
        lastActionWasEquals = false;
        display.textContent = currentExpression; 
        return; 
    }

    
    if (char === '.') {
       
        const parts = currentExpression.split(/[\+\-\*\/]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
            return;
        }
        if (currentExpression === '' || /[+\-*/]$/.test(currentExpression)) {
             
            currentExpression += '0.';
        } else {
            currentExpression += char;
        }
    } else {
        currentExpression += char;
    }

    display.textContent = currentExpression;
}


function clearDisplay() {
    currentExpression = '';
    display.textContent = '0';
    lastActionWasEquals = false;
}


function calculateResult() {
    if (currentExpression === '') {
        display.textContent = '0';
        return;
    }

    try {
       
        let expression = currentExpression.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100*');

        let result = eval(expression);

        
        if (!isFinite(result)) {
            showMessageBox("Error: Division by zero or invalid operation.");
            currentExpression = ''; 
            display.textContent = 'Error';
            lastActionWasEquals = true;
            return;
        }

       
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(8)); 
        }

        display.textContent = result;
        currentExpression = result.toString(); 
        lastActionWasEquals = true; 
    } catch (e) {
        showMessageBox("Error: Invalid expression.");
        currentExpression = ''; 
        display.textContent = 'Error';
        lastActionWasEquals = true;
    }
}


document.addEventListener('keydown', (event) => {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '.') {
        appendCharacter(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendCharacter(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); 
        calculateResult();
    } else if (key === 'Backspace') {
        currentExpression = currentExpression.slice(0, -1);
        display.textContent = currentExpression === '' ? '0' : currentExpression;
        lastActionWasEquals = false;
    } else if (key === 'Escape') {
        clearDisplay();
    }
});


function deleteLast() {
    if (lastActionWasEquals) {
        clearDisplay();
        return;
    }
    currentExpression = currentExpression.slice(0, -1);
    display.textContent = currentExpression === '' ? '0' : currentExpression;
    lastActionWasEquals = false;
}
