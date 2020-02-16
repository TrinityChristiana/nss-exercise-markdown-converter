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

			// CR: since you're using an array, yoo could use desstructoring
			// const [isUrl, input] = inputManager.runIt();
			const input = inputManager.runIt();

			// CR: This if statement is an opportunity to refactor
			//  You're largely doing the same thing in each branch of the if.
			if (input[0]) {
				dataManager.runIt(input[1]).then(array => {
					const HTMLArray = convert.runIt(array);
					DOMManager.render(HTMLArray);
					// console.log()
					this.mdBtnEvt(array.join('\n'));
					this.htmlBtnEvt();
				});
			} else {

				// CR: Formatting!
								const textArray = input[1].split('\n')
								
								// CR: I don't understand why you are adding blank lines
                const arraySpaces = []
				textArray.forEach((element, i, array) => {
                    arraySpaces.push(element)
                    if (array[i + 1] !== '') {
                        arraySpaces.push("");
					}
                });

                console.log(arraySpaces);

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

		// CR: this is pretty hard to follow
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
	// CR: I would call this method addCopyClipboardListener, or something like that
	copyClipboard(modalTextarea) {
		document
			.getElementById('copy-clipboard')
			.addEventListener('click', () =>
				dataManager.clipboard(modalTextarea)
			);
	}
};

export default eventManager;
