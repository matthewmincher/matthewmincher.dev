import { useState, useRef, useCallback } from "react";

interface Props {
  images: string[];
  title: string;
  date: string;
  link: string;
}

export default function PhotoCard({ images, title, date, link }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const swiped = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasMultiple = images.length > 1;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, images.length - 1)));
    },
    [images.length],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    swiped.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (!hasMultiple) return;
    const threshold = 50;
    if (Math.abs(touchDeltaX.current) > threshold) {
      swiped.current = true;
      if (touchDeltaX.current < 0) {
        goTo(currentIndex + 1);
      } else {
        goTo(currentIndex - 1);
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (swiped.current) {
      e.preventDefault();
      swiped.current = false;
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group block"
      onClick={handleClick}
    >
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden rounded-xl bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={title || "Photo"}
              loading={i === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover shrink-0"
            />
          ))}
        </div>

        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 drop-shadow-md">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block w-2 h-2 rounded-full transition-all duration-200 ${
                  i === currentIndex
                    ? "bg-white scale-100"
                    : "bg-white/50 scale-[0.85]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-3">
        {title && (
          <p className="text-gray-700 text-sm leading-snug line-clamp-2">
            {title}
          </p>
        )}
        <p className="text-gray-400 text-sm mt-1">{date}</p>
      </div>
    </a>
  );
}
