import Competition from '@/Models/Competition';
import dbConnect from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const competitions = await Competition.find({});
        return NextResponse.json(competitions);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching competitions', error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const competition = new Competition(body);
        await competition.save();
        return NextResponse.json(competition, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating competition', error }, { status: 400 });
    }
}