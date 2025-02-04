import * as fabric from 'fabric'

export class TextboxActions extends fabric.Textbox {
    buttons: { color: string; offsetX: number }[];

    constructor(text: string, options: any) {
      super(text, options);
      this.set({ hasControls: true });

      this.buttons = [
        { color: "white", offsetX: -150 },
        { color: "black", offsetX: -120 },
        { color: "red", offsetX: -90 },
        { color: "blue", offsetX: -60 },
        { color: "green", offsetX: -30 },
      ];
    }

    _render(ctx: CanvasRenderingContext2D) {
      super._render(ctx);

      const btnSize = 10;
      this.buttons.forEach((btn) => {
        ctx.fillStyle = btn.color;
        ctx.beginPath();
        ctx.arc(this.width / 2 + btn.offsetX, this.height + 10, btnSize, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    handleColorChange(event: fabric.TEvent) {
      const pointer = this.canvas!.getPointer(event.e);
      const x = pointer.x - this.left!;
      const y = pointer.y - this.top!;

      this.buttons.forEach((btn) => {
        const btnX = this.width! / 2 + btn.offsetX;
        const btnY = this.height! + 10;

        if (Math.abs(x - btnX) < 10 && Math.abs(y - btnY) < 10) {
          this.set("fill", btn.color);
          this.canvas!.renderAll();
        }
      });
    }
  }