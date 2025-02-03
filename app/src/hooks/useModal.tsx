import React, { useState, useImperativeHandle, useRef, ReactElement } from "react";


export type ModalProps = {
    children?: null | ReactElement | ReactElement[];
    width?: number | string | undefined;
    onCancel?: () => void;
    onOk?: () => void;
}

export const useModal = (r?:any) => {

    const ref: any = useRef(r);
    const open = () => ref.current?.setIsOpen(true);
    const close = () => ref.current?.setIsOpen(false);

    return [ref, open, close]
}

export const Modal = React.forwardRef((props: ModalProps, ref: any) => {

    const [isOpen, setIsOpen] = useState(false);

    const setOpen = (open: boolean) => setIsOpen(open);

    useImperativeHandle(ref, () => ({
        isOpen,
        setIsOpen,
    }))

    const handleClose = () => {
        setOpen(false);
        props.onCancel && props.onCancel();
    }

    const handleOk = () => {
        props.onOk && props.onOk()
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <div>{props.children}</div>
                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={handleClose} className="bg-gray-400 text-white p-2 rounded">
                        Anuluj
                    </button>
                    <button onClick={handleOk} className="bg-blue-500 text-white p-2 rounded">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
})
