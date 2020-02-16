import validate from './validate.js'

const inputManager = {
    runIt(){
        const input = this.getTextInput();

        // CR: For readability it might be better to use an object to return
        //  multiple values.
        return [validate.validURL(input), input];
    },
    getTextInput(){
        return document.getElementById("markdown-input").value;
    }

}


export default inputManager;