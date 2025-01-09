import { NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

const localTemplatesPath = path.join(process.cwd(), 'src', 'data', 'templates.json');

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

        // Check which languages we need to fetch
        const missingLanguages = languages.filter(lang => !localTemplates[lang]);
        
        // If we have missing languages, fetch them from the API
        if (missingLanguages.length > 0) {
            try {
                console.log("Fetching from Gitignore.io:", missingLanguages);
                const apiResponse = await axios.get(
                    `https://www.toptal.com/developers/gitignore/api/${missingLanguages.join(',')}`
                );
                
                const fullTemplate = apiResponse.data;

                // Split the template by the standard gitignore header pattern
                const templateParts = fullTemplate.split(/# Created by https:\/\/www\.toptal\.com\/developers\/gitignore\/api\/[^\n]+\n/);
                const headers = fullTemplate.match(/# Created by https:\/\/www\.toptal\.com\/developers\/gitignore\/api\/[^\n]+\n/g) || [];
                
                // Process each language's template
                missingLanguages.forEach((lang, index) => {
                    // Find the corresponding section for this language
                    const header = headers[index] || '';
                    const content = templateParts[index + 1] || '';
                    
                    // Store the complete template for this language
                    localTemplates[lang] = content.trim();
                });

                // Save updated templates
                await fs.writeFile(localTemplatesPath, JSON.stringify(localTemplates, null, 2));
            } catch (apiError) {
                console.error('API Error:', apiError);
                return NextResponse.json(
                    { error: 'Error fetching from Gitignore.io API' },
                    { status: 502 }
                );
            }
        }

        // Combine templates for all requested languages
        const combinedTemplate = languages
            .map(lang => {
                const template = localTemplates[lang];
                if (template) {
                    return `### ${lang.toUpperCase()} ###\n${template}\n`;
                }
                return '';
            })
            .filter(Boolean)
            .join('\n');

        return NextResponse.json({ content: combinedTemplate });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}