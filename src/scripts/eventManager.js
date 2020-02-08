import convert from './convert.js';
import dataManager from "./dataManager.js";
import DOMManager from './DOMManager.js';
import inputManager from './inputManager.js'

const eventManager = {
    runIt() {
        this.submitEvent();
        this.welcomeModal();

    },
    submitEvent() {
        document.getElementById("submit-btn").addEventListener("click", () => {
            const input = inputManager.runIt();

            if (input[0]) {
                dataManager.runIt(input[1])
                    .then(array => {

                        const HTMLArray = convert.runIt(array);
                        DOMManager.render(HTMLArray);
                        // console.log()
                        this.mdBtnEvt(array.join("\n"));
                        this.htmlBtnEvt();
                    })
            } else {
                const HTMLArray = convert.runIt(input[1].split("\n"));
                DOMManager.render(HTMLArray);
                this.htmlBtnEvt();
            }
            this.showRaw(input[0]);




        })
    },
    showRaw(url) {
        console.log(url)
        const htmlBtn = document.getElementById("show-html-btn");
        const mdBtn = document.getElementById("show-md-btn");
        if (url && document.getElementById("container").innerHTML) {
            mdBtn.classList.remove("hideit", "disabled")
            htmlBtn.classList.remove("hideit", "disabled")
        } else if (document.getElementById("container").innerHTML) {
            htmlBtn.classList.remove("hideit", "disabled");
        } else {
            mdBtn.classList.add("hideit")
            htmlBtn.classList.add("hideit")
        }
    },
    htmlBtnEvt(HTML) {
        console.log(HTML)
        document.getElementById("show-html-btn").addEventListener("click", dataManager.getRawHTML);        
    },
    mdBtnEvt(mdText) {
        document.getElementById("show-md-btn").addEventListener("click", () => dataManager.getMD(mdText));

    },
    welcomeModal() {
        DOMManager.renderWelcome();
        $('.ui.longer.modal').modal('show');
    },
    copyClipboard(modalTextarea){
        document.getElementById("copy-clipboard").addEventListener("click", () => dataManager.clipboard(modalTextarea));
    }
};

export default eventManager;