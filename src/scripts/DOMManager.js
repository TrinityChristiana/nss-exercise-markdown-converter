import eventManager from "./eventManager.js";

const DOMManager = {
    render(array) {
        const container = document.getElementById("container");
        container.innerHTML = "";
        array.forEach(element => {
            if (typeof element == "object") {
                container.appendChild(element);
                // console.log(element)
            } else if (element == undefined) {} else {

                container.innerHTML += element;
            }
        });

    },
    loader() {
        document.getElementById("container").innerHTML = `
        <div class="ui segment">
            <div class="ui active dimmer">
                <div class="ui loader"></div>
            </div>
        </div>`
    },
    renderWelcome() {
        // document.getElementById("modal-text").innerHTML = "";
        document.getElementById("modal-text").innerHTML = `
            <p>This application converts markdown to HTML. </p>
            <p>You as a user have the option to either convert a link or type out Markdown in the text box to be converted into HTML.</p>
            <p>After the text has been converted, you as a user can read the converted markdown in its HTML format below the text box.</p>
            <p>There will also be an option to get the raw HTML text</p>
            <p>If a link was submitted, an option to get the raw markdown text will appear</p>
            <p>Thank you for choosing our Markdown to HTML converter. Hope you enjoy!</p>

        `;
        document.getElementById("action-buttons").innerHTML = `
        <div class="ui green ok inverted button">
            <i class="checkmark icon"></i>
            Get Converting
        </div>
        `
        document.getElementById("modal-header").innerHTML = "Welcome To Markdown to HTML Converter";
    },
    renderRaw(rawText, message) {

        const modalText = document.getElementById("modal-text")
        modalText.innerHTML = `
        <div class="ui form">
            <div class="ui field transparent">
                <textarea readonly="" id="modal-textarea"></textarea>
            </div>
        </div>
        `;
        const modalTextarea = document.getElementById("modal-textarea");
        modalTextarea.value = rawText;
        document.getElementById("modal-header").innerHTML = message;
        document.getElementById("action-buttons").innerHTML = ` 

        <button class="ui basic blue button" id="copy-message">Copied to Clipboard!</button>
            <div id="copy-clipboard" class="blue ui animated button" tabindex="0">
                <div class="visible content">Copy</div>
                <div class="hidden content">
                <i class="clipboard outline icon"></i>
                </div>
            </div>
            <div class="ui green ok inverted button">
                <i class="checkmark icon"></i>
                Done
            </div>`

        $('#copy-message')
            .hide();

        $('.ui.longer.modal')
            .modal('show');

        eventManager.copyClipboard(modalTextarea);


    }

}

export default DOMManager;