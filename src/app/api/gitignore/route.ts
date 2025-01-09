import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios'; // Import axios to fix the missing reference

const templatesPath = path.join(process.cwd(), 'src', 'data', 'templates');

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

        const templates: string[] = [];

        for (const lang of languages) {
            const filePath = path.join(templatesPath, `${lang.trim().toLowerCase()}.gitignore`);
            try {
                const templateContent = await fs.readFile(filePath, 'utf-8');
                templates.push(`# ${lang.toUpperCase()}\n${templateContent}`);
            } catch (err) {
                console.warn(`Template for "${lang}" not found.`);
            }
        }

        if (templates.length === 0) {
            const localTemplatesPath = path.join(process.cwd(), 'src', 'data', 'templates.json');

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

            const localTemplatesArray = languages.map((lang: string) => localTemplates[lang] || '').filter(Boolean);
            
            if (localTemplatesArray.length === languages.length) {
                // All templates found locally
                return NextResponse.json({ content: localTemplatesArray.join('\n\n') });
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
                        content: [...localTemplatesArray, apiTemplate].join('\n\n')
                    });
                } catch (apiError) {
                    console.error('API Error:', apiError);
                    return NextResponse.json(
                        { error: 'Error fetching from Gitignore.io API' },
                        { status: 502 }
                    );
                }
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
