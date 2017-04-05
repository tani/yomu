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
    } else {
        window.open("https://ta2gch.github.io/yomu", "_blank");
    }
}
