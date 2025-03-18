const mobileMenu = document.querySelector('.mobile_menu');
const mobileMenuOpenBtn = document.querySelector('.menu-button-open');
const mobileMenuCloseBtn = document.querySelector('.menu-button-close');
const headerInfoMessages = document.querySelectorAll('.header_info_message');
const desktopLinks = document.querySelector('.desktop_links');
const categoryButton = document.querySelector('.open_options');
const categoryOptions = document.getElementById('options');
const emailInput = document.getElementById('email');
const verifyEmailForm = document.getElementById('verify_email');

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
    console.log(windowWidth);

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
        alert('Email enviado com sucesso!');
    } else {
        alert('Email inválido!');
    }

    emailInput.value = '';
}

// Executa ao carregar e ao redimensionar
uploadElementClasses();
window.addEventListener('resize', uploadElementClasses);