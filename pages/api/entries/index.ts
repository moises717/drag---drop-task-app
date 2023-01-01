import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = { message: string } | IEntry[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getEntries(res);

		case 'POST':
			return addEntry(req, res);
	}

	res.status(400).json({ message: 'Not found' });
}

const getEntries = async (res: NextApiResponse<Data>) => {
	await db.connect();

	const entries = await Entry.find({}).sort({ createdAt: -1 });

	await db.disconnect();

	res.status(200).json(entries);
};

const addEntry = async (req: NextApiRequest, res: NextApiResponse) => {
	const newEntry = new Entry({
		description: req.body.description,
		status: req.body.status,
		createdAt: new Date(),
	});

	try {
		await db.connect();
		await newEntry.save();
		await db.disconnect();
		res.status(201).json(newEntry);
	} catch (error) {
		await db.disconnect();
		res.status(400).json({ message: 'Failed to create entry' });
	}
};
