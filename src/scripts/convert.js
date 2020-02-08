let codeCount = 0;
let pCount = 0;

const convert = {
    runIt(array) {
        const inline = this.addInline(array);
        const uList = this.addUList(inline);
        const code = this.createsCode(uList);
        return this.createParagraph(code);
    },
    addInline(array) {
        return array.map((line, i) => {
            if (line.startsWith("#")) {
                if (codeCount % 2 === 0) {
                    return this.addHeaders(line);
                }

            } else if (line.startsWith("*")) {
                return `<li>${line}</li>`

            } else {
                return line;
            }
        })
    },
    addHeaders(line) {
        const num = line.replace(/[^#]/g, "").length;
        const newLine = line.replace("#".repeat(num), '');
        return `<h${num}>${newLine}</h${num}>`;
    },
    addUList(array) {
        return array.map((line, i, array) => {
            const uList = document.createElement("ul");

            if (line.startsWith("<li>") && !array[i - 1].startsWith("<li>")) {
                while (array[i].startsWith("<li>")) {
                    uList.innerHTML += array[i].replace("*", '');
                    i++;
                }
                return uList;
            } else if (line.startsWith("<li>")) {
                return undefined;
            }
            return line;
        })
    },
    createsCode(array) {
        return array.map((line, i) => {
            if (line === "```") {
                codeCount++;
            }
            const inCode = codeCount % 2 !== 0;

            if (inCode && line !== undefined) {
                const code = document.createElement("PRE");
                if (line !== "```") {
                    if (typeof line == "object") {
                        code.appendChild(line);
                    } else {
                        code.innerHTML += `${line}`;
                    }
                    return code;
                }

            }
            if (line === "```") {
                return undefined;
            }
            return line;
        });

    },
    createParagraph(array) {
        array.push("")
        return array.map((line, i) => {
            
            if ((line !== "" && line !== undefined ) && (array[i - 1] == "" || array[i - 1] == undefined)) {                
                const paragraph = document.createElement("p");
                    while (array[i] !== "") {
                        if (typeof array[i] == "object") {
                            paragraph.appendChild(array[i]);
                        } else if(array[i] !== undefined){
                            paragraph.innerHTML += array[i];
                        }
                        i++;
                    }
                    if(paragraph.innerHTML !== ""){
                        return paragraph;
                    }
            } else {
                return undefined;
            }

            return line;
        });


    }
}

export default convert;