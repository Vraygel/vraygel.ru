import * as getDataFromServer from './GetDataFromServer.js'
import { ProductPage } from './ProductCard.js'

// работа слайдера
async function slider() {
	const products = await getDataFromServer.getDataFromServer()
	const dayProductsList = document.querySelector('.day-products__list')
	const newProducts = products.filter(product => product.goodsOfDay)

	for (const product of newProducts) {
		const li = document.createElement('li')
		li.classList.add('day-products__item', 'swiper-slide')
		const productCard = new ProductPage(product)
		li.appendChild(productCard)
		dayProductsList.appendChild(li)
	}
}

const swiper = new Swiper('.swiper', {
	direction: 'horizontal',
	navigation: {
		nextEl: '.day-products__navigation-btn--next',
		prevEl: '.day-products__navigation-btn--prev',
	},
	spaceBetween: 40,
	slidesPerView: 4,
})

export {
	slider
}
