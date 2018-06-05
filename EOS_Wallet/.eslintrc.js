module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "settings": {
        "html/html-extensions": [".html", ".vue"],
        "html/indent": "+2",
    },
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "extends": "plugin:vue/essential",
    "plugins": [
        "vue",
        "html"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "no-console": 0
    }
};