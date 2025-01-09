import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  content: string;
  filename?: string;
}

export function DownloadButton({ content, filename = '.gitignore' }: DownloadButtonProps) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button 
      onClick={handleDownload}
      variant="outline"
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Download .gitignore
    </Button>
  );
} 