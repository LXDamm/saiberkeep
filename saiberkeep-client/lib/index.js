const scanButton = document.getElementById('scan-button');
const statusP = document.getElementById('status');
scanButton.addEventListener("click", async () => {
  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    statusP.innerText = 'Scan started';
    ndef.addEventListener("readingerror", () => {
      statusP.innerText = 'Cant read';
    });
    ndef.addEventListener("reading", ({
      message,
      serialNumber
    }) => {
      statusP.innerText = 'Worked';
    });
  } catch (error) {
    statusP.innerText = 'Error';
  }
});