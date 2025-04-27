// Открытие/закрытие меню
function menuActiv() {
	const menuOpen = document.querySelector('.header__catalog-btn')
	menuOpen.addEventListener('click', () => {
		const mainMenuEl = document.querySelector('.main-menu')
		mainMenuEl.classList.add('main-menu--active')
	})

	const menuClose = document.querySelector('.main-menu__close')
	menuClose.addEventListener('click', () => {
		const mainMenuEl = document.querySelector('.main-menu')
		mainMenuEl.classList.remove('main-menu--active')
	})
}

export {
	menuActiv
}