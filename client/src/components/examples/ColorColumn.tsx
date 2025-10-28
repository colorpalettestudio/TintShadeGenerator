import ColorColumn from '../ColorColumn';

export default function ColorColumnExample() {
  return (
    <div className="p-6">
      <ColorColumn
        id="example-1"
        color="#FF6F61"
        name="Coral Red"
        onRemove={(id) => console.log("Remove:", id)}
        onRename={(id, name) => console.log("Rename:", id, name)}
      />
    </div>
  );
}
