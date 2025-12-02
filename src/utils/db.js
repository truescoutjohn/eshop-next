import mongoose from 'mongoose';
import { ClientPageRoot } from 'next/dist/client/components/client-page';

const connection = {};

export async function connnectDb() {
    if(connection.isConnected){
        console.log('Already connected to db');
        return;
    }
    if(mongoose.connections.length > 0){
        connection.isConnected=mongoose.connections[0].readyState
        if(connection.isConnected){
            console.log("User previous connection to db");
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    console.log("New connection to the db.");
    connection.isConnected = db.connection[0].readyState;
}