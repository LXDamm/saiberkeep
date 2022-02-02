const syncToButtonElm = document.getElementById('sync-to-button');
const syncFromButtonElm = document.getElementById('sync-from-button');

const syncReadEvent = new Event('syncread');
class App {
    ndef = undefined;
    records = [];
    syncing = false;
    constructor(ndef, textDecoder, textEncoder, decoder, encoder) {
        this.ndef = ndef;
        this.textDecoder = textDecoder;
        this.textEncoder = textEncoder;
        this.decoder = decoder;
        this.encoder = encoder;
    }
    setText = (text) => {
        const statusTextElm = document.getElementById('status');
        statusTextElm.innerText = text;
    };
    run = () => {
        syncToButtonElm.addEventListener('click', () => {
            this.syncWrite();
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
                        localStorage.setItem('records', JSON.stringify(this.records));
                    } else if (record.recordType === 'mime') {
                        if (this.records.mediaType === 'application/json') {
                            console.log(JSON.parse(this.decoder.decode(record.data)));
                        }
                    }
                });
                document.dispatchEvent(syncReadEvent);
            } else {
                this.setText('Zero NDEF records on implant/card');
            }
            this.syncing = false;
        });
    };
    syncWrite = async () => {
        await this.ndef.scan();

        this.ndef.onreading = async ({message}) => {
            const message = {
                records: [{
                    id: 'saiber',
                    recordType: 'mime',
                    mediaType: 'application/json',
                    data: this.encoder.encode(JSON.stringify(offlineData));
                    }]
            }
            await this.ndef.write(message);
        }
    };
}

export default App;
