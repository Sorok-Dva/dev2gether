module.exports = {
    "extends": "standard",
    "plugins": ["async-await"],
	"env": {
		"es6": true
	},
    "rules": {
        "async-await/space-after-async": 2,
        "async-await/space-after-await": 2,
        "arrow-body-style": ["error", "as-needed"],
		"arrow-parens": ["error", "as-needed"],
		"arrow-spacing": "error",
        "semi": "off",
		"indent": [2, 2],
		"no-tabs": 2,
        "keyword-spacing": "off",
        "brace-style": "off",
        "key-spacing": "off",
        "eol-last": "off",
        "eqeqeq": "off",
		"no-confusing-arrow": "error",
		"no-unused-vars": "off",
		"no-empty-function": "error",
		"no-return-assign": ["warn", "except-parens"],
		"no-useless-escape": "off",
		"no-trailing-spaces": "off",
		"one-var": "off",
		"prefer-arrow-callback": 1,
		"standard/object-curly-even-spacing": "off"
    }
};
