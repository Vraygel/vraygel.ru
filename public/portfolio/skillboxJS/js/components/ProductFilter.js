import * as getDataFromServer from './GetDataFromServer.js'
import * as productSort from './ProductSort.js'

// Подсчёт товаров
async function countingProduct(product) {
	let productTemp

	if (product) {
		productTemp = product
	} else {
		productTemp = await getDataFromServer.getDataFromServer()
	}
	const checkboxes = getCheckboxType()

	for (const checkboxItem of checkboxes) {
		let count = productTemp.reduce(function (accumulator, product) {
			if (product.type.includes(checkboxItem.value)) {
				return accumulator + 1
			}
			return accumulator
		}, 0)

		let filterCheckboxValue = checkboxItem.nextElementSibling.lastElementChild
		filterCheckboxValue.textContent = count
	}
}

// сброс фильтров
function filterReset() {
	const catalogFormReset = document.querySelector('.catalog-form__reset')
	catalogFormReset.addEventListener('click', () => {
		countingProduct()
		productSort.productSort()
		window.scrollTo({ top: 357, behavior: "smooth" })
	})
}

// фильтрация товаров по типу по событию checked
function productFilterTypeCheked() {
	const checkboxes = getCheckboxType()

	checkboxes.forEach(checkbox => {
		checkbox.addEventListener('change', async () => {
			productSort.productSort()
			window.scrollTo({ top: 357, behavior: "smooth" })
		})
	});
}

// фильтрация товаров по типу
async function productFilterType(product) {
	let productTemp
	if (product) {
		productTemp = product
	} else {
		productTemp = await getDataFromServer.getDataFromServer()
	}

	const checkboxes = getCheckboxType()
	const isChecked = Array.from(checkboxes).filter(checkbox => checkbox.checked)

	if (isChecked.length > 0) {
		const checkedType = isChecked.map(checkbox => checkbox.value)
		const newProducts = productTemp.filter(product =>
			product.type.some(type => checkedType.includes(type))
		)
		return newProducts
	} else {
		const newProducts = productTemp
		return newProducts
	}
}

// фильтрация товаров по наличию по событию checked
function productFilterStatusCheked() {
	const radios = getCheckboxStatus()

	for (const radio of radios) {
		radio.addEventListener('change', async () => {
			productSort.productSort()
			window.scrollTo({ top: 357, behavior: "smooth" })
		})
	}
}

// фильтрация товаров по наличию
async function productFilterStatus(product) {
	const radios = getCheckboxStatus()
	let productTemp

	if (product) {
		productTemp = product
	} else {
		productTemp = await getDataFromServer.getDataFromServer()
	}

	for (const radio of radios) {
		if (radio.id === 'instock' && radio.checked === true) {
			const city = getCity()
			const newProducts = productTemp.filter(product => product.availability[city] > 0)

			countingProduct(newProducts)
			return newProducts
		} else if (radio.id == 'all-item' && radio.checked == true) {
			countingProduct()
			return productTemp
		}
	}
}

// получение чекбосов фильтра по типу
function getCheckboxType() {
	const checkboxType = document.getElementsByName('type')
	return checkboxType
}

// получение радиокнопок фильтра по статусу
function getCheckboxStatus() {
	const radioStatus = document.getElementsByName('status')
	return radioStatus
}

// получение города
function getCity() {
	const locationCityName = document.querySelector('.location__city-name').textContent
	let city = ''

	switch (locationCityName) {
		case 'Москва':
			city = 'moscow'
			break
		case 'Санкт-Петербург':
			city = 'saintPetersburg'
			break
		default:
			city = 'orenburg'
			break
	}
	return city
}

export {
	countingProduct,
	productFilterTypeCheked,
	productFilterType,
	productFilterStatusCheked,
	productFilterStatus,
	filterReset
}