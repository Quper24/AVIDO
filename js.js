'use strict';
const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const addAd = document.querySelector('.add__ad');
const modalAdd = document.querySelector('.modal__add');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalBtnWarning = document.querySelector('.modal__btn-warning');
const modalSubmit = document.querySelector('.modal__submit');
const elements = [...modalSubmit.elements]
	.filter(elem => elem.tagName === 'INPUT' ||
		elem.tagName === 'SELECT' ||
		elem.tagName === 'TEXTAREA');


const saveBD = () => {
	localStorage.setItem('awito', JSON.stringify(dataBase));
};

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
	dataBase.push(itemObj);
	closeModalAdd();
	saveBD();
	console.log(dataBase);
});


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



// 	//Работа с фото
//
// 	const modalFileInput = document.querySelector('.modal__file-input'),
// 		modalFileBtn = document.querySelector('.modal__file-btn'),
// 		modalImageAdd = document.querySelector('.modal__image-add');
//
// 	modalFileInput.addEventListener('change', event => {
// 		const target = event.target;
// 		const infoFile = {};  // объект который будет сожержать данные фото
// 		const reader = new FileReader();
//
// 		const file = target.files[0];
// 		infoFile.size = file.size; // размер файла определяем чтобы ограничить размер файла
// 		infoFile.filename = file.name;  // чтобы выводить имя файла
// 		reader.readAsBinaryString(file);  // для начала считывания содержимого file
//
// 		// когда файл будет счита произойдет событие 'load'
//
// 		reader.addEventListener('load', event => {
//
// 			if (infoFile.size < 200000) {
// 				modalFileBtn.textContent = infoFile.filename;
// 				infoFile.base64 = btoa(event.target.result);  // конвертируем картинку в base64
// 				modalImageAdd.src = 'data:image/jpeg;base64,' + infoFile.base64;
// 			} else {
// 				modalFileBtn.textContent = 'файл должен быть меньше 200 кб'
// 			}
// 		});
// 	});


