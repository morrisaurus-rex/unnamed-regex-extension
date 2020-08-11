const elementBlacklist = {
    "img": true,
    "button": true,
    "input": true,
    "svg": true
}

const highglightClassName = 'regex-highlight';


function iterateDocumentTextContent(startNode, callback) {
    for (let child in startNode.childNodes) {
        if (child.nodeType == Node.TEXT_NODE) {
            callback(child);
        } else {
            if (!elementBlacklist[child.tagName]) {
                iterateDocumentTextContent(child, callback);
            }
        }
    }
    return;
}



function createHighlight(text) {
    let element = document.createElement('a');
    element.textContent = text;
    element.classList.add(highlightClassName);
    return element;
}

function highlightMatches(element, regex) {
    for (let content in element.childNodes) {
        if (content.nodeType == Node.TEXT_NODE) {
            let matches = [...content.nodeValue.matchAll(regex)];
            for (let a = 0; a < matches.length; a++) {
                if (a == 0) {
                    let leftText = new Text();
                    leftText.nodeValue = element.nodeValue.slice(0, matches[a].index);
                    element.insertBefore(leftText, content);
                    elementinsertBefore(createHighlight(content.nodeValue.slice(matches[a].index, matches[a].index + matches[a].length))); 
                } else {

                }
            }
        }
    }
}

browser.runtime.onMessage(message => {
 
});