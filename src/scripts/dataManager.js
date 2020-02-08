import DOMManager from "./DOMManager.js"

const mdLink = "https://gist.githubusercontent.com/askingalot/c0965782b49cf17acc2001dac3bd6d24/raw/07d4afaa8c56c48a1127ece8c3c59abbd9c18add/markdown-to-html.md";

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
    getRawHTML() {
        DOMManager.renderRaw(document.getElementById("container").innerHTML, "Raw HTML");

    },
    getMD(mdText) {
        DOMManager.renderRaw(mdText, "Raw Markdown");
    },
    clipboard(modalTextarea) {
        modalTextarea.select();
        modalTextarea.setSelectionRange(0, 99999);

        document.execCommand("copy");
        alert("Raw Text Copied")

        // // console.log(modalTextarea.)
        // modalTextarea.select();
        // modalTextarea.setSelectionRange(0, 99999);

        // document.execCommand("copy");
        // console.log(`Copied Text: ${modalTextarea.value}`)



        // let selection = document.getSelection();
        // let range = document.createRange();
        // //  range.selectNodeContents(textarea);
        // range.selectNode(textarea);
        // selection.removeAllRanges();
        // selection.addRange(range);

        // console.log('copy success', document.execCommand('copy'));
        // selection.removeAllRanges();

    }



}

export default dataManager;