const syncToButtonElm = document.getElementById('sync-to-button');
const syncFromButtonElm = document.getElementById('sync-from-button');

class App {
    ndef = undefined;
    constructor(ndef, decoder, encoder) {
        this.ndef = ndef;
        this.decoder = decoder;
        this.encoder = encoder;
        this.offlineData = { items: [{text}] };
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
