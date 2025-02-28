const lessons = [
    {
        title: "Основы HTML",
        content: `
            <h2>Что такое HTML?</h2>
            <p>HTML (HyperText Markup Language) — это язык разметки, используемый для создания веб-страниц. Он является основой любой веб-страницы.</p>
            
            <h3>Базовая структура HTML документа</h3>
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Заголовок страницы&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Содержимое страницы&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        `
    },
    {
        title: "Текстовые элементы",
        content: `
            <h2>Заголовки</h2>
            <p>HTML предоставляет 6 уровней заголовков:</p>
            <pre><code>&lt;h1&gt;Самый главный заголовок&lt;/h1&gt;
&lt;h2&gt;Подзаголовок&lt;/h2&gt;
&lt;h3&gt;Подзаголовок третьего уровня&lt;/h3&gt;</code></pre>

            <h2>Форматирование текста</h2>
            <pre><code>&lt;p&gt;Обычный параграф текста&lt;/p&gt;
&lt;strong&gt;Важный текст&lt;/strong&gt;
&lt;br&gt; <!-- Перенос строки --></code></pre>
        `
    },
    {
        title: "Списки и ссылки",
        content: `
            <h2>Типы списков</h2>
            <pre><code>&lt;!-- Маркированный список --&gt;
&lt;ul&gt;
    &lt;li&gt;Элемент 1&lt;/li&gt;
    &lt;li&gt;Элемент 2&lt;/li&gt;
&lt;/ul&gt;

&lt;!-- Нумерованный список --&gt;
&lt;ol&gt;
    &lt;li&gt;Первый пункт&lt;/li&gt;
    &lt;li&gt;Второй пункт&lt;/li&gt;
&lt;/ol&gt;</code></pre>

            <h2>Создание ссылок</h2>
            <pre><code>&lt;!-- Обычная ссылка --&gt;
&lt;a href="https://example.com"&gt;Текст ссылки&lt;/a&gt;

&lt;!-- Ссылка в новой вкладке --&gt;
&lt;a href="https://example.com" target="_blank"&gt;Открыть в новой вкладке&lt;/a&gt;</code></pre>
        `
    },
    {
        title: "Изображения и медиа",
        content: `
            <h2>Работа с изображениями</h2>
            <pre><code>&lt;img src="путь/к/картинке.jpg" alt="Описание картинки"&gt;</code></pre>
            <p>Атрибут alt важен для доступности и SEO.</p>

            <h2>Видео и аудио</h2>
            <pre><code>&lt;video controls&gt;
    &lt;source src="video.mp4" type="video/mp4"&gt;
&lt;/video&gt;

&lt;audio controls&gt;
    &lt;source src="audio.mp3" type="audio/mpeg"&gt;
&lt;/audio&gt;</code></pre>
        `
    },
    {
        title: "Формы и элементы ввода",
        content: `
            <h2>Создание форм</h2>
            <pre><code>&lt;form action="/submit" method="POST"&gt;
    &lt;input type="text" placeholder="Введите имя"&gt;
    &lt;input type="email" required&gt;
    &lt;input type="checkbox"&gt;
    &lt;input type="radio" name="gender"&gt;
    &lt;button type="submit"&gt;Отправить&lt;/button&gt;
&lt;/form&gt;</code></pre>

            <h2>Атрибуты форм</h2>
            <ul>
                <li>required - обязательное поле</li>
                <li>placeholder - подсказка внутри поля</li>
                <li>action - адрес обработчика формы</li>
            </ul>
        `
    }
];

window.lessons = lessons;
