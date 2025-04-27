// Карточка товара на странице
export class ProductPage {
	constructor(value) {

		// Создание элемента списка для продукта
		this.catalogItem = document.createElement('li')
		this.catalogItem.classList.add('catalog__item')

		// Создание карточки продукта
		this.productCard = document.createElement('div')
		this.productCard.classList.add('product-card')

		// Визуальная часть карточки
		this.productCardVisual = document.createElement('div')
		this.productCardVisual.classList.add('product-card__visual')

		// Изображение товара
		this.productCardImg = document.createElement('img')
		this.productCardImg.classList.add('product-card__img')
		this.productCardImg.src = `${value.image}`
		this.productCardImg.height = '436'
		this.productCardImg.width = '290'
		this.productCardImg.alt = 'Изображение товара'
		this.src = `${value.image}`

		// Блок с кнопками
		this.productCardMore = document.createElement('div')
		this.productCardMore.classList.add('product-card__more')

		// Кнопка "В корзину"
		this.productCardLinc = document.createElement('a')
		this.productCardLinc.classList.add('product-card__link', 'btn', 'btn--icon')
		this.productCardLinc.href = '#'
		this.productCardLinc.innerHTML = `
			<span class="btn__text">В корзину</span>
			<svg width="24" height="24" aria-hidden="true">
				<use xlink:href="images/sprite.svg#icon-basket"></use>
			</svg>
		`
		this.productCardLinc.onclick = (e) => this.productAddCart(e)

		// Кнопка "Подробнее"
		this.productCardDetails = document.createElement('a')
		this.productCardDetails.classList.add('product-card__link', 'btn', 'btn--secondary')
		this.productCardDetails.href = '#'
		this.productCardDetails.innerHTML = `<span class="btn__text">Подробнее</span>`

		// Добавление кнопок в блок
		this.productCardMore.appendChild(this.productCardLinc)
		this.productCardMore.appendChild(this.productCardDetails)

		// Добавление элементов в визуальную часть карточки
		this.productCardVisual.appendChild(this.productCardImg)
		this.productCardVisual.appendChild(this.productCardMore)

		// Информационная часть карточки
		this.productCardInfo = document.createElement('div')
		this.productCardInfo.classList.add('product-card__info')

		// Заголовок названия продукта
		this.productCardTitle = document.createElement('h2')
		this.productCardTitle.classList.add('product-card__title')
		this.productCardTitle.textContent = value.name
		this.name = value.name

		// Старая цена
		this.productCardOldPrice = document.createElement('span')
		this.productCardOldPrice.classList.add('product-card__old')
		this.productCardOldPrice.innerHTML = `
			<span class="product-card__old-number">${value.price.old}</span>
			<span class="product-card__old-add">₽</span>
		`
		this.price = value.price.new

		// Текущая цена
		this.productCardPrice = document.createElement('span')
		this.productCardPrice.classList.add('product-card__price')
		this.productCardPrice.innerHTML = `
			<span class="product-card__price-number">${value.price.new}</span>
			<span class="product-card__price-add">₽</span>
		`

		// Подсказка о наличии товара
		this.productCardTooltip = this.createTooltip(value.availability)

		// Сборка всей карточки продукта
		this.productCardInfo.appendChild(this.productCardTitle)
		this.productCardInfo.appendChild(this.productCardOldPrice)
		this.productCardInfo.appendChild(this.productCardPrice)
		this.productCardInfo.appendChild(this.productCardTooltip)
		this.productCard.appendChild(this.productCardVisual)
		this.productCard.appendChild(this.productCardInfo)
		this.catalogItem.appendChild(this.productCard)

		return this.catalogItem
	}

	// добавление товара в корзину
	productAddCart(e) {
		e.preventDefault()
		const basket = document.querySelector('.basket')
		const headerUserCount = document.querySelector('.header__user-count')
		const basketLink = document.querySelector('.basket__link')

		let currentCount = Number(headerUserCount.textContent)
		const catalogItem = new ProductCart(this)

		basket.prepend(catalogItem)

		if (!basketLink) {
			const aCart = document.createElement('a')
			aCart.classList.add('basket__link', 'btn')
			aCart.href = '#'
			aCart.textContent = 'Перейти к оформлению'
			basket.appendChild(aCart)
		}

		const basketEmptyBlock = document.querySelector('.basket__empty-block')
		basketEmptyBlock.style.display = 'none'

		currentCount += 1
		headerUserCount.textContent = currentCount
	}

	// Cоздание подсказки
	createTooltip(availability) {
		const tooltip = document.createElement('div')
		tooltip.classList.add('product-card__tooltip', 'tooltip')

		const tooltipBtn = document.createElement('button')
		tooltipBtn.classList.add('tooltip__btn')
		tooltipBtn.setAttribute('aria-label', 'Показать подсказку')
		tooltipBtn.innerHTML = `
		<svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
		<use xlink:href="images/sprite.svg#icon-i"></use>
		</svg>
		`

		tooltip.appendChild(tooltipBtn)

		const tooltipContent = document.createElement('div')
		tooltipContent.classList.add('tooltip__content')

		const tooltipText = document.createElement('span')
		tooltipText.classList.add('tooltip__text')
		tooltipText.textContent = 'Наличие товара по городам:'

		const tooltipList = document.createElement('ul')
		tooltipList.classList.add('tooltip__list')
		
		for (const city in availability) {
			const listItem = document.createElement('li')

			listItem.classList.add('tooltip__item')
			let cityName = ''
			switch (city) {
				case 'moscow':
					cityName = 'Москва'
					break
				case 'orenburg':
					cityName = 'Оренбург'
					break
				default:
					cityName = 'Санк-Петербург'
					break
			}
			listItem.innerHTML = `
				<span class="tooltip__text">${cityName}: <span class="tooltip__count">${availability[city]}</span></span>
			`
			tooltipList.appendChild(listItem)
		}

		tooltipContent.appendChild(tooltipText)
		tooltipContent.appendChild(tooltipList)
		tooltip.appendChild(tooltipContent)

		tippy(tooltipBtn, {
			content: tooltipContent.innerHTML,
			allowHTML: true,
		})
		return tooltip
	}
}

// Карточка товара в корзине
export class ProductCart {
	constructor(value) {

		// Создание элемента списка для товара в корзине
		this.ProductCart = document.createElement('li')
		this.ProductCart.classList.add('basket__item')

		// Создание блока с изображением товара
		this.basketImg = document.createElement('div')
		this.basketImg.classList.add('basket__img')

		// Изображение товара
		this.productImg = document.createElement('img')
		this.productImg.src = value.src
		this.productImg.alt = 'Фотография товара'
		this.productImg.height = '60'
		this.productImg.width = '60'

		// Добавление изображения в блок
		this.basketImg.appendChild(this.productImg)

		// Название товара
		this.basketName = document.createElement('span')
		this.basketName.classList.add('basket__name')
		this.basketName.textContent = value.name

		// Цена товара
		this.basketPrice = document.createElement('span')
		this.basketPrice.classList.add('basket__price')
		this.basketPrice.textContent = value.price

		// Кнопка закрытия товара из корзины
		this.closeButton = document.createElement('button')
		this.closeButton.classList.add('basket__close')
		this.closeButton.onclick = () => this.deleteProductCart(this)
		this.closeButton.type = 'button'

		// Иконка кнопки закрытия
		this.closeButton.innerHTML = `
					<svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
							<use xlink:href="images/sprite.svg#icon-close"></use>
					</svg>
			`

		// Сборка всей разметки товара в корзине
		this.ProductCart.appendChild(this.basketImg)
		this.ProductCart.appendChild(this.basketName)
		this.ProductCart.appendChild(this.basketPrice)
		this.ProductCart.appendChild(this.closeButton)

		return this.ProductCart
	}

	// удаление товара из корзины
	deleteProductCart() {
		this.ProductCart.remove()

		const headerUserCount = document.querySelector('.header__user-count')
		let currentCount = Number(headerUserCount.textContent)

		currentCount -= 1
		headerUserCount.textContent = currentCount

		const ProductCartIsNull = document.querySelector('.basket__item')

		if (!ProductCartIsNull) {
			const basketEmptyBlock = document.querySelector('.basket__empty-block')
			const basketLink = document.querySelector('.basket__link')
			basketLink.remove()
			basketEmptyBlock.style.display = 'block'
		}
	}
}