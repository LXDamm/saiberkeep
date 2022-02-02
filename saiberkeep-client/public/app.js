const syncToButton = document.getElementById('sync-to-button');

class App {
    ndef = undefined;
    decoder = undefined;
    encoder = undefined;
    offlineData = undefined;
    constructor(ndef, decoder, encoder) {
        this.ndef = ndef;
        this.decoder = decoder;
        this.encoder = encoder;
        this.offlineData = { items: [{text}] };
    }
    setText = (text) => {
        const nfcStatus = document.getElementById('nfc-status');
        nfcStatus.innerText = text;
    };
    run = () => {
        syncToButton.addEventListener('click', () => {
            this.syncWrite();
        });
    };
    syncRead = async () => {
    };
    syncWrite = async () => {
        this.setText('Starting scan, waiting for chip');
        await this.ndef.scan();
        this.setText('Scan complete, writing to chip');
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
}

export default App;
