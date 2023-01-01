import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../database';
import { seedData } from '../../database/seed-data';
import { Entry } from '../../models';

type Data = {
	message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (process.env.NODE_ENV === 'production') {
		return res.status(403).json({ message: 'Forbidden' });
	}

	await db.connect();
	await Entry.deleteMany();
	await Entry.insertMany(seedData.entries);
	await db.disconnect();

	res.status(200).json({ message: 'Proceso realizado correctamente!' });
}
