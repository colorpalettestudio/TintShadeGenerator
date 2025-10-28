import ColorTableRow from '../ColorTableRow';

export default function ColorTableRowExample() {
  return (
    <div className="p-6">
      <ColorTableRow
        id="example-1"
        color="#FF6F61"
        name="Coral Red"
        onRemove={(id) => console.log("Remove:", id)}
        onRename={(id, name) => console.log("Rename:", id, name)}
        tintSteps={[50, 40, 30, 20, 10, 0, -10, -20, -30, -40, -50]}
      />
    </div>
  );
}
