
  const hamburger = document.querySelector('.burger');
  const navMenu = document.querySelector('.header-nav');
	const btnViewAll = document.querySelector('.btn-view-all');
	const btnClouseAll = document.querySelector('.btn-clouse-all');
	const menuListNone = document.querySelector('.menu-list-none');
	

  hamburger.addEventListener('click', () => {
		console.log('test');
		
		navMenu.classList.toggle('open')
  });

	btnViewAll.addEventListener('click', () => {
		menuListNone.classList.add('open-menu')
		btnViewAll.style.display = 'none';
		btnClouseAll.style.display = 'block';
  });

	btnClouseAll.addEventListener('click', () => {
		menuListNone.classList.remove('open-menu')
		btnViewAll.style.display = 'block';
		btnClouseAll.style.display = 'none';
  });
