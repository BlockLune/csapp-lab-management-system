'use client';

import { Button } from '@radix-ui/themes';
import { useState } from 'react';
import { downloadSolutionByTeacher } from '@/scripts/api';

export default function DownloadSolution({ labId, studentId, fileName }: {labId: string, studentId: string, fileName: string}) {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        await downloadSolutionByTeacher(labId, studentId, fileName);
        setDownloading(false);
    };

    return (
        <Button 
            variant="ghost" 
            loading={downloading}
            style={{ cursor: downloading ? "not-allowed" : "pointer" }}
            disabled={downloading}
            onClick={handleDownload}
        >
            {downloading ? 'Downloading...' : `Download ${fileName}`}
        </Button>
    );
}
