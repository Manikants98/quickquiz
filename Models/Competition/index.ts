import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICompetition extends Document {
    name: string;
    date: string;
    location: string;
    status: 'Active' | 'Inactive'
}

const competitionSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive',],
        required: true,
    },
});

const Competition: Model<ICompetition> = mongoose.models.Competition || mongoose.model<ICompetition>('Competition', competitionSchema);

export default Competition;