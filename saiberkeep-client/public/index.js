const scanButton = document.getElementById('scan-button');
const statusP = document.getElementById('status');
scanButton.addEventListener("click", async () => {
  statusP.innerText = 'User clicked scan button';

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    statusP.innerText = '> Scan started';
    ndef.addEventListener("readingerror", () => {
      statusP.innerText = 'Argh! Cannot read data from the NFC tag. Try another one?';
    });
    ndef.addEventListener("reading", ({
      message,
      serialNumber
    }) => {
      statusP.innerText = `> Serial Number: ${serialNumber}`;
      statusP.innerText = `> Records: (${message.records.length})`;
    });
  } catch (error) {
    statusP.innerText = 'Argh! ' + error;
  }
});