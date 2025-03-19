// Seleção de elementos
const mobileMenu = document.querySelector('.mobile_menu');
const mobileMenuOpenBtn = document.querySelector('.menu-button-open');
const mobileMenuCloseBtn = document.querySelector('.menu-button-close');
const headerInfoMessages = document.querySelectorAll('.header_info_message');
const desktopLinks = document.querySelector('.desktop_links');
const categoryButton = document.querySelector('.open_options');
const categoryOptions = document.getElementById('options');
const emailInput = document.getElementById('email');
const verifyEmailForm = document.getElementById('verify_email');
const slider = document.querySelector('.services-cards-wrapper');
const sliderCards = document.querySelectorAll('.services-card');
const sliderDots = document.querySelector('.slide_dots');
const feedbackSlider = document.querySelector('.feedback-cards-wrapper');
const feedbackCards = document.querySelectorAll('.feedback-card');
const feedbackSliderDots = document.querySelector('.feedback_slide_dots');

// Estados globais
let currentIndex = 0;
let currentIndexFeedback = 0;

// Event listeners
mobileMenuOpenBtn.addEventListener('click', () => mobileMenu.classList.add('open'));

mobileMenuCloseBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));

categoryButton.addEventListener('click', () => {
    categoryOptions.classList.toggle('open');
    console.log('clicou');
});

verifyEmailForm.onsubmit = verifyEmail;

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('dot')) {
        const index = parseInt(event.target.classList[1].split('-')[1]);
        moveSliderCards(index);
        updateCurrentDot(index);
    }

    if (event.target.classList.contains('feedback_dot')) {
        const index = parseInt(event.target.classList[1].split('-')[2]);
        moveFeedbackSliderCards(index);
        updateCurrentFeedbackDot(index);
    }
});

window.addEventListener('resize', uploadElementClasses);

// Funções
function uploadElementClasses() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 800) {
        desktopLinks.classList.add('desktop_only');
        headerInfoMessages.forEach((msg) => msg.classList.add('desktop_only'));
        mobileMenu.classList.remove('mobile_only');
        mobileMenuOpenBtn.classList.remove('mobile_only');
    } else {
        desktopLinks.classList.remove('desktop_only');
        headerInfoMessages.forEach((msg) => msg.classList.remove('desktop_only'));
        mobileMenu.classList.add('mobile_only');
        mobileMenuOpenBtn.classList.add('mobile_only');
    }
}

function verifyEmail(event) {
    event.preventDefault();
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        verifyEmailForm.classList.remove('invalid');
        alert('Email enviado com sucesso!');
    } else {
        verifyEmailForm.classList.add('invalid');
    }

    emailInput.value = '';
}

function generateSliderDots() {
    const windowWidth = window.innerWidth;
    const numberOfSliderDots = windowWidth <= 768 ? sliderCards.length : sliderCards.length - 2;

    for (let i = 0; i < numberOfSliderDots; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot', `index-${i}`);
        if (i === 0) dot.classList.add('active');
        sliderDots.appendChild(dot);
    }
}

function generateFeedbackSliderDots() {
    const windowWidth = window.innerWidth;
    const numberOfSliderDots = windowWidth <= 768 ? sliderCards.length : sliderCards.length - 2;

    for (let i = 0; i < numberOfSliderDots; i++) {
        const dot = document.createElement('span');
        dot.classList.add('feedback_dot', `feedback-index-${i}`);
        if (i === 0) dot.classList.add('active');
        feedbackSliderDots.appendChild(dot);
    }
}

function moveSliderCards(index) {
    if (currentIndex === index) return;

    const cardWidth = window.innerWidth <= 768 ? sliderCards[0].offsetWidth + 65 : sliderCards[0].offsetWidth + 48;

    slider.scrollLeft += cardWidth * (index - currentIndex);
    currentIndex = index;
}

function updateCurrentDot(index) {
    const currentDot = document.querySelector('.dot.active');
    if (currentDot) currentDot.classList.remove('active');

    const newCurrentDot = document.querySelector(`.index-${index}`);
    if (newCurrentDot) newCurrentDot.classList.add('active');
}

function moveFeedbackSliderCards(index) {
    if (currentIndex === index) {
        return;
    }

    const cardWidth = feedbackCards[0].offsetWidth + 48; 
    
    if (currentIndex < index) {
        feedbackSlider.scrollLeft += cardWidth * (index - currentIndex); 
    } else {
        feedbackSlider.scrollLeft -= cardWidth * (currentIndex - index); 
    }

    currentIndex = index;
}


function updateCurrentFeedbackDot(index) {
    const currentDot = document.querySelector('.feedback_dot.active');
    if (currentDot) currentDot.classList.remove('active');

    const newCurrentDot = document.querySelector(`.feedback-index-${index}`);
    if (newCurrentDot) newCurrentDot.classList.add('active');
}

// Inicialização
generateSliderDots();
generateFeedbackSliderDots();
uploadElementClasses();