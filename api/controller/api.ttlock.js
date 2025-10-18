const noble = require('@abandonware/noble');

const SMART_LOCK_MAC = '2C:CF:67:73:AE:D7';
let connectedPeripheral = null;

async function connectToLock() {
    return new Promise((resolve, reject) => {
        noble.on('stateChange', async (state) => {
            if (state === 'poweredOn') {
                noble.startScanningAsync([], false);
            } else {
                noble.stopScanningAsync();
            }
        });

        noble.on('discover', async (peripheral) => {
            if (peripheral.address === SMART_LOCK_MAC.toLowerCase()) {
                noble.stopScanningAsync();
                connectedPeripheral = peripheral;
                await peripheral.connectAsync();
                console.log('Connected to lock');
                resolve(peripheral);
            }
        });

        setTimeout(() => reject(new Error('Timeout connecting to lock')), 15000);
    });
}

async function sendCommand(command) {
    if (!connectedPeripheral) await connectToLock();

    const { characteristics } = await connectedPeripheral.discoverSomeServicesAndCharacteristicsAsync([], []);

    const controlChar = characteristics.find(c => c.properties.includes('write'));
    if (!controlChar) throw new Error('No writable characteristic found');

    await controlChar.writeAsync(Buffer.from(command), false);
    console.log('Command sent:', command);
}

module.exports = { connectToLock, sendCommand };
