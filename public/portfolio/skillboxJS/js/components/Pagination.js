import * as productsRender from './ProductsRender.js'

// Пагинация страниц
function pagination(products) {
	let startIndex = 1

	paginationSelection(products, startIndex)
	paginationRender(products, startIndex)
}

function paginationSelection(products, startIndex) {
	const maxIndex = 6
	const start = (startIndex - 1) * maxIndex;
	const end = start + maxIndex
	const newProducts = products.slice(start, end)

	productsRender.productsRender(newProducts)
}

function paginationRender(products, startIndex) {
	const productLenght = products.length
	const productLenghtMultiple = Math.ceil(productLenght / 6)
	const catalogPagination = document.querySelector('.catalog__pagination')

	catalogPagination.textContent = ''
	for (let i = 1; i <= productLenghtMultiple; i++) {
		const li = document.createElement('li')
		li.classList.add('catalog__pagination-item')

		const button = document.createElement('button')
		button.classList.add('catalog__pagination-link')
		button.textContent = i

		button.addEventListener('click', (e) => {
			e.preventDefault()
			window.scrollTo({ top: 357, behavior: "smooth" })
			startIndex = i
			paginationSelection(products, startIndex)
		})

		li.append(button)
		catalogPagination.append(li)
	}
}

export {
	pagination
}