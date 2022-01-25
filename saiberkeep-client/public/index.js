"use strict"

const nfcStatusP = document.getElementById('nfc-status');

const ndefInit = async (ndef) => {

}

const ndefSyncRead = async (ndef) => {
  try {
    await ndef.scan();
    nfcStatusP.innerText = 'Sync read started...';

    ndef.addEventListener("readingerror", () => {
      nfcStatusP.innerText = 'Error reading data from implant/card';
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      nfcStatusP.innerText = 'Reading records...';
      message.records.forEach(record => {
        if (record.recordType === 'text') {
          const textDecoder = new TextDecoder(record.encoding);

        }
      });
      html = html + '</ul>';
      nfcStatusP.innerHTML = html;
    });
  } catch (error) {
    nfcStatusP.innerText = 'Error: ' + error;
  }
};

export { ndefInit, ndefSyncRead };