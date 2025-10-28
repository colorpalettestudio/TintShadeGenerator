interface AdPlaceholderProps {
  position: "hero" | "mid" | "footer";
}

export default function AdPlaceholder({ position }: AdPlaceholderProps) {
  return (
    <div 
      className="w-full h-[250px] md:h-[120px] flex items-center justify-center bg-muted/30 border border-dashed rounded-lg"
      data-testid={`ad-placeholder-${position}`}
    >
      <p className="text-sm text-muted-foreground">Ad Placeholder - {position}</p>
    </div>
  );
}
