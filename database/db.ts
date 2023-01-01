import mongoose, { mongo } from 'mongoose';

// mongoose status codes
/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
	isConnected: 0,
};

export const connect = async () => {
	if (mongoConnection.isConnected !== 0) {
		console.log('=> using existing database connection');
		return;
	}

	if (mongoose.connections.length > 0) {
		mongoConnection.isConnected = mongoose.connections[0].readyState;

		if (mongoConnection.isConnected !== 0) {
			console.log('=> using existing database connection');
			return;
		}

		await mongoose.disconnect();
	}

	mongoose.set('strictQuery', false);
	await mongoose.connect(process.env.MONGO_URI || '');
	mongoConnection.isConnected = 1;

	console.log(`=> created new database connection`);
};

export const disconnect = async () => {
	if (process.env.NODE_ENV === 'development') return;

	if (mongoConnection.isConnected === 0) return;

	await mongoose.disconnect();
	mongoConnection.isConnected = 0;
	console.log('=> database connection closed');
};
