let codeCount = 0;
let counter = 0;
const convert = {
	runIt(array) {

		// CR: This code loops through the entire markdown array a LOT

		const noSpace = this.noEmptyBeginning(array);
		const code = this.createsCode(noSpace);
		const inline = this.addInline(code);
		const uList = this.addUList(inline);
		const oList = this.addOList(uList);
		return this.createParagraph(oList);
	},
	noEmptyBeginning(array) {
		return array.map(element => element.trim());
	},
	addInline(array) {
		return array.map((line, i) => {
			let checkedLine = line;
			if (typeof checkedLine == 'string') {
				/* CR: You don't need the ternary.
				This is equivalent to the code below
				const star = checkedLine.startsWith('*') 
									&& !checkedLine.endsWith('*') 
									&& array[i][1] !== '*';
				*/
				const star =
					checkedLine.startsWith('*') &&
					!checkedLine.endsWith('*') &&
					array[i][1] !== '*'
						? true
						: false;

				const containStars = checkedLine.includes('*') ? true : false;
				const contianUnderscores = checkedLine.includes('_')
					? true
					: false;
				const dash =
					checkedLine.startsWith('-') &&
					!checkedLine.endsWith('-') &&
					array[i][1] !== '-'
						? true
						: false;
				const plus =
					checkedLine.startsWith('+') &&
					!checkedLine.endsWith('+') &&
					array[i][1] !== '+'
						? true
						: false;

				// CR: I thought the purpose of this method was to make list items, but
				//     this code looks like it's concerned with bold, italics and headers
				if (containStars) {
					checkedLine = this.containStars(checkedLine, star);
				}

				if (contianUnderscores) {
					checkedLine = this.contianUnderscores(checkedLine);
				}
				if (checkedLine.startsWith('#')) {

					// CR: I don't think you'll be in a code block at this point in the program flow
					if (codeCount % 2 === 0) {
						return this.addHeaders(checkedLine);
					}
				} else if (dash || plus) {
					const lines = dash
						? checkedLine.replace('- ', '')
						: plus
						? checkedLine.replace('+ ', '')
						: null;
					return `<li>${lines}</li>`;
				}
				//  else if (emphasis) {
				// 	return this.addEmphasis(line);
				// }
			}
			return checkedLine;
		});
	},
	contianUnderscores(checkedLine) {
		let emText = '';
		for (let i = 0; i < checkedLine.length; i++) {
			console.log(checkedLine);
			if (checkedLine[i] == '_' && checkedLine[i + 1] !== ' ') {
				let starCounter = 0;
				while (typeof checkedLine[i] !== 'undefined') {
					if (checkedLine[i] === '_') {
						starCounter++;
					}

					if (starCounter % 2 == 0 && checkedLine[i] === '_') {
						let j = i - 1;
						emText += `</em>`;

						while (checkedLine[j] !== '_') {
							j--;
						}

						emText = (
							emText.slice(0, j + 1) +
							'<em>' +
							emText.slice(j + 1)
						)
							.split('_')
							.join('');

						if (checkedLine[i] == '_') {
							emText += '';
						}
						emText = emText;
					} else {
						emText += checkedLine[i];
					}
					i++;
				}
			} else {
				emText += checkedLine[i];
			}
		}
		return emText;
	},
	containStars(checkedLine, star) {
		// CR: starLine is unused
		let starLine = checkedLine;
		const numStars = checkedLine.replace(/[^*]/g, '').length;

		// CR: This code has an interesting affect on five stars in a row
		// 	*****
		// Produces
		//  *<b<b>></b<b>
		if (numStars > 1) {
			let boldText = '';
			for (let i = 0; i < checkedLine.length; i++) {
				if (checkedLine[i] + checkedLine[i + 1] == '**') {
					let dbStarCounter = 0;

					// CR: lastStart is unused
					let lastStar = 0;
					while (typeof checkedLine[i] !== 'undefined') {
						if (
							checkedLine[i] === '*' &&
							checkedLine[i + 1] === '*'
						) {
							dbStarCounter++;
						}

						if (
							dbStarCounter % 2 == 0 &&
							checkedLine[i] === '*' &&
							checkedLine[i + 1] === '*'
						) {
							let j = i - 1;
							lastStar = j;

							boldText += `</b>`;
							while (checkedLine[j] !== '*') {
								j--;
							}

							boldText = (
								boldText.slice(0, j + 1) +
								'<b>' +
								boldText.slice(j + 1)
							)
								.split('**')
								.join('');
							if (checkedLine[i] == '*') {
								boldText += '';
							}
							boldText = boldText;
						} else {
							boldText += checkedLine[i];
						}

						// console.log(i)
						// if (
						// 	i ==
						// 	lastStar + 1
						// 	/* ((checkedLine[i + 1] == undefined) ||
						// 			(checkedLine[i + 1] == ' ')) */
						// ) {
						// 	// } else if(i == lastStar + 1 && checkedLine[i + 1] != "*"){
						// } else {
						// }

						// CR: This looks like you found a weird edge case and decided to
						//       just fix it instead of trying to understand it :)
						boldText = boldText.replace('>*', '>');
						// console.log(boldText[lastStar + 1]);

						i++;
					}
				} else {
					boldText += checkedLine[i];
				}
			}
			let emText = '';
			for (let i = 0; i < boldText.length; i++) {
				if (boldText[i] == '*' && boldText[i + 1] !== ' ') {
					let starCounter = 0;
					while (typeof boldText[i] !== 'undefined') {
						if (boldText[i] === '*') {
							starCounter++;
						}

						if (starCounter % 2 == 0 && boldText[i] === '*') {
							let j = i - 1;
							emText += `</em>`;

							while (boldText[j] !== '*') {
								j--;
							}

							emText = (
								emText.slice(0, j + 1) +
								'<em>' +
								emText.slice(j + 1)
							)
								.split('*')
								.join('');

							if (boldText[i] == '*') {
								emText += '';
							}
							emText = emText;
						} else {
							emText += boldText[i];
						}
						i++;
					}
				} else {
					emText += boldText[i];
				}
			}

			return emText;
		}

		if (star) {
			return (starLine = `<li>${checkedLine.replace('* ', '')}</li>`);
		} else {
			return checkedLine;
		}
	},
	addHeaders(line) {
		const pound =
			line.startsWith('#') && !line.endsWith('#') ? true : false;
		if (pound) {
			const num = line.replace(/[^#]/g, '').length;
			const newLine = line.replace('#'.repeat(num), '');
			return `<h${num}>${newLine}</h${num}>`;
		} else {
			const num = line.replace(/[^#]/g, '').length / 2;
			let newLine = line.replace('#'.repeat(num), '');
			newLine = newLine.slice(0, -num);
			return `<h${num}>${newLine}</h${num}>`;
		}
	},
	addUList(array) {
		return array.map((line, i, array) => {
			const uList = document.createElement('ul');
			const inCode = codeCount % 2 !== 0;

			if (!inCode) {
				if (typeof line === 'string') {
					if (
						line.startsWith('<li>') &&
						!array[i - 1].startsWith('<li>')
					) {
						// CR: As in the "code" method, you're looping over list items twice
						while (array[i].startsWith('<li>')) {
							uList.innerHTML += array[i];
							i++;
						}
						return uList;
					} else if (line.startsWith('<li>')) {
						return undefined;
					}
				}
			}
			return line;
		});
	},
	addOList(array) {
		return array.map((line, i, array) => {
			const oList = document.createElement('ol');
			const inCode = codeCount % 2 !== 0;

			if (!inCode) {
				if (typeof line === 'string') {
					// if (typeof array[i - 1] == String) { }
					if (/^\d/.test(line) && !/^\d/.test(array[i - 1])) {
						let orderNumber = 1;
						while (/^\d/.test(array[i])) {
							oList.innerHTML += `<li>${array[i].replace(
								`${array[i].match(/^\d/)[0]}.`,
								''
							)}</li>`;
							orderNumber++;
							i++;
						}
						return oList;
					} else if (/^\d/.test(line)) {
						return undefined;
					}
				}
			}
			return line;
		});
	},
	createsCode(array) {
		// CR: This method returns an array of strings, undefineds and DOM nodes
		//     	 It's usually best to be consistent with types.
		//     This method loops over code blocks twice.
		//       If you need to skip ahead through an array (as you do in the while loop below)
		//       it's probably better to just use a traditional for(;;) loop.
		//       That would also have the advantage of letting the result array be
		//       a different size than the input array, so you wouldn't need to 
		//       use undefined for the value of certain elements.
		return array.map((line, i) => {
			if (line === '```') {
				// CR: for a flag that toggles consider something like this:
				//     inCode = !inCode;
				codeCount++;
			}

			const inCode = codeCount % 2 !== 0;

			// CR: Not sure line will ever be undefined here, but if you change
			//      the order of your calls in runIt(), I guess it could be...
			if (inCode && line !== undefined && line !== '```') {

				// CR: I _think_ I understand this counter. I don't think you'd need it
				//       if you weren't making multiple passes over the array.
				if (counter == 0) {
					const code = document.createElement('code');
					while (array[i] !== '```') {
						code.innerHTML += `${array[i]} </br>`;
						counter++;
						i++;
					}
					counter--;
					return code;
				} else {
					counter--;
					return undefined;
				}
			}
			if (line === '```') {
				return undefined;
			}
			return line;
		});
	},
	createParagraph(array) {
		array.push('');

		return array.map((line, i) => {
			if (
				line !== '' &&
				line !== undefined &&
				(array[i - 1] == '' || array[i - 1] == undefined)
			) {
				const paragraph = document.createElement('p');
				while (array[i] !== '') {
					if (typeof array[i] == 'object') {
						paragraph.appendChild(array[i]);
					} else if (array[i] !== undefined) {
						paragraph.innerHTML += array[i];
					}
					i++;
				}
				if (paragraph.innerHTML !== '') {
					return paragraph;
				}
			} else {
				return undefined;
			}
			return line;
		});
	}
};

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

// TODO: MD-Emphasis
// Emphasis, aka italics, with *asterisks* or _underscores_. (<i>)

// Strong emphasis, aka bold, with **asterisks** or __underscores__. (<b>)

// Combined emphasis with **asterisks and _underscores_**. (<b><i>)

// Strikethrough uses two tildes. ~~Scratch this.~~ (<del>)

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
// Colons can be used to align columns.

// | Tables        | Are           | Cool  |
// | ------------- |:-------------:| -----:|
// | col 3 is      | right-aligned | $1600 |
// | col 2 is      | centered      |   $12 |
// | zebra stripes | are neat      |    $1 |

// There must be at least 3 dashes separating each header cell.
// The outer pipes (|) are optional, and you don't need to make the
// raw Markdown line up prettily. You can also use inline Markdown.

// Markdown | Less | Pretty
// --- | --- | ---
// *Still* | `renders` | **nicely**
// 1 | 2 | 3

// TODO: MD-Blockquotes
// > Blockquotes are very handy in email to emulate reply text.
// > This line is part of the same quote.
// TODO: MD-Inline HTML
// Ignore html
// TODO: MD-Horizontal Rule(line breaks)
// Three or more...

// ---

// Hyphens

// ***

// Asterisks

// ___

// Underscores

// TODO: MD-Line Breaks
// TODO: MD-YouTube Videos
// [![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)

export default convert;
