const syncButtonElm = document.getElementById('sync-button');
class App {
    ndef = undefined;
    records = [];
    constructor(ndef, textDecoder) {
        this.ndef = ndef;
        this.textDecoder = textDecoder;
    }
    setText = (text) => {
        const statusTextElm = document.getElementById('nfc-status');
        statusTextElm.innerText = text;
    };
    run = () => {
        syncButtonElm.addEventListener('click', () => {
            this.sync();
        });
    };
    sync = async () => {
        this.setText('Beginning sync...');
        this.syncRead();
    };
    syncRead = async () => {
        await this.ndef.scan();
        this.ndef.addEventListener('readingerror', () => {
            this.setText('Error reading data from implant/card');
        });
        this.ndef.addEventListener('reading', ({ message, serialNumber }) => {
            this.setText('NDEF data found, reading records...');
            if (message.records.length) {
                message.records.forEach((record) => {
                    if (record.recordType === 'text') {
                        this.records.push(this.textDecoder.decode(record.data));
                    }
                });
            } else {
                this.setText('Zero NDEF records on implant/card');
            }
        });
    };
    syncWrite = async () => {};
}

export default App;
