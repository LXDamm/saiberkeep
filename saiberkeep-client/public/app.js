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
    syncRead = () => {
        await this.ndef.scan();
    }
    syncWrite = () => {

    }
}