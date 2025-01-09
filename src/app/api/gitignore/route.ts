import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const localTemplatesPath = path.join(process.cwd(), 'src', 'app', 'data', 'templates.json');

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

        // Initialize templates object
        let localTemplates: Record<string, string> = {};
        
        // Try to read existing templates
        try {
            const fileContent = await fs.readFile(localTemplatesPath, 'utf-8');
            localTemplates = JSON.parse(fileContent);
        } catch (error) {
            // If file doesn't exist, create directory and empty templates file
            await fs.mkdir(path.dirname(localTemplatesPath), { recursive: true });
            await fs.writeFile(localTemplatesPath, JSON.stringify({}, null, 2));
        }

        const templates = languages.map((lang: string) => localTemplates[lang] || '').filter(Boolean);
        
        if (templates.length === languages.length) {
            // All templates found locally
            return NextResponse.json({ content: templates.join('\n\n') });
        } else {
            // Missing templates, fetch from Gitignore.io
            console.log("Fetching from Gitignore.io");
            const missingLanguages = languages.filter((lang: string) => !localTemplates[lang]);
            
            try {
                const apiResponse = await axios.get(
                    `https://www.toptal.com/developers/gitignore/api/${missingLanguages.join(',')}`
                );
                
                const apiTemplate = apiResponse.data;

                // Save the new templates to local storage
                const templateSections = apiTemplate.split('\n\n');
                missingLanguages.forEach((lang: string, index: number) => {
                    localTemplates[lang] = templateSections[index] || '';
                });

                await fs.writeFile(localTemplatesPath, JSON.stringify(localTemplates, null, 2));

                // Combine and send the response
                return NextResponse.json({
                    content: [...templates, apiTemplate].join('\n\n')
                });
            } catch (apiError) {
                console.error('API Error:', apiError);
                return NextResponse.json(
                    { error: 'Error fetching from Gitignore.io API' },
                    { status: 502 }
                );
            }
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
