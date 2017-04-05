function showAboutWindow(){
    if (window.require) {
        const path = require("path");
        const remote = require("electron").remote;
        const openAboutWindow = remote.require("about-window").default;
        console.log(__dirname);
        openAboutWindow({
            icon_path: path.join(__dirname, "../../icon.png"),
            copyright: "Copyright (c) 2017 TANIGUCHI Masaya",
            bug_report_url: "https://github.com/ta2gch/yomu/issues",
            homepage: "https://ta2gch.github.com/yomu",
            description: "英和辞書内蔵PDF表示ソフト",
            license: "Apache License 2.0"
        });
    } else {
        window.open("https://ta2gch.github.io/yomu", "_blank");
    }
}
