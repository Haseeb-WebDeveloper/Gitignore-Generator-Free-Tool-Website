'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DownloadButton } from "@/components/ui/download-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function GitignorePage() {
    const [languages, setLanguages] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!languages.trim()) {
            toast.error('Please enter at least one language');
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
                toast.success('Generated successfully!');
            } else {
                toast.error(data.error || 'Error fetching .gitignore');
            }
        } catch (error) {
            toast.error('Failed to generate .gitignore');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl padding">
            <Card className="mb-8 bg-foreground/[0.03]">
                <CardHeader>
                    <CardTitle className="text-center">
                        <h1 className="text-4xl font-bold">Gitignore Generator</h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            Generate .gitignore files for your projects instantly
                        </p>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Enter languages or frameworks (comma-separated)
                        </label>
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={languages}
                                onChange={(e) => setLanguages(e.target.value)}
                                placeholder="e.g., node, python, react"
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button 
                                onClick={handleSubmit} 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    'Generate'
                                )}
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Popular: node, python, react, nextjs, java, go
                        </p>
                    </div>
                </CardContent>
            </Card>

            {result && (
                <Card>
                    <CardHeader className="flex flex-col md:flex-row gap-4 items-center justify-between space-y-0 pb-2">
                        <CardTitle>Your .gitignore file</CardTitle>
                        <DownloadButton content={result} />
                    </CardHeader>
                    <CardContent>
                        <div className="relative rounded-md bg-muted mt-2 md:mt-0">
                            <pre className="overflow-x-auto p-4 text-sm">
                                <code>{result}</code>
                            </pre>
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(result);
                                    toast.success('Copied to clipboard!');
                                }}
                                variant="outline"
                                className="absolute right-2 top-2"
                            >
                                Copy
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
