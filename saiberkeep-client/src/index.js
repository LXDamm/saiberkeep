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
      message.records.forEach(element => {
        nfcStatusP.innerText =+ element;
      });
    });
  } catch (error) {
    nfcStatusP.innerText = 'Error: ' + error;
  }
};

export { ndefSyncRead };