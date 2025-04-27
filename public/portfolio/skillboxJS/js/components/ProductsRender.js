import { ProductPage } from './ProductCard.js'

// Рендер товаров
function productsRender(products) {
	const catalogList = document.querySelector('.catalog__list')
	catalogList.innerHTML = ''

	for (const product of products) {
		const catalogItem = new ProductPage(product)
		catalogList.appendChild(catalogItem)
	}
}

export {
	productsRender,
}