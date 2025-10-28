import ColorInput from '../ColorInput';

export default function ColorInputExample() {
  return (
    <div className="p-6">
      <ColorInput 
        onTestPalette={(colors) => console.log("Test palette:", colors)} 
        onClear={() => console.log("Clear")}
        currentColors={["#FF6F61", "#6B5B95", "#88B04B"]}
      />
    </div>
  );
}
