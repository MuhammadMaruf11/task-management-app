import { ReactNode } from "react";
import Button from "@/components/ui/button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children?: ReactNode;
}

export default function Modal({ isOpen, onClose, onConfirm, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <div className="mb-4 text-sm text-gray-700 dark:text-gray-200">{children}</div>
                <div className="flex justify-end space-x-2">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={onConfirm}>Confirm</Button>
                </div>
            </div>
        </div>
    );
}
