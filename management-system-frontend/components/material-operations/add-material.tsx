'use client';

import { Button } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { uploadMaterial } from "@/scripts/api";

export default function AddMaterial({ labId, onAdd }: { labId: string, onAdd: () => void }) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setUploading(true);

        for (const file of selectedFiles) {
            await uploadMaterial(labId, file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        setUploading(false);
        onAdd();
    };

    return (
        <>
            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <Button 
                disabled={uploading}
                onClick={handleClick}
                style={{ cursor: uploading ? "not-allowed" : "pointer" }}
            >
                {uploading ? 'Uploading...' : 'Add Material'}
            </Button>
        </>
    );
}
