// This is a part of product published under the Apache-2.0 license.
// See also LICENSE.
function showAboutWindow(){
    if (window.require) {
        const path = require("path");
        const remote = require("electron").remote;
        const openAboutWindow = remote.require("about-window").default;
        console.log(__dirname);
        openAboutWindow({
            icon_path: path.join(__dirname, "../../icon.png"),
            copyright: "Copyright (c) 2017 TANIGUCHI Masaya",
            bug_report_url: "https://github.com/tani/yomu/issues",
            homepage: "https://tani.github.io/yomu",
            description: "英和辞書内蔵PDF表示ソフト",
            license: "Apache License 2.0"
        });
    } else {
        window.open("https://tani.github.io/yomu", "_blank");
    }
}
