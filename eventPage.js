let toRedirect = [
	"imgs-3a85f4f1.png",
	"imgs-1031af99.png",
	"imgs-bc53aaf1.png",
	"imgs-da5e6071.png"
];


chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		// redirect image
		let finalMatch;
		toRedirect.forEach((imageToReplace) => {
			if (details.url.indexOf(imageToReplace) > -1) {
				let override = `chrome-extension://${chrome.runtime.id}/img/${imageToReplace}`;
				
				console.log(`Redirecting ${imageToReplace}`);
				finalMatch = {
					redirectUrl: override
				};
			}
		});

		if (finalMatch) {
			return finalMatch;
		}
	},
	{
		urls: ["*://surviv.io/*"],
		types: ["image"]
	},
	["blocking"]
);
