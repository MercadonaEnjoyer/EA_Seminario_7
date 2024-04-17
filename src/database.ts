import { connect } from 'mongoose'

export async function startConnection() {
    const db = await connect('mongodb://127.0.0.1:27017/dev', (err) => {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
        } else {
            console.log('Connected to Server successfully!');
        }
    });
}
