import Subject from '@/Models/Subject';
import dbConnect from '@/utils/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const subjects = await Subject.find().populate('competition');
        return NextResponse.json(subjects);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching subjects', error }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const newSubject = new Subject(body);
        await newSubject.save();
        return NextResponse.json(newSubject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating subject', error }, { status: 400 });
    }
}