Scraptchpad WebExtensions API experiment [![Unlicensed work](https://raw.githubusercontent.com/unlicense/unlicense.org/master/static/favicon.png)](https://unlicense.org/)
========================================
[![Libraries.io Status](https://img.shields.io/librariesio/github/KOLANICH/webext-experiment-scratchpad)](https://libraries.io/github/KOLANICH/webext-experiment-scratchpad)

Look & Feel
-----------

```javascript
browser.experiments.scratchpad.open(
	'{"a":"b","c":{"d":"e"}}', // source code
	"bbbb", // window title
	"ccc", // text to show in statusbar
	true // do pretty printing automatically on load and unload
).then(console.log.bind(console))
```
The promise is fullfiled when the editor is closed.

License
-------
The code is under Unlicense.

SVG files contain their licenses inside of them.

What is it
----------
This repo contains a pair of extensions.
* `experiment` directory contains the source of the [experimental WebExtensions API](https://firefox-source-docs.mozilla.org/toolkit/components/extensions/webextensions/index.html) for [Scratchpad](https://developer.mozilla.org/docs/Tools/Scratchpad). **Install it first.**
* `extension` directory contains a simple extension injecting the source edited in Scratchpad into the current webpage. After installation it adds a button. When you click it Scratchpad opens. You can edit the source. After you have edited the source close the Scratchpad window. The source will be injected into the page.

