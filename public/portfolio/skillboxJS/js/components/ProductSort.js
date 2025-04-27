
import * as pagination from './Pagination.js'
import * as productFilter from './ProductFilter.js'

// сортировка товаров по событию change
async function productSortChange() {
	const catalogSortSelect = getSelectSort()

	catalogSortSelect.addEventListener('change', async (event) => {
		productSort()
	})
}

// сортировка товаров
async function productSort() {
	const selectedValue = getSelectSort().value
	const newProductFromStatus = await productFilter.productFilterStatus()
	const newProductFromType = await productFilter.productFilterType(newProductFromStatus)

	switch (selectedValue) {
		case 'price-min':
			const sortedByMinPrice = newProductFromType.sort((a, b) => a.price.new - b.price.new)
			pagination.pagination(sortedByMinPrice)
			return sortedByMinPrice
			break
		case 'price-max':
			const sortedByMaxPrice = newProductFromType.sort((a, b) => b.price.new - a.price.new)
			pagination.pagination(sortedByMaxPrice)
			return sortedByMaxPrice
			break
		case 'rating-max':
			const sortedByRating = newProductFromType.sort((a, b) => b.rating - a.rating)
			pagination.pagination(sortedByRating)
			return sortedByRating
			break
	}
}

// получение select сортировки
function getSelectSort() {
	const catalogSortSelect = document.querySelector('.catalog__sort-select')
	return catalogSortSelect
}

export {
	productSort,
	productSortChange
}