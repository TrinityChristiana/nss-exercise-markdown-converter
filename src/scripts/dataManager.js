import DOMManager from "./DOMManager.js"

const mdLink = "https://raw.githubusercontent.com/TrinityTerry/nss-exercise-markdown-converter/master/directions.md";

const dataManager = {
    runIt(url) {
        return this.getMarkdownData(url)
            .then(data => this.toArray(data))
    },
    // Grabs data from link and converts it into text
    //  * => Promise<string>
    getMarkdownData(url) {
        return fetch(url)
            .then(resp => resp.text());
    },
    // Converts string to array seperated by newline
    // * => array
    toArray(data) {
        return data.split("\n");
    },
    // CR: Why is this method in the dataManager?
    getRawHTML() {
        DOMManager.renderRaw(document.getElementById("container").innerHTML, "Raw HTML");

    },
    // CR: Why is this method in the dataManager?
    getMD(mdText) {
        DOMManager.renderRaw(mdText, "Raw Markdown");
    },
    // CR: Why is this method in the dataManager?
    clipboard(modalTextarea) {
        document.getElementById("copy-clipboard").classList.add("disabled")
        modalTextarea.select();
        modalTextarea.setSelectionRange(0, 99999);

        document.execCommand("copy");

        $('#copy-message')
            .transition('fly left');

        // document.getElementById("copy-message").innerHTML

        // alert("Raw Text Copied")


    }



}

export default dataManager;