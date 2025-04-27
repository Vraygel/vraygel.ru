import * as productSort from './ProductSort.js'

function location() {
	const locationCityBtn = document.querySelector('.location__city')
	const locationSublink = document.querySelectorAll('.location__sublink')
	locationCityBtn.addEventListener('click', () => {
		locationCityBtn.classList.toggle('location__city--active')
	})
	for (const city of locationSublink) {
		city.addEventListener('click', (event) => {
			const cityName = event.target.textContent
			const locationCityName = document.querySelector('.location__city-name')
			locationCityName.textContent = cityName
			productSort.productSort()
			locationCityBtn.classList.remove('location__city--active')
		})
	}
}

export {
	location
}