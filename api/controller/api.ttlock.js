const noble = require('@abandonware/noble');

const SMART_LOCK_MAC = '22:B5:38:AF:CD:9E';
let connectedPeripheral = null;

const connectToLock = async () => {
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

const sendCommand = async (req, res, command) => {
    if (!connectedPeripheral) await connectToLock();

    const { characteristics } = await connectedPeripheral.discoverSomeServicesAndCharacteristicsAsync([], []);

    const controlChar = characteristics.find(c => c.properties.includes('write'));
    if (!controlChar) res.status(500).json({ error: 'Control characteristic not found' });

    await controlChar.writeAsync(Buffer.from(command), false);
    console.log('Command sent:', command);

    return res.status(200).json({ message: `Command ${command} sent successfully` });
}

module.exports = { sendCommand };
