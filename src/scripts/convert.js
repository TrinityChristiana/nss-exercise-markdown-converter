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

// TODO: MD-Emphasis
    // Emphasis, aka italics, with *asterisks* or _underscores_. (<i>)

    // Strong emphasis, aka bold, with **asterisks** or __underscores__. (<b>)

    // Combined emphasis with **asterisks and _underscores_**. (<b><i>)

    // Strikethrough uses two tildes. ~~Scratch this.~~ (<del>)

// TODO: MD-Lists
    // dots == space
    // 1. First ordered list item <ol>
    // 2. Another item
    // ⋅⋅* Unordered sub-list. 
    // 1. Actual numbers don't matter, just that it's a number
    // ⋅⋅1. Ordered sub-list
    // 4. And another item.

    // ⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown). (indents in lists with )

    // ⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
    // ⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
    // ⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

    // * Unordered list can use asterisks - Or minuses + Or pluses

// TODO: MD-Images
    // [I'm an inline-style link](https://www.google.com) 

    // [I'm an inline-style link with title](https://www.google.com "Google's Homepage") title="Google's Homepage"

    // [I'm a relative reference to a repository file](../blob/master/LICENSE)

    // URLs and URLs in angle brackets will automatically get turned into links. 
    // http://www.example.com or <http://www.example.com> and sometimes 
    // example.com (but not on Github, for example).
// TODO: MD-Images
    // Here's our logo (hover to see the title text):

    // Inline-style: 
    // ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

    // Reference-style: 
    // ![alt text][logo]
    // [logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
// TODO: MD-Syntax Highlighting
    // Inline `code` has `back-ticks around` it.
    // ```javascript
    // var s = "JavaScript syntax highlighting";
    // alert(s);
    // ```
    
    // ```python
    // s = "Python syntax highlighting"
    // print s
    // ```
    
    // ```
    // No language indicated, so no syntax highlighting. 
    // But let's throw in a <b>tag</b>.
    // ```

// TODO: MD-Tables

// TODO: MD-Blockquotes
// TODO: MD-Inline HTML
// TODO: MD-Horizontal Rule
// TODO: MD-Line Breaks
// TODO: MD-YouTube Videos

export default convert;