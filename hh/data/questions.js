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

export default questions;
