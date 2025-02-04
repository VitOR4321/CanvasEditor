import { Canvas } from "fabric";
import { RefObject } from "react";

type Props = {
  canvasRef: RefObject<Canvas | null>;
};

export default function ExportButton(props: Props) {
  const exportToPNG = async () => {
    if (!props.canvasRef.current) return;

    const originalCanvas = props.canvasRef.current;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = 1080;
    exportCanvas.height = 1350;

    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) {
      console.error("Failed to get 2D context.");
      return;
    }

    const originalDataUrl = originalCanvas.toDataURL({
      format: "png",
      quality: 1.0,
      multiplier: 1,
    });
    const originalImage = new Image();
    originalImage.src = originalDataUrl;

    await new Promise<void>((resolve) => {
      originalImage.onload = () => {
        exportCtx.drawImage(
          originalImage,
          0,
          0,
          originalCanvas.width!,
          originalCanvas.height!,
          0,
          0,
          exportCanvas.width,
          exportCanvas.height
        );
        resolve();
      };
    });

    const dataUrl = exportCanvas.toDataURL("image/png");
    const blob = await (async () =>
      new Promise<Blob | null>((resolve) =>
        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => resolve(blob))
      ))();

    if (!blob) {
      console.error("Failed to generate PNG.");
      return;
    }

    if ("showSaveFilePicker" in window) {
      try {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: "poster.png",
          types: [
            {
              description: "PNG Image",
              accept: { "image/png": [".png"] },
            },
          ],
        });

        const writableStream = await fileHandle.createWritable();
        await writableStream.write(blob);
        await writableStream.close();
      } catch (err) {
        console.error("File save cancelled or failed:", err);
      }
    } else {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "poster.png";
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };

  return (
    <button
      onClick={exportToPNG}
      className="bg-[#7209B7] text-white px-4 py-2 rounded hover:bg-purple-600 transition"
    >
      Export to PNG
    </button>
  );
}
