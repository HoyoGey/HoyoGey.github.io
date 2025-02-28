const questions = [
    {
        question: "Что означает HTML?",
        options: [
            "HyperText Markup Language",
            "High-Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks Text Mode Language"
        ],
        correct: 0,
        hint: "Это язык разметки гипертекста",
        points: 5
    },
    {
        question: "Для чего используется тег DOCTYPE?",
        options: [
            "Для определения типа документа",
            "Для создания заголовка",
            "Для определения языка страницы",
            "Для подключения CSS"
        ],
        correct: 0,
        hint: "Этот тег сообщает браузеру версию HTML",
        points: 5
    },
    {
        question: "Какой тег используется для создания нумерованного списка?",
        options: [
            "<ul>",
            "<ol>",
            "<li>",
            "<list>"
        ],
        correct: 1,
        hint: "Ordered List = Упорядоченный список",
        points: 5
    },
    {
        question: "Что делает тег <meta charset='UTF-8'>?",
        options: [
            "Устанавливает кодировку символов",
            "Создает мета-описание страницы",
            "Определяет язык страницы",
            "Устанавливает заголовок страницы"
        ],
        correct: 0,
        hint: "Это влияет на отображение специальных символов",
        points: 5
    },
    {
        question: "Для чего используется тег <br>?",
        options: [
            "Для создания жирного текста",
            "Для переноса строки",
            "Для создания параграфа",
            "Для создания границы"
        ],
        correct: 1,
        hint: "Break = перенос",
        points: 5
    },
    {
        question: "Какой атрибут используется для указания альтернативного текста изображения?",
        options: [
            "title",
            "src",
            "alt",
            "desc"
        ],
        correct: 2,
        hint: "Alternative text = альтернативный текст",
        points: 5
    },
    {
        question: "Как сделать ссылку, открывающуюся в новой вкладке?",
        options: [
            "target='new'",
            "target='_blank'",
            "window='new'",
            "open='new'"
        ],
        correct: 1,
        hint: "blank = пустой, чистый",
        points: 5
    },
    {
        question: "Какой тег используется для создания таблицы в HTML?",
        options: [
            "<tab>",
            "<tbl>",
            "<table>",
            "<grid>"
        ],
        correct: 2,
        hint: "Самое очевидное название",
        points: 5
    },
    {
        question: "Что означает атрибут required в форме?",
        options: [
            "Поле можно пропустить",
            "Поле обязательно для заполнения",
            "Поле только для чтения",
            "Поле заблокировано"
        ],
        correct: 1,
        hint: "Required = обязательный",
        points: 5
    },
    {
        question: "Какой тег используется для семантического обозначения верхней части сайта?",
        options: [
            "<top>",
            "<head>",
            "<header>",
            "<heading>"
        ],
        correct: 2,
        hint: "Шапка сайта на английском",
        points: 5
    },
    {
        question: "Как правильно создать чекбокс?",
        options: [
            "<input checkbox>",
            "<checkbox>",
            "<input type='check'>",
            "<input type='checkbox'>"
        ],
        correct: 3,
        hint: "input с указанием типа",
        points: 5
    },
    {
        question: "Какой тег используется для определения навигации сайта?",
        options: [
            "<navigation>",
            "<navbar>",
            "<nav>",
            "<menu>"
        ],
        correct: 2,
        hint: "Сокращение от navigation",
        points: 5
    },
    {
        question: "Для чего используется атрибут placeholder?",
        options: [
            "Для установки значения по умолчанию",
            "Для подсказки внутри поля ввода",
            "Для валидации формы",
            "Для блокировки поля"
        ],
        correct: 1,
        hint: "Временный текст в поле",
        points: 5
    },
    {
        question: "Какой тег используется для добавления видео на страницу?",
        options: [
            "<media>",
            "<movie>",
            "<video>",
            "<play>"
        ],
        correct: 2,
        hint: "Самое очевидное название",
        points: 5
    },
    {
        question: "Как сделать текст жирным с помощью семантического тега?",
        options: [
            "<bold>",
            "<strong>",
            "<b>",
            "<fat>"
        ],
        correct: 1,
        hint: "Семантически важный текст",
        points: 5
    },
    {
        question: "Какой тег определяет подвал сайта?",
        options: [
            "<bottom>",
            "<footer>",
            "<end>",
            "<foot>"
        ],
        correct: 1,
        hint: "Нижняя часть страницы на английском",
        points: 5
    },
    {
        question: "Как правильно создать radio button?",
        options: [
            "<input type='radio'>",
            "<radio>",
            "<button type='radio'>",
            "<radiobutton>"
        ],
        correct: 0,
        hint: "input с указанием типа",
        points: 5
    },
    {
        question: "Какой атрибут формы указывает адрес обработчика?",
        options: [
            "href",
            "action",
            "src",
            "handler"
        ],
        correct: 1,
        hint: "Действие формы",
        points: 5
    }
];

class LearningManager {
    constructor() {
        this.currentLesson = 0;
        this.initElements();
        this.bindEvents();
        this.showLesson();
    }

    initElements() {
        this.learningContainer = document.getElementById('learning-container');
        this.testContainer = document.getElementById('test-container');
        this.lessonContent = document.getElementById('lesson-content');
        this.nextLessonBtn = document.getElementById('next-lesson-btn');
        this.startTestBtn = document.getElementById('start-test-btn');
        this.progressText = document.getElementById('progress-text');
    }

    bindEvents() {
        this.nextLessonBtn.addEventListener('click', () => this.nextLesson());
        this.startTestBtn.addEventListener('click', () => this.startTest());
    }

    showLesson() {
        const lesson = window.lessons[this.currentLesson];
        this.lessonContent.innerHTML = lesson.content;
        this.progressText.textContent = `Раздел ${this.currentLesson + 1} из ${window.lessons.length}`;
        
        // Show/hide appropriate buttons
        if (this.currentLesson === window.lessons.length - 1) {
            this.nextLessonBtn.classList.add('hidden');
            this.startTestBtn.classList.remove('hidden');
        }
    }

    nextLesson() {
        if (this.currentLesson < window.lessons.length - 1) {
            this.currentLesson++;
            this.showLesson();
        }
    }

    startTest() {
        this.learningContainer.classList.add('hidden');
        this.testContainer.classList.remove('hidden');
        new TestManager();
    }
}

class TestManager {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.maxScore = 100; // Changed to 100 for clearer percentage
        this.minScore = 49;  // Changed from 60 to 49
        this.usedHint = false;
        this.shuffledQuestions = this.shuffleQuestions();
        this.initElements();
        this.bindEvents();
        this.showQuestion();
        this.hasAnswered = false; // Add this line
        this.errorLog = []; // Add error logging array
    }

    shuffleQuestions() {
        // Create two arrays: theory and practical
        const theoryQuestions = [...questions];
        const practicalTest = {
            question: "Создайте простую веб-страницу по следующим требованиям:\n" +
                     "1. Заголовок 'Моя первая страница'\n" +
                     "2. Параграф с текстом\n" +
                     "3. Маркированный список с 3 элементами\n" +
                     "4. Ссылка на любой сайт\n" +
                     "5. Изображение (можно использовать placeholder)\n\n" +
                     "Напишите HTML код:",
            options: [],
            correct: null,
            hint: "Не забудьте основную структуру HTML документа с DOCTYPE",
            points: 15,
            isPractical: true
        };

        // Shuffle theory questions
        for (let i = theoryQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [theoryQuestions[i], theoryQuestions[j]] = [theoryQuestions[j], theoryQuestions[i]];
        }

        // Add practical test as last question
        return [...theoryQuestions, practicalTest];
    }

    initElements() {
        this.questionContainer = document.getElementById('question-container');
        this.optionsContainer = document.getElementById('options-container');
        this.hintContainer = document.getElementById('hint-container');
        this.hintBtn = document.getElementById('hint-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.resultsContainer = document.getElementById('results-container');
        this.mainTestContainer = document.getElementById('test-container');
        this.scoreDisplay = document.getElementById('score-display');
        this.restartBtn = document.getElementById('restart-btn');
        this.questionsRemaining = document.getElementById('questions-remaining');
        this.currentQuestionPoints = document.getElementById('current-question-points');
    }

    bindEvents() {
        this.hintBtn.addEventListener('click', () => this.showHint());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartTest());
    }

    updateProgress() {
        if (this.questionsRemaining && this.currentQuestionPoints) {
            const remaining = this.shuffledQuestions.length - this.currentQuestion - 1;
            this.questionsRemaining.textContent = remaining;
            
            const currentQuestion = this.shuffledQuestions[this.currentQuestion];
            this.currentQuestionPoints.textContent = currentQuestion.points || 0;
        }
    }

    showQuestion() {
        const question = this.shuffledQuestions[this.currentQuestion];
        this.questionContainer.textContent = question.question;
        this.optionsContainer.innerHTML = '';
        this.usedHint = false;
        this.hintContainer.classList.add('hidden');
        this.updateProgress();

        if (question.isPractical) {
            const textarea = document.createElement('textarea');
            textarea.className = 'w-full h-64 p-2 border rounded';
            textarea.placeholder = 'Введите ваш HTML код здесь...';
            this.optionsContainer.appendChild(textarea);

            const submitBtn = document.createElement('button');
            submitBtn.className = 'mt-4 bg-blue-500 text-white px-4 py-2 rounded';
            submitBtn.textContent = 'Проверить код';
            submitBtn.onclick = () => {
                this.checkPracticalTask(textarea.value);
                this.nextQuestion();
            };
            this.optionsContainer.appendChild(submitBtn);
        } else {
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'w-full text-left p-3 rounded border hover:bg-gray-100 mb-2';
                button.textContent = option;
                button.addEventListener('click', () => {
                    this.checkAnswer(index);
                    button.classList.add(index === question.correct ? 'option-correct' : 'option-incorrect');
                });
                this.optionsContainer.appendChild(button);
            });
        }
    }

    checkAnswer(selectedIndex) {
        if (this.hasAnswered) return; // Prevent multiple answers
        
        const question = this.shuffledQuestions[this.currentQuestion];
        const buttons = this.optionsContainer.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);

        this.hasAnswered = true;
        
        try {
            if (selectedIndex === question.correct) {
                let points = question.points;
                if (this.usedHint) {
                    points = Math.floor(points * 0.9);
                }
                this.score += points;
                
                // Log correct answer
                this.errorLog.push(`Вопрос ${this.currentQuestion + 1}: Правильно (+${points} баллов)`);
            } else {
                // Log incorrect answer
                this.errorLog.push(`Вопрос ${this.currentQuestion + 1}: Неправильно (0 баллов)`);
            }

            // Show correct answer
            buttons[question.correct].classList.add('option-correct');
            if (selectedIndex !== question.correct) {
                buttons[selectedIndex].classList.add('option-incorrect');
            }

            // Enable next button
            this.nextBtn.disabled = false;
        } catch (error) {
            console.error('Error in checkAnswer:', error);
            this.errorLog.push(`Ошибка при проверке ответа: ${error.message}`);
        }
    }

    checkPracticalTask(code) {
        if (this.hasAnswered) return;
        
        let points = 0;
        const results = [];
        
        try {
            const requirements = [
                { regex: /<!DOCTYPE\s+html>/i, points: 3, desc: "Корректный DOCTYPE" },
                { regex: /<title[^>]*>.*?<\/title>/i, points: 2, desc: "Тег title" },
                { regex: /<h1[^>]*>.*?<\/h1>/i, points: 2, desc: "Заголовок" },
                { regex: /<p[^>]*>.*?<\/p>/i, points: 2, desc: "Параграф" },
                { regex: /<ul[^>]*>[\s\S]*?<\/ul>/i, points: 2, desc: "Список" },
                { regex: /<a[^>]*href=["'][^"']*["'][^>]*>.*?<\/a>/i, points: 2, desc: "Ссылка" },
                { regex: /<img[^>]*src=["'][^"']*["'][^>]*>/i, points: 2, desc: "Изображение" }
            ];

            requirements.forEach(req => {
                const passed = req.regex.test(code);
                if (passed) {
                    points += req.points;
                    results.push(`${req.desc}: ✅ (+${req.points} баллов)`);
                } else {
                    results.push(`${req.desc}: ❌ (0 баллов)`);
                }
            });

            this.score += points;
            this.hasAnswered = true;

            // Log practical task results
            this.errorLog.push(`Практическое задание: набрано ${points} баллов`);
            this.errorLog.push(...results);

            // Show results before moving to final results
            alert('Результаты проверки:\n' + results.join('\n') + '\nПолучено баллов: ' + points);

            // Directly show final results after practical task
            setTimeout(() => {
                this.displayFinalResults();
            }, 500);

        } catch (error) {
            console.error('Error in practical task:', error);
            this.errorLog.push(`Ошибка в практическом задании: ${error.message}`);
            this.displayFinalResults();
        }
    }

    displayFinalResults() {
        // Hide test interface
        const testInterface = document.querySelector('#test-container > div');
        if (testInterface) {
            testInterface.classList.add('hidden');
        }

        // Show results container
        this.resultsContainer.classList.remove('hidden');
        
        // Calculate final score
        const totalPossiblePoints = this.shuffledQuestions.reduce((sum, q) => sum + (q.points || 0), 0);
        const scorePercentage = (this.score / totalPossiblePoints) * 100;
        const finalScore = Math.max(49, Math.min(100, scorePercentage));
        const grade = this.getGrade(finalScore);
        
        // Create results message
        const resultsMessage = `
            <div class="text-center p-6 bg-white rounded-lg shadow">
                <h2 class="text-2xl font-bold mb-4">Итоговые результаты</h2>
                <div class="text-lg mb-4">
                    Набрано баллов: ${this.score} из ${totalPossiblePoints}<br>
                    Процент выполнения: ${scorePercentage.toFixed(1)}%<br>
                    Итоговый результат: ${finalScore.toFixed(1)} баллов<br>
                    Оценка: ${grade}
                </div>
                <details class="text-left mt-4">
                    <summary class="cursor-pointer hover:text-blue-500">Показать детали прохождения теста</summary>
                    <pre class="text-sm mt-2 p-2 bg-gray-100 rounded whitespace-pre-wrap">${this.errorLog.join('\n')}</pre>
                </details>
                <button onclick="location.reload()" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Начать заново
                </button>
            </div>
        `;
        
        this.scoreDisplay.innerHTML = resultsMessage;
    }

    showHint() {
        const question = this.shuffledQuestions[this.currentQuestion];
        this.hintContainer.textContent = question.hint;
        this.hintContainer.classList.remove('hidden');
        this.usedHint = true;
    }

    getGrade(score) {
        if (score >= 90) return 'Отлично (5)';
        if (score >= 70) return 'Хорошо (4)';
        if (score >= 50) return 'Удовлетворительно (3)';
        return 'Неудовлетворительно (2)';
    }

    restartTest() {
        this.currentQuestion = 0;
        this.score = 0;
        this.testContainer.classList.remove('hidden');
        this.resultsContainer.classList.add('hidden');
        this.showQuestion();
    }

    showResults() {
        this.displayFinalResults();
    }

    nextQuestion() {
        if (!this.hasAnswered && this.currentQuestion < this.shuffledQuestions.length - 1) {
            if (!confirm('Вы не ответили на вопрос. Перейти к следующему?')) {
                return;
            }
        }

        this.currentQuestion++;
        this.hasAnswered = false;
        
        if (this.currentQuestion < this.shuffledQuestions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LearningManager();
});
