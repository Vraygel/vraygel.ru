// отображение корзины
function cartActiv() {
	const cartBtn = document.querySelector('.header__user-text')
	const basket = document.querySelector('.basket')
	
	cartBtn.addEventListener('click', () => {
		basket.classList.toggle('basket--active')
	})
}

export {
	cartActiv
}