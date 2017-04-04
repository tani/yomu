//const dictionary = require('./ejdict.json');
let dictionary;
if(require){
    dictionary = require("./ejdict.json");
} else {
    fetch("ejdict.json")
        .then(_=>_.json())
        .then(_=>dictionary = _);
}
function edit(keyword) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let candidates = new Array();
    for(let i = 0; i < keyword.length; i++) {
        candidates.push(keyword.slice(0, i)+keyword.slice(i+1));
    }
    for(let i = 0; i < keyword.length; i++) {
        for(const letter of alphabet) {
            candidates.push(keyword.slice(0, i)+letter+keyword.slice(i));
        }
    }
    for(let i = 0; i < keyword.length; i++) {
        for(const letter of alphabet) {
            candidates.push(keyword.slice(0, i)+letter+keyword.slice(i+1));
        }
    }
    for(let i = 0; i < keyword.length - 1; i++) {
        let target = `${keyword}`;
        const letter = target[i];
        target[i] = target[i+1];
        target[i+1] = letter;
        candidates.push(target);
    }
    return candidates;
}
function getCandidates(keyword) {
    const target = keyword.replace(/ing$/,'');
    const edit0 = keyword.length > 43 ? [] : [target];
    const edit1 = keyword.length > 43 ? [] : edit(target);
    const edit2 = keyword.length > 20 ? [] : [].concat.apply([],edit(target).map(edit));
    return Array.from(new Set([].concat.apply([], [edit0,edit1,edit2])));
}
function searchDefinision(keyword) {
    for(const candidate of getCandidates(keyword)) {
        if(candidate in dictionary) {
            return `<strong>${candidate}</strong>:<br>${dictionary[candidate]}`;
        }
    }
}
function createPopup() {
    const popup = document.createElement("div");
    popup.id = "popup";
    popup.style.maxWidth = "300px";
    popup.style.paddingTop = "10px";
    popup.style.paddingBottom = "10px";
    popup.style.paddingLeft = "10px";
    popup.style.paddingRight = "10px";
    popup.style.color = "#fff";
    popup.style.backgroundColor = "rgba(50,50,50,0.8)";
    popup.style.borderColor = "#666";
    popup.style.borderStyle = "solid";
    popup.style.borderWidth = "1px";
    popup.style.position = "absolute";
    popup.style.zIndex = 1;

    const viewer = document.getElementById("viewer");
    viewer.style.position = "relative";
    viewer.appendChild(popup);
    return popup;
}
function showPopup(content, top, left) {
    const popup = document.getElementById("popup") || createPopup();
    const viewer = document.getElementById("viewer");
    const rect = viewer.getBoundingClientRect();
    popup.innerHTML = content;
    popup.style.display = "block";
    popup.style.top = top - rect.top + "px";
    popup.style.left = left - rect.left + "px";
}
function hidePopup() {
    const popup = document.getElementById("popup") || createPopup();
    popup.style.display = "none";
}
addEventListener("mouseup", ()=>{
    const selection = getSelection();
    const keyword = selection.toString();
    if(keyword.length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const content = searchDefinision(keyword);
        const top = rect.bottom;
        const left = (rect.right + rect.left) / 2 - 20;
        console.log(selection, content);
        showPopup(content, top, left);
    } else {
        hidePopup();
    }
});
