const modalFileInput = document.querySelector('.modal__file-input'),
	modalFileBtn = document.querySelector('.modal__file-btn'),
	modalImageAdd = document.querySelector('.modal__image-add');

modalFileInput.addEventListener('change', event => {
	const target = event.target;

	const infoFile = {};

	const reader = new FileReader();
	reader.addEventListener('load', (event) => {
		if (infoFile.size < 200000) {
			modalFileBtn.textContent = infoFile.filename;
			infoFile.base64 = btoa(event.target.result);
			modalImageAdd.src = 'data:image/jpeg;base64,' + infoFile.base64;
		} else {
			modalFileBtn.textContent = 'файл должен быть меньше 200 кб'
		}
	});

	const file = target.files[0];
	infoFile.size = file.size;
	infoFile.filename = file.name;
	reader.readAsBinaryString(file);
});



