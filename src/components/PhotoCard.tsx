import { useCallback, useRef, useState } from "react";

interface Props {
  images: string[];
  title: string;
  date: string;
  link: string;
}

export default function PhotoCard({ images, title, date, link }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const dragging = useRef(false);
  const swiped = useRef(false);

  const hasMultiple = images.length > 1;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, images.length - 1)));
    },
    [images.length],
  );

  const commitSwipe = () => {
    const threshold = 50;
    if (Math.abs(deltaX.current) > threshold) {
      swiped.current = true;
      goTo(currentIndex + (deltaX.current < 0 ? 1 : -1));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
    swiped.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };

  const handleTouchEnd = () => {
    if (!hasMultiple) return;
    commitSwipe();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!hasMultiple) return;
    dragging.current = true;
    startX.current = e.clientX;
    deltaX.current = 0;
    swiped.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    deltaX.current = e.clientX - startX.current;
  };

  const handleMouseUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    commitSwipe();
  };

  const handleMouseLeave = () => {
    if (!dragging.current) return;
    dragging.current = false;
    commitSwipe();
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
        className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
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
