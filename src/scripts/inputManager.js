import validate from './validate.js'

const inputManager = {
    runIt(){
        const input = this.getTextInput();
        return [validate.validURL(input), input];
    },
    getTextInput(){
        return document.getElementById("markdown-input").value;
    }

}


export default inputManager;