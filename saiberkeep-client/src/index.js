const statusElm = document.getElementById('status');

const init = () => {
	if (window.isSecureContext) {
		statusElm.innerText = 'Secure context';
	} else {
		statusElm.innerText = 'No secure context';
	}
	const reader = new NDEFReader();
	let read = reader.scan();
	read.then((event) => {
		statusElm.innerText = 'Scan started successfully.';
		ndef.onreadingerror = (event) => {
			statusElm.innerText = 'Error! Cannot read data from the NFC tag. Try a different one?';
		};
		ndef.onreading = (event) => {
			statusElm.innerText = 'NDEF message read.';
		};
	}).catch((error) => {
		statusElm.innerText = `Error! Scan failed to start: ${error}.`;
	});
};

init();