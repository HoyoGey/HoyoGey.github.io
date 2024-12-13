// Полифилл для метода replaceAll
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr) {
        return this.split(str).join(newStr);
    };
}

// Полифилл для Array.prototype.map
if (!Array.prototype.map) {
    Array.prototype.map = function(callback) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            arr.push(callback(this[i], i, this));
        }
        return arr;
    };
}

// Полифилл для Array.prototype.filter
if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback) {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                arr.push(this[i]);
            }
        }
        return arr;
    };
}

function addMessage(text, isUser = false, hasExplanation = false) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = isUser ? '👤' : '🤖';
    
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'content-wrapper';
    
    const content = document.createElement('div');
    content.className = 'content';
    content.innerHTML = text;
    
    contentWrapper.appendChild(content);
    
    if (hasExplanation && !isUser) {
        const explainButton = document.createElement('button');
        explainButton.className = 'explain-btn';
        explainButton.textContent = 'Объяснить решение';
        explainButton.onclick = showExplanation;
        contentWrapper.appendChild(explainButton);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentWrapper);
    messagesDiv.appendChild(messageDiv);
    
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function explainSolution(solution) {
    let explanation = 'Давайте разберем решение по шагам:\n\n';
    
    if (solution.includes('\\cdot')) {
        explanation += '1. Здесь мы применяем правило произведения:\n';
        explanation += '   (u·v)′ = u′·v + u·v′\n\n';
    }
    
    if (solution.includes('\\over')) {
        explanation += '1. Здесь мы применяем правило частного:\n';
        explanation += '   (u/v)′ = (u′·v - u·v′)/v²\n\n';
    }
    
    if (solution.includes('^')) {
        explanation += '2. Для степенной функции x^n:\n';
        explanation += '   (x^n)′ = n·x^(n-1)\n\n';
    }
    
    addMessage(explanation, false);
}

function parseExpression(expr) {
    expr = expr.replace(/\s+/g, '');
    
    // Разбиваем на слагаемые
    const terms = expr.split(/([+-])/g).filter(term => term);
    if (terms.length > 1) {
        return {
            type: 'sum',
            terms: terms.reduce((acc, curr, i) => {
                if (curr === '+' || curr === '-') {
                    acc.operators.push(curr);
                } else {
                    acc.terms.push(parseSimpleTerm(curr));
                }
                return acc;
            }, { terms: [], operators: [] })
        };
    }
    
    if (expr.includes('*')) {
        const [left, right] = expr.split('*');
        return {
            type: 'product',
            left: parseSimpleTerm(left),
            right: parseSimpleTerm(right)
        };
    }
    
    if (expr.includes('/')) {
        const [num, den] = expr.split('/');
        return {
            type: 'quotient',
            numerator: parseSimpleTerm(num.replace(/[()]/g, '')),
            denominator: parseSimpleTerm(den.replace(/[()]/g, ''))
        };
    }
    
    return parseSimpleTerm(expr);
}

function parseSimpleTerm(term) {
    // Поддержка отрицательных чисел
    const isNegative = term.startsWith('-');
    if (isNegative) {
        term = term.substring(1);
    }
    
    const match = term.match(/^(\d*)(x|y)?(\^(\d+))?$/);
    if (!match) return null;
    
    const [_, coef, variable, __, power] = match;
    let coefficient = coef ? parseInt(coef) : 1;
    if (isNegative) coefficient = -coefficient;
    
    return {
        type: 'term',
        coefficient: coefficient,
        variable: variable || '',
        power: power ? parseInt(power) : (variable ? 1 : 0)
    };
}

function formatMathExpression(expr) {
    return expr
        .replace(/\*/g, '\\cdot ')
        .replace(/\^(\d+)/g, '^{$1}');
}

function formatDerivative(expr, derivative) {
    let formatted = expr;
    let formattedDerivative = derivative;

    // Базовое форматирование дроби в исходном выражении
    if (expr.includes('/')) {
        let [num, den] = expr.split('/');
        formatted = `\\frac{${num}}{${den}}`;
    }

    // Базовое форматирование дроби в производной
    if (derivative.includes('/')) {
        let parts = derivative.split('/');
        if (parts.length === 2) {
            formattedDerivative = `\\frac{${parts[0]}}{${parts[1]}}`;
        }
    }

    return `\\left(${formatted}\\right)' = ${formattedDerivative}`;
}

function addSolution(text) {
    const derivative = calculateDerivative(text);
    const formattedResult = formatDerivative(text, derivative);
    
    // Создаем простой текстовый вариант
    const plainText = `(${text})' = ${derivative}`;
    
    return {
        text: `<div class="math-container">\\[${formattedResult}\\]</div><div class="text-answer">Ответ: ${plainText}</div>`,
        solution: derivative
    };
}

function calculateDerivative(expression) {
    if (!expression) return '';
    
    expression = expression.replace(/\s+/g, '');

    // Проверка на дробь
    if (expression.includes('/')) {
        const [numerator, denominator] = expression.split('/');
        
        // Обработка числителя
        let numDeriv = '';
        if (numerator.includes('+')) {
            const [firstTerm, secondTerm] = numerator.split('+');
            if (firstTerm.includes('^')) {
                const [base, power] = firstTerm.split('^');
                const coef = parseInt(base) || 1;
                const n = parseInt(power);
                numDeriv = `${coef * n}x^{${n-1}}+1`;
            }
        } else {
            numDeriv = calculateDerivative(numerator);
        }
        
        // Обработка знаменателя
        let denDeriv = '';
        if (denominator.includes('^')) {
            const [base, power] = denominator.split('^');
            const coef = parseInt(base.replace('x', '')) || 1;
            const n = parseInt(power);
            denDeriv = `${coef * n}x^{${n-1}}`;
        } else {
            denDeriv = calculateDerivative(denominator);
        }
        
        return `(${numDeriv}\\cdot ${denominator}-${numerator}\\cdot ${denDeriv})/(${denominator})^2`;
    }

    // Проверка на произведение
    if (expression.includes('*')) {
        const [first, second] = expression.split('*');
        
        let firstDeriv = '';
        if (first.includes('^')) {
            const [base, power] = first.split('^');
            const coef = parseInt(base) || 1;
            const n = parseInt(power);
            firstDeriv = `${coef * n}x^{${n-1}}`;
        } else {
            firstDeriv = calculateDerivative(first);
        }
        
        let secondDeriv = '';
        if (second.includes('^')) {
            const [base, power] = second.split('^');
            const coef = parseInt(base.replace('y', '')) || 1;
            const n = parseInt(power);
            secondDeriv = `${coef * n}y^{${n-1}}`;
        } else {
            secondDeriv = calculateDerivative(second);
        }
        
        return `${firstDeriv}\\cdot ${second}+${first}\\cdot ${secondDeriv}`;
    }

    // Проверка на степенную функцию
    if (expression.includes('^')) {
        const [base, power] = expression.split('^');
        const n = parseInt(power);
        
        if (base.includes('x')) {
            const coef = parseInt(base.replace('x', '')) || 1;
            return `${coef * n}x^{${n-1}}`;
        }
        if (base.includes('y')) {
            const coef = parseInt(base.replace('y', '')) || 1;
            return `${coef * n}y^{${n-1}}`;
        }
    }

    // Проверка на сумму
    if (expression.includes('+')) {
        const terms = expression.split('+');
        return terms.map(term => calculateDerivative(term)).join('+');
    }

    // Базовые случаи
    if (expression === 'x') return '1';
    if (expression === 'y') return '1';
    if (/^\d+x$/.test(expression)) return expression.replace('x', '');
    if (!isNaN(expression)) return '0';
    
    return expression;
}

function explainDerivativeSolution(expression, derivative) {
    if (!expression || !derivative) {
        return '<div class="solution-explanation"><p>Не удалось сгенерировать объяснение. Проверьте правильность введенного выражения.</p></div>';
    }

    // Разбиваем выражение на составляющие
    const terms = expression.split(/([+\-])/g).filter(term => term.trim());
    
    let explanation = `
        <div class="solution-explanation">
            <h3>Пошаговое решение нахождения производной:</h3>
            
            <div class="initial-expression">
                <p><strong>Исходное выражение:</strong></p>
                <p class="math">${formatMathExpression(expression)}</p>
            </div>

            <div class="solution-steps">
                <p><strong>Разберём по шагам:</strong></p>
    `;

    // Анализируем каждый член выражения
    terms.forEach((term, index) => {
        if (term === '+' || term === '-') return;

        explanation += `<div class="step">
            <p><strong>Шаг ${Math.ceil((index + 1) / 2)}:</strong> Находим производную члена ${formatMathExpression(term)}</p>`;

        // Определяем тип члена и объясняем правило дифференцирования
        if (term.includes('^')) {
            const [base, power] = term.split('^');
            explanation += `
                <p>Применяем правило дифференцирования степенной функции:</p>
                <p>Если \\(f(x) = x^n\\), то \\(f'(x) = n \\cdot x^{n-1}\\)</p>
                <p>В нашем случае:</p>
                <ul>
                    <li>Степень (n) = ${power}</li>
                    <li>Множитель перед x: ${base.includes('*') ? base.split('*')[0] : '1'}</li>
                </ul>
            `;
        } else if (term.includes('x')) {
            explanation += `
                <p>Это линейный член. Производная x равна 1.</p>
                <p>Коэффициент перед x сохраняется.</p>
            `;
        } else {
            explanation += `
                <p>Это константа. Производная константы равна 0.</p>
            `;
        }

        explanation += `</div>`;
    });

    explanation += `
            </div>

            <div class="final-result">
                <p><strong>Итоговая производная:</strong></p>
                <p class="math">${formatMathExpression(derivative)}</p>
            </div>

            <div class="explanation-notes">
                <p><strong>Важные замечания:</strong></p>
                <ul>
                    <li>При дифференцировании степенной функции показатель степени становится множителем</li>
                    <li>Степень уменьшается на 1</li>
                    <li>Производная суммы равна сумме производных</li>
                </ul>
            </div>
        </div>
    `;

    return explanation;
}

function showExplanation() {
    try {
        const input = document.getElementById('expression').value;
        if (!input.trim()) {
            document.getElementById('explanation').innerHTML = 
                '<div class="solution-explanation"><p>Пожалуйста, введите математическое выражение.</p></div>';
            return;
        }

        const derivative = calculateDerivative(input);
        const explanation = explainDerivativeSolution(input, derivative);
        
        const explanationDiv = document.getElementById('explanation');
        explanationDiv.innerHTML = explanation;
        
        // Обновляем рендеринг MathJax
        MathJax.typesetPromise([explanationDiv]).catch(err => {
            console.error('Ошибка при рендеринге MathJax:', err);
        });
    } catch (error) {
        console.error('Ошибка при генерации объяснения:', error);
        document.getElementById('explanation').innerHTML = 
            '<div class="solution-explanation"><p>Произошла ошибка при генерации объяснения. Проверьте правильность введенного выражения.</p></div>';
    }
}

// Обработчик события для кнопки вычисления
function handleCalculate() {
    const input = document.getElementById('expression');
    if (!input) return;
    
    const text = input.value.trim();
    if (!text) return;
    
    const solution = addSolution(text);
    addMessage(text, true);
    addMessage(solution.text, false, true);
    input.value = '';
    
    // Перерендерим формулы
    if (window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise();
    }
}

// Обработчик события для клавиши Enter
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('expression');
    const calculateButton = document.getElementById('calculate');
    
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleCalculate();
                e.preventDefault();
            }
        });
    }
    
    if (calculateButton) {
        calculateButton.addEventListener('click', handleCalculate);
    }
});
