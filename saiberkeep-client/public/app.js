class App {
    ndef = undefined;
    statusText = undefined;
    constructor(ndef, statusTextElm) {
        this.ndef = ndef;
        this.statusText = statusTextElm;
    }
    sync = async () => {
        this.statusText.innerText = 'Beginning sync...';
    }
    syncRead = async () => {
        await this.ndef.scan();
    }
    syncWrite = async () => {

    }
}

export default App;