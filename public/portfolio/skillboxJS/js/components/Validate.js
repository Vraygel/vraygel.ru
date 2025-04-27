// Валидация формы отправки заявки
function validate() {
	const validator = new JustValidate('.questions__form')

	validator
		.addField('#name', [
			{
				rule: 'required',
				errorMessage: 'Пожалуйста, введите ваше имя',
			},
			{
				rule: 'minLength',
				value: 3,
				errorMessage: 'Имя должно содержать минимум 3 символа',
			},
			{
				rule: 'maxLength',
				value: 20,
				errorMessage: 'Имя не должно превышать 20 символов',
			}
		])
		.addField('#email', [
			{
				rule: 'required',
				errorMessage: 'Пожалуйста, введите ваш email',
			},
			{
				rule: 'email',
				errorMessage: 'Email введён некорректно',
			}
		])
		.addField('#agree', [
			{
				rule: 'required',
				errorMessage: 'Необходимо согласие на обработку данных'
			}
		])

	validator.onSuccess(async function (e) {
		e.preventDefault()

		const form = document.querySelector('.questions__form')
		const formData = new FormData(form)
		const name = formData.get('name')
		const email = formData.get('email')
		const user = {
			name: name,
			email: email,
		}

		await sendMessage(user)
		e.target.reset()
	})

	async function sendMessage(user) {
		try {
			const response = await fetch('https://httpbin.org/post', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			})

			if (!response.ok) {
				throw new Error('Ошибка отправки заявки')
			}

			const data = await response.json()
			showModal('success', 'Ваша заявка успешно отправлена!')

			return data
		} catch (error) {
			console.error('Ошибка при отправке данных:', error)
			showModal('error', 'Ошибка отправки заявки. Попробуйте позже.');
		}
	}
}

// Показ модального окна
function showModal(type, message) {
	const modal = document.createElement('div')

	modal.className = 'modal'
	modal.innerHTML = `
			<div class="modal-content ${type}">
					<span class="close">&times;</span>
					<p>${message}</p>
			</div>
	`
	document.body.appendChild(modal)
	
	const closeBtn = modal.querySelector('.close')
	closeBtn.addEventListener('click', function () {
		modal.remove();
	})

	setTimeout(() => {
		if (modal.parentNode) {
			modal.parentNode.removeChild(modal)
		}
	}, 3000)
}

export {
	validate
}