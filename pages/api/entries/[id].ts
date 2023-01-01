import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Entry } from '../../../models';

type Data = {
	message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { id } = req.query;

	if (!mongoose.isValidObjectId(id)) {
		return res.status(400).json({ message: 'Invalid id' });
	}

	switch (req.method) {
		case 'PUT':
			return updateEntry(req, res, id as string);
		case 'GET':
			return getEntry(req, res, id as string);
		case 'DELETE':
			return deleteEntry(req, res, id as string);

		default:
			res.status(200).json({ message: 'Method not allowed' });
	}
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	await db.connect();

	const entry = await Entry.findById(id);

	if (!entry) {
		await db.disconnect();
		return res.status(400).json({ message: 'Entry not found' });
	}

	const { description = entry.description, status = entry.status } = req.body;

	try {
		const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { new: true, runValidators: true });
		await db.disconnect();
		res.status(200).json(updatedEntry);
	} catch (error: any) {
		await db.disconnect();
		return res.status(400).json({ message: error.errors.status });
	}
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	await db.connect();

	const entry = await Entry.findById(id);

	if (!entry) {
		await db.disconnect();
		return res.status(400).json({ message: 'Entry not found' });
	}

	await db.disconnect();

	res.status(200).json(entry);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
	try {
		await db.connect();
		const entry = await Entry.findById(id);

		if (!entry) {
			await db.disconnect();
			return res.status(400).json({ message: 'Entry not found' });
		}

		await Entry.findByIdAndDelete(id);
		await db.disconnect();

		res.status(200).json({ message: 'Entry deleted' });
	} catch (error) {
		await db.disconnect();
		return res.status(400).json({ message: 'Something went wrong' });
	}
};
