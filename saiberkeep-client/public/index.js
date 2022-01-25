"use strict"

const nfcStatusP = document.getElementById('nfc-status');

const ndefSyncRead = async (ndef) => {
  try {
    await ndef.scan();
    nfcStatusP.innerText = 'Sync started';

    ndef.addEventListener("readingerror", () => {
      nfcStatusP.innerText = 'Error reading data from implant/card';
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      let html = '<ul>';
      message.records.forEach(record => {
        const textDecoder = new TextDecoder(record.encoding);
        html = html + '<li>' + textDecoder.decode(record.data) + '</li>';
      });
      html = html + '</ul>';
      nfcStatusP.innerHTML = html;
    });
  } catch (error) {
    nfcStatusP.innerText = 'Error: ' + error;
  }
};

export { ndefSyncRead };