const syncButtonElm = document.getElementById('sync-button');
const statusTextElm = document.getElementById('nfc-status');
class App {
    ndef = undefined;
    constructor(ndef) {
        this.ndef = ndef;
    }
    run = () => {
        syncButtonElm.addEventListener('click', () => {
            this.sync();
        });
    }
    sync = async () => {
        statusTextElm.innerText = 'Beginning sync...';
    }
    syncRead = async () => {
        await this.ndef.scan();
        statusTextElm.innerText = 'Scan complete';
    }
    syncWrite = async () => {

    }
}

export default App;