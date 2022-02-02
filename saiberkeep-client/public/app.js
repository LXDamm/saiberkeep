const syncToButtonElm = document.getElementById('sync-to-button');
const syncFromButtonElm = document.getElementById('sync-from-button');

const syncReadEvent = new Event('syncread');
class App {
    ndef = undefined;
    offlineData = undefined;
    syncing = false;
    constructor(ndef, textDecoder, textEncoder, decoder, encoder) {
        this.ndef = ndef;
        this.textDecoder = textDecoder;
        this.textEncoder = textEncoder;
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
        await this.ndef.scan();

        this.ndef.onreading = async ({message}) => {
            const writeMessage = {
                records: [{
                    id: 'saiber',
                    recordType: 'mime',
                    mediaType: 'application/json',
                    data: this.encoder.encode(JSON.stringify(this.offlineData))
                }]
            }
            await this.ndef.write(writeMessage);
        }
    };
}

export default App;
