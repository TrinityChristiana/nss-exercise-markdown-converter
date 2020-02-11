# Markdown to HTML

## A JavaScript Exercise

Your task is to build a web application that will display a markdown file as HTML.

The web page should contain a text box, a button and an area to display HTML. When the user enters a URL into the text box and clicks the button, the application should fetch the file at the given URL, interpret it as a markdown file, generate HTML from the markdown file and display the HTML on the page.

To test your code, use the "raw" URL to this gist.
https://gist.githubusercontent.com/askingalot/c0965782b49cf17acc2001dac3bd6d24/raw/07d4afaa8c56c48a1127ece8c3c59abbd9c18add/markdown-to-html.md

For this challenge we'll be using a limited subset of markdown, but feel free to incorporate more markdown features once you've finished.

## Headers

Headers in markdown are created by using one or more # at the beginning of a line. A single # should be converted to an H1 tag, two ## should be interpreted as an H2, and so on up to H6.

For example the following markdown...

```
#### An H4 looks like this
```

...should become...

#### An H4 looks like this

## Unordered Lists

Unordered lists in markdown are lines that start with a *. Convert unordered lists to UL and LI tags in HTML.

For example the following markdown...

```
* Thing One
* Thing Two
* Thing Three
```

...should become...

* Thing One
* Thing Two
* Thing Three


## Code blocks

Code blocks in markdown are surrounded by three back-ticks (```). In HTML code blocks should be wrapped in PRE tags. When you encounter a line that starts with three back-ticks, each line after should be in a PRE tag until you reach another line that starts with three back-ticks.

## Paragraphs

A blank line in a file denotes a paragraph boundary. The text between blank lines should be wrapped in P tags.