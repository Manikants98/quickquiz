import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
}

const UserSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);