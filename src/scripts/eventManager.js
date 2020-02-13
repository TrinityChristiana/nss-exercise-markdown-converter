import convert from './convert.js';
import dataManager from './dataManager.js';
import DOMManager from './DOMManager.js';
import inputManager from './inputManager.js';

const eventManager = {
	runIt() {
		this.submitEvent();
		this.welcomeModal();
	},
	submitEvent() {
		document.getElementById('submit-btn').addEventListener('click', () => {
			DOMManager.loader();
			const input = inputManager.runIt();

			if (input[0]) {
				dataManager.runIt(input[1]).then(array => {
					const HTMLArray = convert.runIt(array);
					DOMManager.render(HTMLArray);
					this.mdBtnEvt(array.join('\n'));
					this.htmlBtnEvt();
				});
			} else {

                const textArray = input[1].split('\n')
                const arraySpaces = []
				textArray.forEach((element, i, array) => {
                    arraySpaces.push(element)
                    if (array[i + 1] !== '') {
                        arraySpaces.push(undefined);
					}
                });


                const HTMLArray = convert.runIt(arraySpaces);
                
				DOMManager.render(HTMLArray);
				this.htmlBtnEvt();
			}
			this.showRaw(input[0]);
		});
	},
	showRaw(url) {
		const htmlBtn = document.getElementById('show-html-btn');
		const mdBtn = document.getElementById('show-md-btn');
		if (url && document.getElementById('container').innerHTML) {
			mdBtn.classList.remove('hideit', 'disabled');
			htmlBtn.classList.remove('hideit', 'disabled');
		} else if (document.getElementById('container').innerHTML) {
			htmlBtn.classList.remove('hideit', 'disabled');
		} else {
			mdBtn.classList.add('hideit');
			htmlBtn.classList.add('hideit');
		}
	},
	htmlBtnEvt(HTML) {
		document
			.getElementById('show-html-btn')
			.addEventListener('click', dataManager.getRawHTML);
	},
	mdBtnEvt(mdText) {
		document
			.getElementById('show-md-btn')
			.addEventListener('click', () => dataManager.getMD(mdText));
	},
	welcomeModal() {
		DOMManager.renderWelcome();
		$('.ui.longer.modal').modal('show');
	},
	copyClipboard(modalTextarea) {
		document
			.getElementById('copy-clipboard')
			.addEventListener('click', () =>
				dataManager.clipboard(modalTextarea)
			);
	}
};

export default eventManager;
