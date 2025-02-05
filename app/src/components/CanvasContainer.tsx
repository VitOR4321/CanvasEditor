import { Canvas } from "fabric";
import { forwardRef, RefObject } from "react";
import info from "../assets/info.png";

type Props = {
  canvasRef: RefObject<Canvas | null>;
};

const CanvasContainer = forwardRef<HTMLDivElement, Props>(
  (props: Props, ref) => {
    const hasElements =
      props.canvasRef.current &&
      props.canvasRef.current.getObjects().length > 0;

    return (
      <div
        ref={ref}
        className={`border shadow-lg w-[600px] h-[800px]`}
        style={{
          backgroundImage: !hasElements ? `url(${info})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <canvas id="canvas" className={`w-full h-full`} />
      </div>
    );
  }
);

export default CanvasContainer;
