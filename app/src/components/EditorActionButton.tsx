type Props = {
  onClick?: () => void;
  icon: string;
  label: string;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EditorActionButton(props: Props) {
  return (
    <div className="relative">
      <button
        onClick={props.onClick}
        className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md w-32 h-32 p-4 transition"
      >
        <div className="w-12 h-12 flex items-center justify-center text-gray-500">
          <img src={props.icon} alt={props.label} className="w-8 h-8" />
        </div>
        <span className="mt-2 text-sm font-medium text-gray-600">
          {props.label}
        </span>
      </button>
      {props.onFileChange && (
        <input
          type="file"
          accept="image/*"
          onChange={props.onFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      )}
    </div>
  );
}
