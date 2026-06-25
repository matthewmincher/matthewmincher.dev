import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface Props {
  images: string[];
  title: string;
  date: string;
  link: string;
}

export default function PhotoCard({ images, title, date, link }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: hasMultiple,
    watchDrag: hasMultiple,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleCarouselClick = useCallback(() => {
    if (!hasMultiple || !emblaApi || emblaApi.clickAllowed()) {
      window.open(link, "_blank", "noreferrer");
    }
  }, [hasMultiple, emblaApi, link]);

  return (
    <div className="group block">
      <div
        className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 cursor-pointer"
        onDragStart={(e) => e.preventDefault()}
        onClick={handleCarouselClick}
      >
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {images.map((src, i) => (
              <div key={src} className="min-w-0 shrink-0 basis-full h-full">
                <img
                  src={src}
                  alt={title || "Photo"}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 drop-shadow-md">
            {images.map((_, i) => (
              <span
                key={i}
                className={`block w-2 h-2 rounded-full transition-all duration-200 ${
                  i === selectedIndex
                    ? "bg-white scale-100"
                    : "bg-white/50 scale-[0.85]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <a href={link} target="_blank" rel="noreferrer" className="block mt-3">
        {title && (
          <p className="text-gray-700 text-sm leading-snug line-clamp-2">
            {title}
          </p>
        )}
        <p className="text-gray-400 text-sm mt-1">{date}</p>
      </a>
    </div>
  );
}
