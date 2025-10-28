import AdPlaceholder from '../AdPlaceholder';

export default function AdPlaceholderExample() {
  return (
    <div className="space-y-4 p-6">
      <AdPlaceholder position="hero" />
      <AdPlaceholder position="mid" />
      <AdPlaceholder position="footer" />
    </div>
  );
}
