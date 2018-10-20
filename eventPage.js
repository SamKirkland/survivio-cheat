let toRedirect = [
	"/assets/imgs-100-fd8c54a2.png",
	"/assets/imgs-100-a665c3db.png",
	"/assets/imgs-100-73663df4.png",
	"/assets/imgs-100-22af036a.png",
	"/img/surviv_logo_full.png"
];


chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		// redirect image
		let finalMatch;
		toRedirect.forEach((imageToReplace) => {
			let fileNameNoPath = imageToReplace.substring(imageToReplace.lastIndexOf('/')+1);
			if (details.url.indexOf(imageToReplace) > -1) {
				let override = `chrome-extension://${chrome.runtime.id}/img/${fileNameNoPath}`;
				
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
