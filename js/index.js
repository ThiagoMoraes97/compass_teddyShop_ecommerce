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


// Abrir menu mobile
mobileMenuOpenBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
});

// Fechar menu mobile
mobileMenuCloseBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});

categoryButton.addEventListener('click', () => {
    categoryOptions.classList.toggle('open');
    console.log('clicou');
});


verifyEmailForm.onsubmit = verifyEmail;

// Função para atualizar classes com base no tamanho da tela
function uploadElementClasses() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 768) {
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
        verifyEmailForm.classList.remove("invalid");
        alert('Email enviado com sucesso!'); 
    } else {
        verifyEmailForm.classList.add("invalid"); 
    }

    emailInput.value = '';
}

function generateSliderDots() {

    const windowWidth = window.innerWidth;
    let numberOfSliderDots;

    if (windowWidth <= 768) {
        numberOfSliderDots = (sliderCards.length);
    } else {
        numberOfSliderDots = (sliderCards.length) - 2;
    }
 
    let index;

    for (let i = 0; i < numberOfSliderDots; i++) {
        index = i;
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.classList.add(`index-${index}`);
        if (i === 0) {
            dot.classList.add('active');
        }
        sliderDots.appendChild(dot);
    }
}

function generateFeedbackSliderDots() {
    const windowWidth = window.innerWidth;
    let numberOfSliderDots;

    if (windowWidth <= 768) {
        numberOfSliderDots = (sliderCards.length);
    } else {
        numberOfSliderDots = (sliderCards.length) - 2;
    }
    
    let index;

    for (let i = 0; i < numberOfSliderDots; i++) {
        index = i;
        const dot = document.createElement('span');
        dot.classList.add('feedback_dot');
        dot.classList.add(`feedback-index-${index}`);
        if (i === 0) {
            dot.classList.add('active');
        }
        feedbackSliderDots.appendChild(dot);
    }
}

let currentIndex = 0;
let currentIndexFeedback = 0;

function moveSliderCards(index) {
    
    if (currentIndex === index) {
        return;
    }

    const windowWidth = window.innerWidth;
    let cardWidth;

    if (windowWidth <= 768) {
        cardWidth = sliderCards[0].offsetWidth + 65;
    } else {
        cardWidth = sliderCards[0].offsetWidth + 48; 
    }

    
    if (currentIndex < index) {
        slider.scrollLeft += cardWidth * (index - currentIndex); 
    } else {
        slider.scrollLeft -= cardWidth * (currentIndex - index); 
    }
   
    currentIndex = index;
}

function updateCurrentDot(index) {
    let currentDot = document.querySelector('.dot.active');

    if (currentDot) {
        currentDot.classList.remove('active');
    }

    let newCurrentDot = document.querySelector(`.index-${index}`);

    if (!newCurrentDot) {
        return
    }

    newCurrentDot.classList.add('active');
}

function moveFeedbackSliderCards(index) {
    if (currentIndexFeedback === index) return;

    const windowWidth = window.innerWidth;
    let cardWidth;

    if (windowWidth <= 768) {
        cardWidth = sliderCards[0].offsetWidth + 70;
    } else {
        cardWidth = sliderCards[0].offsetWidth + 48; 
    }

    if (currentIndexFeedback < index) {
        feedbackSlider.scrollLeft += cardWidth * (index - currentIndexFeedback); 
    } else {
        feedbackSlider.scrollLeft -= cardWidth * (currentIndexFeedback - index); 
    }
   
    currentIndexFeedback = index;
}

function updateCurrentFeedbackDot(index) {
    let currentDot = document.querySelector('.feedback_dot.active');

    if (currentDot) {
        currentDot.classList.remove('active');
    }

    let newCurrentDot = document.querySelector(`.feedback-index-${index}`);

    if (!newCurrentDot) {
        return
    }

    newCurrentDot.classList.add('active');
}

generateSliderDots();
generateFeedbackSliderDots();

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('dot')) {
        console.log(event.target);
        event.stopPropagation();
        const index = parseInt(event.target.classList[1].split('-')[1]);
        moveSliderCards(index);
        updateCurrentDot(index);
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('feedback_dot')) {
        console.log(event.target);
        event.stopPropagation();
        const index = parseInt(event.target.classList[1].split('-')[2]);
        moveFeedbackSliderCards(index);
        updateCurrentFeedbackDot(index);
    }
});



uploadElementClasses();
window.addEventListener('resize', uploadElementClasses);