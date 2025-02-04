import React, {
  useState,
  useImperativeHandle,
  useRef,
  ReactElement,
} from "react";
import close from "../assets/close.svg";

export type ModalProps = {
  children?: null | ReactElement | ReactElement[];
  width?: number | string | undefined;
  onCancel?: () => void;
  onOk?: () => void;
};

export const useModal = (r?: any) => {
  const ref: any = useRef(r);
  const open = () => ref.current?.setIsOpen(true);
  const close = () => ref.current?.setIsOpen(false);

  return [ref, open, close];
};

export const Modal = React.forwardRef((props: ModalProps, ref: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = (open: boolean) => setIsOpen(open);

  useImperativeHandle(ref, () => ({
    isOpen,
    setIsOpen,
  }));

  const handleClose = () => {
    setOpen(false);
    props.onCancel && props.onCancel();
  };

  const handleOk = () => {
    props.onOk && props.onOk();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-[400px] w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <img src={close} alt="close" className="w-5 h-5" />
        </button>

        {props.children}

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-none text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleOk}
            className="px-4 py-2 bg-[#7209B7] text-white rounded hover:bg-purple-600 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
});
