'use strict';
const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const catalog = document.querySelector('.catalog');
const modalItem = document.querySelector('.modal__item');
const addAd = document.querySelector('.add__ad');
const modalAdd = document.querySelector('.modal__add');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalBtnWarning = document.querySelector('.modal__btn-warning');
const modalSubmit = document.querySelector('.modal__submit');
const elements = [...modalSubmit.elements]
	.filter(elem => elem.tagName === 'INPUT' ||
		elem.tagName === 'SELECT' ||
		elem.tagName === 'TEXTAREA');

const modalFileInput = document.querySelector('.modal__file-input'),
	modalFileBtn = document.querySelector('.modal__file-btn'),
	modalImageAdd = document.querySelector('.modal__image-add');

const modalImageItem = document.querySelector('.modal__image-item');
const modalHeaderItem = document.querySelector('.modal__header-item');
const modalYearItem = document.querySelector('.modal__year-item');
const modalStatusItem = document.querySelector('.modal__status-item');
const modalDescriptionItem = document.querySelector('.modal__description-item');
const modalCostItem = document.querySelector('.modal__cost-item');


const infoPhoto = {};  // объект который будет сожержать данные фото

const saveBD = () => {
	localStorage.setItem('awito', JSON.stringify(dataBase));
};

const renderCard = (DB = dataBase) => {
	catalog.textContent = '';
	DB.forEach((item, i) => {
		catalog.insertAdjacentHTML('beforeend', `
		<li class="card" data-id="${i}">
			<img class="card__image" src="data:image/jpeg;base64,${item.image64}" alt="test">
			<div class="card__description">
				<h3 class="card__header">${item.nameItem}</h3>
				<div class="card__price">${item.costItem} ₽</div>
			</div>
		</li>
		`);
	});
};


modalFileInput.addEventListener('change', event => {
	const target = event.target;

	const reader = new FileReader();

	const file = target.files[0];
	infoPhoto.size = file.size; // размер файла определяем чтобы ограничить размер файла
	infoPhoto.filename = file.name;  // чтобы выводить имя файла
	reader.readAsBinaryString(file);  // для начала считывания содержимого file

	// когда файл будет счита произойдет событие 'load'

	reader.addEventListener('load', event => {

		if (infoPhoto.size < 200000) {
			modalFileBtn.textContent = infoPhoto.filename;
			infoPhoto.base64 = btoa(event.target.result);  // конвертируем картинку в base64
			modalImageAdd.src = 'data:image/jpeg;base64,' + infoPhoto.base64;
		} else {
			modalFileBtn.textContent = 'файл должен быть меньше 200 кб'
			modalFileInput.value = '';
			checkForm();
		}
	});
});

addAd.addEventListener('click', () => {
	modalAdd.classList.remove('hide');
	modalBtnSubmit.disabled = true;
});

const checkForm = () => {
	const validForm = elements.every(elem => elem.value);
	modalBtnSubmit.disabled = !validForm;
	modalBtnWarning.style.display = validForm ? 'none' : '';
};

const closeModalAdd = () => {
	modalAdd.classList.add('hide');
	modalSubmit.reset();
	modalFileBtn.textContent = 'Добавить фото';
	modalImageAdd.src = 'img/temp.jpg';
	checkForm();
};

modalAdd.addEventListener('click', event => {
	if (event.target === modalAdd ||
		event.target.classList.contains('modal__close')) {
		closeModalAdd();
	}
});

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {
	event.preventDefault();
	const itemObj = {};
	for (const elem of elements) {
		itemObj[elem.name] = elem.value;
	}
	itemObj.image64 = infoPhoto.base64;
	dataBase.push(itemObj);
	closeModalAdd();
	saveBD();
	renderCard();
	console.log(dataBase);
});


//модальное окно объявления

catalog.addEventListener('click', event => {
	const target = event.target.closest('.card');
	if (target) {
		const item = dataBase[target.dataset.id];
		modalImageItem.src = 'data:image/jpeg;base64,' + item.image64;
		modalHeaderItem.textContent = item.nameItem;
		modalStatusItem.textContent = item.status === 'new' ? 'Новый' : 'Б/У';
		modalDescriptionItem.textContent = item.descriptionItem;
		modalCostItem.textContent = item.costItem + ' ₽';

		modalItem.classList.remove('hide');
	}
});

modalItem.addEventListener('click', event => {
	if (event.target === modalItem || event.target.classList.contains('modal__close')) {
		modalItem.classList.add('hide');
	}
});


renderCard();


//поиск

const searchInput = document.querySelector('.search__input');

searchInput.addEventListener('input', event => {
	const valueSearch = event.target.value.trim().toLowerCase();
	if (valueSearch.length > 2) {
		const result = dataBase.filter( item => item.nameItem.toLowerCase().includes(valueSearch) ||
			item.descriptionItem.toLowerCase().includes(valueSearch));

		renderCard(result)
	}
});

// фильтр

const menuContainer = document.querySelector('.menu__container');

menuContainer.addEventListener('click', event => {
	const target = event.target;

	if (target.tagName === 'A') {
		const result = dataBase.filter( item => item.category === target.dataset.category);

		renderCard(result)
	}
});



