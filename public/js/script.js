import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import axios from "axios";
import JustValidate from "just-validate";

const body = document.body;
const burgerMenu = document.querySelector(".burger-menu");
const socialMenu = document.querySelector(".header__menu-social");

burgerMenu.addEventListener("click", () => {
  if (socialMenu.classList.contains("header__menu-social-show")) {
    burgerMenu.classList.remove("active");
    socialMenu.classList.remove("header__menu-social-show");
    socialMenu.style.display = "none";
  } else {
    burgerMenu.classList.add("active");
    socialMenu.classList.add("header__menu-social-show");
    socialMenu.style.display = "flex";
    body.classList.add("overflow-hidden");
  }
});

const swiper = new Swiper(".mySwiper", {
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
  },
});

const form = document.getElementById("contactForm");
const modalError = document.getElementById("modalError");
const modalSuccess = document.getElementById("modalSuccess");
const modalBtns = document.querySelectorAll("[data-close]");
const nameInput = document.getElementById("userNameInput");
const emailInput = document.getElementById("userEmailInput");
const messageInput = document.getElementById("userMessageInput");

function openModal(modal) {
  modal.classList.add("open");
  body.classList.add("overflow-hidden");
  if (modal === modalSuccess) {
    form.reset();
  }
}

function closeModal(modal) {
  modal.classList.remove("open");
  body.classList.remove("overflow-hidden");
  if (modal === modalSuccess) {
    form.reset();
  }
}

modalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    closeModal(modal);
  });
});

const validation = new JustValidate("#contactForm");

validation
  .addField("#userNameInput", [
    {
      rule: "required",
      errorMessage: "Введите ваше имя",
    },
    {
      rule: "minLength",
      value: 3,
      errorMessage: "Имя должно содержать не менее 3 символов",
    },
    {
      rule: "maxLength",
      value: 30,
      errorMessage: "Имя должно содержать не более 30 символов",
    },
  ])
  .addField("#userEmailInput", [
    {
      rule: "required",
      errorMessage: "Введите ваш email",
    },
    {
      rule: "email",
      errorMessage: "Некорректный email",
    },
  ])
  .addField("#userMessageInput", [
    {
      rule: "required",
      errorMessage: "Введите ваше сообщение",
    },
    {
      rule: "minLength",
      value: 10,
      errorMessage: "Сообщение должно содержать не менее 10 символов",
    },
  ])
  .onSuccess(async (event) => {
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    };

    try {
      const response = await axios.post('/api/send-message', formData);
      openModal(modalSuccess);
    } catch (error) {
      console.error("Ошибка отправки на сервер:", error);
      openModal(modalError);
    }
  })
  .onFail((fields) => {
    openModal(modalError);
  });
