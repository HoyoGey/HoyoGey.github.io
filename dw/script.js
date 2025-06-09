// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add parallax effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Калькулятор скорости движения
function calculateSpeed() {
    const distance = parseFloat(document.getElementById('distance').value);
    const time = parseFloat(document.getElementById('time').value);
    
    if (distance && time && time > 0) {
        const speed = distance / time;
        document.getElementById('speedResult').textContent = 
            `Скорость: ${speed.toFixed(2)} м/с (${(speed * 3.6).toFixed(2)} км/ч)`;
    } else {
        document.getElementById('speedResult').textContent = 
            'Пожалуйста, введите корректные значения';
    }
}
