import mongoose, { Model } from 'mongoose';
import { Entry } from '../interfaces';

export interface IEntry extends Entry {}

const EntrySchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Number,
	},
	status: {
		type: String,
		enum: {
			values: ['pending', 'completed', 'in-progress'],
			message: '{VALUE} is not allowed',
		},
		default: 'pending',
	},
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', EntrySchema);

export default EntryModel;
