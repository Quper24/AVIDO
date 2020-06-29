
// 1 день

{
	//модальное окно для подачи объявления

	const addAd = document.querySelector('.add__ad');
	const modalAdd = document.querySelector('.modal__add');

	addAd.addEventListener('click', () => {
		modalAdd.classList.remove('hide');
	});

	modalAdd.addEventListener('click', event => {
		if (event.target === modalAdd || event.target.classList.contains('modal__close')) {
			modalAdd.classList.add('hide');
		}
	});

}

{
	//модальное окно объявления
	const catalog = document.querySelector('.catalog');
	const modalItem = document.querySelector('.modal__item');
	catalog.addEventListener('click', event => {
		if (event.target.closest('.card')) {
			modalItem.classList.remove('hide');
		}
	});

	modalItem.addEventListener('click', event => {
		if (event.target === modalItem || event.target.classList.contains('modal__close')) {
			modalItem.classList.add('hide');
		}
	});

}

