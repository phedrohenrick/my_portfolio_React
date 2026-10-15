import Icon from "./Icon";

const ImagePlaceholder = ({ className = "" }: { className?: string }) => (
  <div
    role="img"
    aria-label="placeholder"
    className={`flex items-center justify-center bg-gradient-to-br from-abyss to-seaglass text-white/70 ${className}`}
  >
    <Icon name="wave" size={32} />
  </div>
);

export default ImagePlaceholder;
