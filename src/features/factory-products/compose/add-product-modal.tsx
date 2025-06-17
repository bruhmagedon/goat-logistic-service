import { Dialog, DialogContent } from '@/shared/ui/kit/dialog';
import { AddProductForm } from './add-product-form';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[850px] p-0" showCloseButton={false}>
        <AddProductForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
