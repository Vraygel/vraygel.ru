// Получение списка товаров с сервера
async function getDataFromServer() {
	try {
		const response = await fetch(`./data/data.json`, {
			method: "GET",
		});
		if (!response.ok) {
			throw new Error(`Ошибка сервера: ${response.status}`)
		}
		const products = await response.json();
		return products
	} catch (error) {
		console.error('Ошибка при получении данных:', error)
	}
}

export {
	getDataFromServer
}