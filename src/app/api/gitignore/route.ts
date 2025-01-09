import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { languages }: { languages: string[] } = await req.json();
        console.log('Requested languages:', languages);

        if (!Array.isArray(languages) || languages.length === 0) {
            return NextResponse.json(
                { error: 'Invalid input: languages must be a non-empty array' },
                { status: 400 }
            );
        }

        try {
            console.log("Fetching from Gitignore.io:", languages);
            const apiResponse = await axios.get(
                `https://www.toptal.com/developers/gitignore/api/${languages.join(',')}`
            );
            
            // Return the API response directly
            return NextResponse.json({ 
                content: apiResponse.data 
            });

        } catch (apiError) {
            console.error('API Error:', apiError);
            return NextResponse.json(
                { error: 'Error fetching from Gitignore.io API' },
                { status: 502 }
            );
        }

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}