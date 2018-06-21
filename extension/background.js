"use strict";

browser.browserAction.onClicked.addListener(async () => {
	browser.tabs.executeScript(
		undefined,
		{
			code: await browser.experiments.scratchpad.open('alert(JSON.stringify({"a":"b","c":{"d":"e"}}, null, "\t"));', "bbbb", "ccc", true),
			matchAboutBlank: true
		}
	);
});
