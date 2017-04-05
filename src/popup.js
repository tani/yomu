function createPopup() {
    const popup = document.createElement("div");
    popup.id = "popup";
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
