import Competition from '@/Models/Competition';
import dbConnect from '@/utils/mongoose';
import { NextResponse } from 'next/server';


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const body = await req.json();
        const competition = await Competition.findByIdAndUpdate(params.id, body, { new: true });
        if (!competition) {
            return NextResponse.json({ message: 'Competition not found' }, { status: 404 });
        }
        return NextResponse.json(competition);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating competition', error }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const competition = await Competition.findByIdAndDelete(params.id);
        if (!competition) {
            return NextResponse.json({ message: 'Competition not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Competition deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting competition', error }, { status: 400 });
    }
}