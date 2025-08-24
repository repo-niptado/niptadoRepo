import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/Button/page';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    backdrop?: boolean | 'static';
    keyboard?: boolean;
    scrollable?: boolean;
}

const getModalSizeClass = (size: ModalProps['size'] = 'md') => {
    switch (size) {
        case 'sm':
            return 'max-w-sm';
        case 'lg':
            return 'max-w-4xl';
        case 'xl':
            return 'max-w-6xl';
        default:
            return 'max-w-2xl';
    }
};

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    backdrop = true,
    keyboard = true,
    scrollable = false,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (keyboard && event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, keyboard, onClose]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                backdrop === true &&
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen && backdrop !== 'static') {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            if (backdrop !== 'static') {
                document.removeEventListener('mousedown', handleClickOutside);
            }
        };
    }, [isOpen, onClose, backdrop]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                ref={modalRef}
                className={`bg-white rounded-lg shadow-xl w-full ${getModalSizeClass(size)} ${scrollable ? 'overflow-y-auto max-h-[90vh]' : ''}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <Button variant="ghost" onClick={onClose}>
                        ✕
                    </Button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
