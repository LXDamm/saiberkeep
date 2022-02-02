const syncToButton = document.getElementById('sync-to-button');
const syncFromButton = document.getElementById('sync-from-button');
const initButton = document.getElementById('init-button');

class App {
    ndef = undefined;
    decoder = undefined;
    encoder = undefined;
    offlineData = undefined;
    constructor(ndef, decoder, encoder) {
        this.ndef = ndef;
        this.decoder = decoder;
        this.encoder = encoder;
    }
    initialize = () => {
        this.offlineData = localStorage.getItem('saiberkeep-offline-data');
        initButton.addEventListener('click', () => {
            this.offlineData = { items: [{title: 'First', text: 'My first note'}]};
            this.renderList();
        });
        syncToButton.addEventListener('click', () => {
            this.syncWrite();
        });
        syncFromButton.addEventListener('click', () => {
            this.syncRead();
        });
    };
    setText = (text) => {
        const nfcStatus = document.getElementById('nfc-status');
        nfcStatus.innerText = text;
    };
    syncRead = async () => {
        await this.ndef.scan();
        this.setText('Starting scan, waiting for chip');
        this.ndef.onreading = async ({message}) => {
            this.setText('Chip read');
            message.records.forEach(record => {
                if (record.recordType === 'mime' && record.mediaType === 'application/json') {
                    this.offlineData = JSON.parse(this.decoder.decode(record.data));
                    localStorage.setItem('saiberkeep-offline-data', this.offlineData);
                }
            });
        }
    };
    syncWrite = async () => {
        await this.ndef.scan();
        this.setText('Starting scan, waiting for chip');
        this.ndef.onreading = async ({message}) => {
            const writeMessage = {
                records: [{
                    id: 'saiber',
                    recordType: 'mime',
                    mediaType: 'application/json',
                    data: this.encoder.encode(JSON.stringify({'text': 'Saiberkeep data'}))
                }]
            }
            await this.ndef.write(writeMessage);
            this.setText('Write complete');
        }
    };
    renderList = () => {
        const offlineList = document.getElementById('offline-list');
        let html = '';
        this.offlineData.items.forEach((item) => {
            html = html + '<li>' + item.title + '</li>';
        });
        offlineList.innerHTML = html;
    };
}

export default App;
