const syncButtonElm = document.getElementById('sync-button');

const syncReadEvent = new Event('syncread');
class App {
    ndef = undefined;
    records = [];
    syncing = false;
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
        document.addEventListener('syncread', () => {
            this.setText('Records read and saved');
            this.records.forEach(record => {
                console.log(record);
            });
        });
    };
    syncRead = async () => {
        this.syncing = true;
        await this.ndef.scan();
        this.ndef.addEventListener('readingerror', () => {
            this.setText('Error reading data from implant/card');
            this.syncing = false;
        });
        this.ndef.addEventListener('reading', ({ message, serialNumber }) => {
            this.setText('NDEF data found, reading records...');
            if (message.records.length) {
                message.records.forEach((record) => {
                    if (record.recordType === 'text') {
                        this.records.push(this.textDecoder.decode(record.data));
                    }
                });
                document.dispatchEvent(syncReadEvent);
            } else {
                this.setText('Zero NDEF records on implant/card');
            }
            this.syncing = false;
        });
    };
    syncWrite = async () => {};
}

export default App;
