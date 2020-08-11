const searchBox = document.querySelector('#regex-input');
const searchButton = document.querySelector('#regex-submit');
const resultBox = document.querySelector('#results');

// Changes the result box to error styling with the displayed message
function resultBoxErrorState(message) {
    resultBox.style.backGroundColor = "rgb(255, 163, 163)";
    resultBox.style.visibility = 'visible';
    resultBox.textContent = message;
}
// Changes the result box back to default styling
function resultBoxDefaultState() {
    resultBox.style.backGroundColor = "rgba(0, 0, 0, 0)";
    resultBox.style.visibility = 'hidden';
    resultBox.textContent = "";
}
// callback for the submit button
function submitExpr(queriedTabs) {
    resultBoxDefaultState();
    let regexp = searchBox.value;
    if (!isValidRegex(regexp)) {
        resultBoxErrorState("Invalid regular expression");
    }
    resultBox.style.visibility = 'hidden';
    browser.tabs.sendMessage(queriedTabs[0].id, {command: 'search', expression: regexp }
    ).then( response => {
        resultBox.style.visibility = 'visible';
        if (response.resultCount == 1) {
            resultBox.textContent = "1 match found.";
        } else {
            resultBox.textContent = `${response.resultCount} matches found.`;
        }
    }).catch(onError);

}
// Returns true if the given string forms a valid regular expression
function isValidRegex(regexString) {
    // just take advantage of the fact that JS has a regex constructor that can do the parsing for us
    try {
        let re = new RegExp(regexString);
    } catch (error) {
        return false;
    }
    return true;
}

function onError(error) {
    console.log(`[Error] ${error}`);
}

searchButton.addEventListener('click', event => {
    browser.tabs.query({active: true, currentWindow: true})
        .then(submitExpr)
        .catch(onError);
});