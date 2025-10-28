import ColorInput from '../ColorInput';

export default function ColorInputExample() {
  return (
    <div className="p-6 max-w-2xl">
      <ColorInput onAddColor={(color) => console.log("Color added:", color)} />
    </div>
  );
}
