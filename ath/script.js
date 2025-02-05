/**
 * @fileoverview Mathematical Integration Calculator
 * Provides functionality for calculating indefinite integrals with step-by-step solutions.
 * Uses math.js for parsing and MathJax for rendering.
 * 
 * @author Xrer
 * @version 1.3.0
 * @license MIT
 */

// Application Configuration
const CONFIG = Object.freeze({
    DECIMAL_PLACES: 2,
    DEFAULT_DISPLAY: 'none',
    ANIMATION_DURATION: 300,
    ERROR_MESSAGES: Object.freeze({
        PARSE_ERROR: 'Ошибка при разборе выражения',
        INTEGRATION_ERROR: 'Не удалось вычислить интеграл для данного выражения',
        POWER_FORMAT_ERROR: 'Неподдерживаемый формат степени',
        INVALID_INPUT: 'Пожалуйста, введите корректное математическое выражение',
        UNSUPPORTED_FUNCTION: 'Данная функция не поддерживается'
    })
});

// Service Layer - Handles core mathematical operations
class IntegrationService {
    /**
     * Integrates a mathematical expression
     * @param {string} expression - The expression to integrate
     * @returns {Object} Object containing result and steps
     * @throws {Error} If integration fails
     */
    static integrate(expression) {
        try {
            // Предварительная обработка выражения
            expression = expression.replace(/\s+/g, '');
            
            const node = math.parse(expression);
            const { result, steps } = this.#processNode(node);
            
            return {
                result: result,
                steps: [
                    `1. Анализ выражения: ${this.#formatExpression(expression)}`,
                    ...steps,
                    `Результат: \\[\\int ${this.#formatExpression(expression)} \\, dx = ${result} + C\\]`
                ]
            };
        } catch (error) {
            console.error('Integration error:', error);
            throw new IntegrationError(CONFIG.ERROR_MESSAGES.INTEGRATION_ERROR);
        }
    }

    /**
     * Process node and return result with steps
     * @private
     */
    static #processNode(node) {
        try {
            // Handle addition and subtraction
            if (node.type === 'OperatorNode' && (node.op === '+' || node.op === '-')) {
                const left = this.#processNode(node.args[0]);
                const right = this.#processNode(node.args[1]);
                return {
                    result: `${left.result} ${node.op} ${right.result}`,
                    steps: [
                        'Применяем правило: интеграл суммы равен сумме интегралов',
                        ...left.steps,
                        ...right.steps
                    ]
                };
            }

            // Handle multiplication with constant
            if (node.type === 'OperatorNode' && node.op === '*') {
                if (this.#isConstant(node.args[0])) {
                    const constant = this.#evaluateConstant(node.args[0]);
                    const { result, steps } = this.#processNode(node.args[1]);
                    return {
                        result: `${this.#formatNumber(constant)}${result}`,
                        steps: [
                            'Применяем правило: константу можно вынести за знак интеграла',
                            ...steps
                        ]
                    };
                }
            }

            // Handle power function
            if (node.type === 'OperatorNode' && node.op === '^') {
                if (node.args[0].type === 'SymbolNode' && node.args[0].name === 'x') {
                    let power;
                    try {
                        power = Number(math.evaluate(node.args[1].toString()));
                    } catch (error) {
                        power = this.#evaluateConstant(node.args[1]);
                    }
                    
                    // Handle special cases
                    if (power === -1) {
                        return {
                            result: '\\ln|x|',
                            steps: ['Применяем формулу: ∫(1/x)dx = ln|x|']
                        };
                    }
                    
                    const newPower = power + 1;
                    if (newPower === 0) {
                        return {
                            result: '\\ln|x|',
                            steps: [`Применяем формулу: ∫x^{${power}}dx = ln|x|, так как степень -1`]
                        };
                    }
                    
                    return {
                        result: `\\frac{x^{${this.#formatNumber(newPower)}}}{${this.#formatNumber(newPower)}}`,
                        steps: [`Применяем формулу: ∫x^n dx = x^(n+1)/(n+1), где n = ${this.#formatNumber(power)}`]
                    };
                }
            }

            // Handle basic functions
            if (node.type === 'FunctionNode') {
                const functionIntegrals = {
                    'sin': {
                        result: '-\\cos(x)',
                        step: 'Применяем формулу: ∫sin(x)dx = -cos(x)'
                    },
                    'cos': {
                        result: '\\sin(x)',
                        step: 'Применяем формулу: ∫cos(x)dx = sin(x)'
                    },
                    'tan': {
                        result: '-\\ln|\\cos(x)|',
                        step: 'Применяем формулу: ∫tan(x)dx = -ln|cos(x)|'
                    },
                    'sec': {
                        result: '\\ln|\\sec(x) + \\tan(x)|',
                        step: 'Применяем формулу: ∫sec(x)dx = ln|sec(x) + tan(x)|'
                    },
                    'csc': {
                        result: '\\ln|\\csc(x) - \\cot(x)|',
                        step: 'Применяем формулу: ∫csc(x)dx = ln|csc(x) - cot(x)|'
                    },
                    'sqrt': {
                        result: '\\frac{2}{3}x^{\\frac{3}{2}}',
                        step: 'Применяем формулу: ∫sqrt(x)dx = (2/3)x^(3/2)'
                    }
                };

                const integral = functionIntegrals[node.name];
                if (integral) {
                    return {
                        result: integral.result,
                        steps: [integral.step]
                    };
                }
            }

            // Handle constant
            if (node.type === 'ConstantNode') {
                const value = this.#formatNumber(node.value);
                return {
                    result: `${value}x`,
                    steps: [`Применяем формулу: ∫${value} dx = ${value}x`]
                };
            }

            // Handle variable
            if (node.type === 'SymbolNode' && node.name === 'x') {
                return {
                    result: '\\frac{x^2}{2}',
                    steps: ['Применяем формулу: ∫x dx = x²/2']
                };
            }

            // Handle reciprocal sqrt
            if (this.#isReciprocalSqrt(node)) {
                return {
                    result: '2\\sqrt{x}',
                    steps: ['Применяем формулу: ∫(1/√x)dx = 2√x']
                };
            }

            throw new Error(CONFIG.ERROR_MESSAGES.INTEGRATION_ERROR);
        } catch (error) {
            console.error('Process node error:', error);
            throw error;
        }
    }

    /**
     * Checks if a node represents a constant value
     * @private
     */
    static #isConstant(node) {
        return node.type === 'ConstantNode' ||
               (node.type === 'OperatorNode' && 
                node.args.every(arg => this.#isConstant(arg)));
    }

    /**
     * Evaluates constant expressions
     * @private
     */
    static #evaluateConstant(node) {
        try {
            if (node.type === 'ConstantNode') {
                return node.value;
            }
            if (node.type === 'OperatorNode') {
                const left = this.#evaluateConstant(node.args[0]);
                const right = this.#evaluateConstant(node.args[1]);
                
                switch (node.op) {
                    case '/': return left / right;
                    case '*': return left * right;
                    case '+': return left + right;
                    case '-': return left - right;
                    case '^': return Math.pow(left, right);
                    default: throw new Error(CONFIG.ERROR_MESSAGES.POWER_FORMAT_ERROR);
                }
            }
            if (node.type === 'FractionNode') {
                return this.#evaluateConstant(node.args[0]) / this.#evaluateConstant(node.args[1]);
            }
            return Number(math.evaluate(node.toString()));
        } catch (error) {
            console.error('Evaluate constant error:', error);
            throw error;
        }
    }

    /**
     * Formats a number for display
     * @private
     */
    static #formatNumber(num) {
        if (Number.isInteger(num)) return num.toString();
        if (Math.abs(num) < 1e-10) return '0';
        
        // Handle fractions
        const fractionMap = {
            0.5: '\\frac{1}{2}',
            1.5: '\\frac{3}{2}',
            2.5: '\\frac{5}{2}',
            0.25: '\\frac{1}{4}',
            0.75: '\\frac{3}{4}'
        };
        
        return fractionMap[num] || num.toFixed(CONFIG.DECIMAL_PLACES);
    }

    /**
     * Formats mathematical expression for display
     * @private
     */
    static #formatExpression(expr) {
        return expr
            .replace(/\*/g, '\\cdot ')
            .replace(/sqrt/g, '\\sqrt')
            .replace(/\^(\d+)/g, '^{$1}')
            .replace(/\^(-?\d+\/\d+)/g, '^{$1}');
    }

    /**
     * Checks if node represents 1/sqrt(x)
     * @private
     */
    static #isReciprocalSqrt(node) {
        return node.type === 'OperatorNode' && 
               node.op === '/' &&
               node.args[0].type === 'ConstantNode' && 
               node.args[0].value === 1 &&
               node.args[1].type === 'FunctionNode' && 
               node.args[1].name === 'sqrt' &&
               node.args[1].args[0].name === 'x';
    }
}

// UI Controller - Handles DOM interactions and UI updates
class UIController {
    static #elements = {
        functionInput: document.getElementById('function-input'),
        result: document.getElementById('result'),
        solutionSteps: document.getElementById('solution-steps')
    };

    /**
     * Initializes UI event listeners
     */
    static initialize() {
        this.#elements.functionInput.addEventListener('keypress', this.#handleKeyPress.bind(this));
        this.#setupExamples();
    }

    /**
     * Updates the UI with calculation results
     */
    static updateResults(result, steps) {
        this.#elements.result.innerHTML = steps[steps.length - 1];
        this.#elements.solutionSteps.innerHTML = steps.slice(0, -1).join('<br>');
        MathJax.typesetPromise().catch(this.#handleError);
    }

    /**
     * Handles calculation errors
     */
    static #handleError(error) {
        this.#elements.result.innerHTML = `
            <div class="error-message alert alert-danger">
                ${error.message}
            </div>
        `;
    }

    /**
     * Sets up example click handlers
     */
    static #setupExamples() {
        document.querySelectorAll('.example-button').forEach(example => {
            example.addEventListener('click', () => {
                const expression = example.dataset.expression;
                if (expression) {
                    this.#elements.functionInput.value = expression;
                    this.calculateIntegral();
                }
            });
        });
    }

    /**
     * Handles keypress events
     */
    static #handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.calculateIntegral();
        }
    }

    /**
     * Toggles solution steps visibility
     */
    static toggleSteps() {
        const stepsElement = this.#elements.solutionSteps;
        const isHidden = stepsElement.style.display === 'none' || !stepsElement.style.display;
        stepsElement.style.display = isHidden ? 'block' : 'none';
        
        if (isHidden) {
            MathJax.typesetPromise().catch(this.#handleError);
        }
    }

    /**
     * Main calculation method
     */
    static calculateIntegral() {
        const input = this.#elements.functionInput.value.trim();
        if (!input) {
            this.#handleError(new Error(CONFIG.ERROR_MESSAGES.INVALID_INPUT));
            return;
        }

        try {
            const { result, steps } = IntegrationService.integrate(input);
            this.updateResults(result, steps);
        } catch (error) {
            this.#handleError(error);
        }
    }
}

// Custom Error Types
class IntegrationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'IntegrationError';
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    UIController.initialize();
});
