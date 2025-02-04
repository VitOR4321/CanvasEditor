import { useEffect, useRef } from "react";
import * as fabric from 'fabric'
import html2canvas from "html2canvas";
import { Modal, useModal } from "../hooks/useModal";
import { TextboxActions } from "./TextboxActions";

const CanvasEditor = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const canvasContainer = useRef<HTMLDivElement | null>(null);

  const [modalRef, open, close] = useModal();

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 600,
      height: 800,
      backgroundColor: "#fff",
    });


    canvas.on("mouse:down", (event) => {
      const target = event.target as any;
      if (target && target.handleColorChange) {
        target.handleColorChange(event);
      }
    });


    canvasRef.current = canvas;
    return () => {
      canvas.dispose();
    };
  }, []);

  

  const addText = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const text = new TextboxActions("Type your text here", {
      fontSize: 24,
      fill: "#000",
      editable: true,
      left: 200,
      top: 200,
      width: 200
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
    close()
  };

  const exportToPNG = async () => {
    if (!canvasContainer.current) return;
    const canvasElement = canvasContainer.current;
    const canvasImage = await html2canvas(canvasElement, {
      width: 1080,
      height: 1350,
      scale: 1,
    });

    const link = document.createElement("a");
    link.href = canvasImage.toDataURL("image/png");
    link.download = "canvas-export.png";
    link.click();
  };

  return (
    <>
      <Modal
        ref={modalRef}
        onCancel={close}
        onOk={resetCanvas}>
        <h1>Czy na pewno chcesz zresetować aktualny postęp?</h1>
      </Modal>
      <div className="flex gap-4 p-4">
        <div ref={canvasContainer} className="border shadow-lg w-[600px] h-[800px] bg-white">
          <canvas id="canvas" className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-4 p-4 border bg-gray-100 w-80">
          <button onClick={addText} className="bg-blue-500 text-white p-2 rounded">Dodaj Tekst</button>

          <label className="bg-gray-300 p-2 rounded cursor-pointer text-center">
            Dodaj Tło
            <input type="file" accept="image/*" onChange={addBackgroundImage} className="hidden" />
          </label>

          <label className="bg-gray-300 p-2 rounded cursor-pointer text-center">
            Dodaj Obrazek
            <input type="file" accept="image/*" onChange={addImage} className="hidden" />
          </label>
          <button
            onClick={open}
            className="bg-red-500 text-white p-2 rounded"
          >
            Resetuj
          </button>
          <button onClick={exportToPNG} className="bg-purple-500 text-white p-2 rounded">Eksportuj do PNG</button>
        </div>
      </div>
    </>
  );
};

export default CanvasEditor;
