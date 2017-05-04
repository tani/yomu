// This is a part of product published under the Apache-2.0 license.
// See also LICENSE.
let dictionary;
if(window.require){
    dictionary = require("./ejdict.json");
} else {
    fetch("ejdict.json")
        .then(_=>_.json())
        .then(_=>dictionary = _);
}
function* edit(keyword) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    for(let i = keyword.length - 1; i >= 0; i--) {
        for(const letter of alphabet) {
            yield keyword.slice(0, i)+letter+keyword.slice(i+1);
        }
    }
    for(let i = keyword.length - 1; i >= 0; i--) {
        let target = `${keyword}`;
        const letter = target[i];
        target[i] = target[i+1];
        target[i+1] = letter;
        yield target;
    }
    for(let i = keyword.length - 1; i >= 0; i--) {
        yield keyword.slice(0, i)+keyword.slice(i+1);
    }
    for(let i = keyword.length - 1; i >= 0; i--) {
        for(const letter of alphabet) {
            yield keyword.slice(0, i)+letter+keyword.slice(i);
        }
    }
}
function* genCandidate(keyword) {
    yield keyword;
    keyword = keyword.toLowerCase();
    yield keyword;
    keyword = keyword.replace(/ie[sd]$/, 'y');
    keyword = keyword.replace(/ing$/,'i');
    yield keyword
    if(keyword.length <= 43){
        let e1 = edit(keyword);
        for(let c1 = e1.next(); !c1.done; c1 = e1.next()) {
            yield c1.value;
        }
    }
    if(keyword.length <= 20) {
        let e1 = edit(keyword);
        for(let c1 = e1.next(); !c1.done; c1 = e1.next()) {
            let e2 = edit(c1.value);
            for(let c2 = e2.next(); !c2.done; c2 = e2.next()) {
                yield c2.value;
            }
        }
    }
}
function searchDefinision(keyword) {
    let candidate = genCandidate(keyword);
    for(let c = candidate.next(); !c.done; c = candidate.next()) {
        if(c.value in dictionary) {
            return `<strong>${c.value}</strong>:<br>${dictionary[c.value]}`;
        }
    }
}
