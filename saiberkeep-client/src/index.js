"use strict"

const nfcStatusP = document.getElementById('nfc-status');

export const ndefSyncRead = async (ndef) => {
  try {
    await ndef.scan();
    nfcStatusP.innerText = 'Sync started';

    ndef.addEventListener("readingerror", () => {
      nfcStatusP.innerText = 'Error reading data from implant/card';
    });

    ndef.addEventListener("reading", ({ nfcMessageData, serialNumber }) => {
      nfcStatusP.innerText = nfcMessageData;
    });
  } catch (error) {
    nfcStatusP.innerText = 'Error: ' + error;
  }
};