import { useState } from 'react';
import BulkImportModal from '../BulkImportModal';
import { Button } from '@/components/ui/button';

export default function BulkImportModalExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Bulk Import</Button>
      <BulkImportModal
        open={open}
        onOpenChange={setOpen}
        onImport={(colors) => console.log("Imported:", colors)}
      />
    </div>
  );
}
