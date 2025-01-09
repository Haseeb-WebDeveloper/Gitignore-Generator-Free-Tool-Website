'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function GitignorePage() {
    const [languages, setLanguages] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!languages.trim()) {
            alert('Please enter at least one language');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/gitignore', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ languages: languages.split(',').map(lang => lang.trim()) })
            });

            const data = await res.json();
            if (data.content) {
                setResult(data.content);
            } else {
                alert('Error fetching .gitignore');
            }
        } catch (error) {
            alert('Failed to generate .gitignore');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6 text-center">Gitignore Generator</h1>
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">
                        Enter languages or frameworks (comma-separated):
                    </label>
                    <input
                        type="text"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        placeholder="e.g., node, python, react"
                        className="w-full p-2 border rounded-md bg-background"
                    />
                </div>
                
                <Button 
                    onClick={handleSubmit} 
                    disabled={isLoading}
                    className="w-full"
                >
                    {isLoading ? 'Generating...' : 'Generate .gitignore'}
                </Button>

                {result && (
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Your .gitignore file:</h2>
                        <div className="relative">
                            <textarea
                                value={result}
                                readOnly
                                rows={20}
                                className="w-full p-4 font-mono text-sm bg-muted rounded-md"
                            />
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(result);
                                    alert('Copied to clipboard!');
                                }}
                                className="absolute top-2 right-2"
                                variant="secondary"
                            >
                                Copy
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
