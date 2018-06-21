"use strict";

Components.utils.import("resource://devtools/client/scratchpad/scratchpad-manager.jsm");

class ScratchPadAPI extends ExtensionAPI {
	getAPI() {
		return {
			experiments : {
				scratchpad : {
					async open(sourceCode="", title="", status="", prettyPrint=false) { // you must double default args in signature
						//console.log(sourceCode, title, status, prettyPrint);
						return new Promise((resolve, reject)=>{
							let cWin=ScratchpadManager.openScratchpad({ 'text': sourceCode, 'saved': true});
							cWin.addEventListener(
								"load",
								(evt)=>{
									//console.log("event listener load fire");
									let doc=evt.target;
									let win=doc.documentElement;
									let el=doc.getElementById("sp-environment-menu");
									el.disabled=true;
									el.collapsed=true;

									if(status){
										win.status=status;
									}
									if(cWin.Scratchpad){
										if(title){
											win.setAttribute("title", title)
											// win and cWin are different: win is window tag, cWin is ChromeWindow
											cWin.Scratchpad._initialWindowTitle=title; 
											cWin.Scratchpad._updateTitle();
										}
										cWin.Scratchpad.promptSave=function SP_promptSave(aCallback) {
											if (aCallback) {
												aCallback(true, false);
											}
											return true;
										}
										if(prettyPrint){
											const doPrettyPrint=()=>{
												try{
													cWin.Scratchpad.prettyPrint();
												}
												catch(ex){
													cWin.setTimeout(doPrettyPrint, 0);
												}
											};
											doPrettyPrint();
										}
									}else{
										console.error("Damn it, cWin.Scratchpad is", cWin.Scratchpad);
									}
								},
								false
							);
							cWin.addEventListener(
								"close",
								(evt)=>{
									if(prettyPrint){
										cWin.Scratchpad.prettyPrint();
									}
									let res = evt.target.Scratchpad.getText();
									//console.log(res);
									resolve(res);
								},
								true
							);
						});
					},
				},
			},
		};
	}
};

var identifierOfVariable1;
identifierOfVariable1=ScratchPadAPI; //let, const, class, export or without var don't work. 
