var dictionary;
if(window.require){
	const { ipcRenderer } = require('electron')
	dictionary = (keyword) => ipcRenderer.sendSync('synchronous-message', keyword)
} else {
	(async () => {
		const data = await fetch("ejdict.json")
		const json = await data.json()
		dictionary = (keyword) => Module.makeDictionary(Object.entries(json)).lookup
	})
}
function searchDefinision(keyword) {
    return `<strong>${keyword}</strong>:<br>${dictionary(keyword)}`;
}
