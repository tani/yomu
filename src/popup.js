//const dictionary = require('./ejdict.json');
let dictionary;
if(window.require){
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
    Object.assign(popup.style, {
        maxWidth: "300px",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
        color: "#ffffff",
        backgroundColor: "rgba(50,50,50,0.8)",
        borderColor: "#666666",
        borderStyle: "solid",
        borderWidth: "1px",
        position: "absolute",
        zIndex: 1
    });
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
    Object.assign(popup.style, {
        display: "block",
        top: top - rect.top + "px",
        left: left - rect.left + "px"
    });
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
addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("download").style.display = "none";
    document.getElementById("viewBookmark").style.display = "none";
    document.getElementById("presentationMode").style.display = "none";
});
function showAboutWindow(){
    if (window.require) {
        const path = require("path");
        const remote = require("electron").remote;
        const openAboutWindow = remote.require("about-window").default;
        openAboutWindow({
            icon_path: path.join(__dirname, "../../../build/icon.png"),
            copyright: "Copyright (c) 2017 TANIGUCHI Masaya",
            bug_report_url: "https://github.com/ta2gch/yomu/issues",
            homepage: "https://github.com/ta2gch/yomu",
            description: "和英辞書内蔵PDF表示ソフト",
            license: "Apache License 2.0"
        });
    }
}
