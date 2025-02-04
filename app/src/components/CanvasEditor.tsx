import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { Modal, useModal } from "../hooks/useModal";
import logo from "../assets/logo.svg";
import reset from "../assets/reset.svg";
import text from "../assets/text.svg";
import img from "../assets/img.svg";
import alert from "../assets/alert.svg";
import background from "../assets/background.svg";
import EditorActionButton from "./EditorActionButton";
import CanvasContainer from "./CanvasContainer";
import ExportButton from "./ExportButton";

const CanvasEditor = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasContainer = useRef<HTMLDivElement | null>(null);

  const [modalRef, open, close] = useModal();

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 600,
      height: 800,
      backgroundColor: "#9B9B9B",
    });

    canvasRef.current = canvas;
    return () => {
      canvas.dispose();
    };
  }, []);

  const addText = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const text = new fabric.Textbox("Type your text here", {
      fontSize: 24,
      fill: "#000",
      editable: true,
      left: 200,
      top: 200,
      width: 200,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const addBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvasRef.current || !e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imgElement = new Image();
      imgElement.src = event.target?.result as string;

      imgElement.onload = () => {
        const canvas = canvasRef.current;
        const img = new fabric.Image(imgElement, {
          selectable: false,
          evented: false,
        });

        const scaleX = canvas?.width! / img.width!;
        const scaleY = canvas?.height! / img.height!;
        img.scaleX = scaleX;
        img.scaleY = scaleY;

        canvas?.clear();
        canvas?.add(img);
      };
    };

    reader.readAsDataURL(file);
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvasRef.current || !e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imgElement = new Image();
      imgElement.src = event.target?.result as string;

      imgElement.onload = () => {
        const img = new fabric.Image(imgElement, {
          left: 100,
          top: 100,
          selectable: true,
          hasControls: true,
        });

        img.scaleToWidth(200);
        img.scaleToHeight(200);

        canvasRef.current?.add(img);
        canvasRef.current?.setActiveObject(img);
      };
    };

    reader.readAsDataURL(file);
  };

  const resetCanvas = () => {
    if (!canvasRef.current) return;
    canvasRef.current.clear();
    close();
  };

  return (
    <>
      <Modal ref={modalRef} onCancel={close} onOk={resetCanvas}>
        <div className="flex flex-col items-center">
          <div className="text-red-500 text-6xl mb-4">
            <img src={alert} alt="alert" className="w-16 h-16" />
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-2">WARNING</h1>

          <p className="text-center text-gray-600">
            You’re about to reset the whole process. Are you sure you want to do
            it?
          </p>
        </div>
      </Modal>
      <div className="flex gap-4 p-4 ">
        <CanvasContainer canvasRef={canvasRef} ref={canvasContainer} />
        <div className="flex flex-col gap-4 p-4 w-80">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-8 h-8" />
              <h2 className="text-2xl font-bold text-gray-700">CanvasEditor</h2>
            </div>
            <button
              onClick={open}
              className="flex items-center gap-2 text-red-500 font-semibold group"
            >
              <span className="group-hover:underline">Reset</span>
              <img
                src={reset}
                alt="reset"
                className="w-4 h-4 text-red-500 group-hover:underline"
              />
            </button>
          </div>

          <div className="mb-4 bg-gray-100 w-full p-3 rounded-md">
            <h3 className="text-lg font-semibold ">Add content</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <EditorActionButton onClick={addText} icon={text} label="Text" />
            <EditorActionButton
              onFileChange={addImage}
              icon={img}
              label="Image"
            />
            <EditorActionButton
              onFileChange={addBackgroundImage}
              icon={background}
              label="Background"
            />
          </div>

          <div className="border-t mt-4 pt-4 flex justify-end">
            <ExportButton canvasRef={canvasRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CanvasEditor;
