// работа аккордеона
function accordion() {
	const accordionBtn = document.querySelectorAll('.accordion__btn')
	for (const btn of accordionBtn) {
		btn.addEventListener('click', () => {
			if (btn.classList.contains('accordion__btn--active')) {
				btn.classList.remove('accordion__btn--active')
			} else {
				for (const btn of accordionBtn) {
					btn.classList.remove('accordion__btn--active')
				}
				btn.classList.add('accordion__btn--active')
			}
		})
	}
}

export {
	accordion
}