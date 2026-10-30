import { useState } from 'react';

export default function ScreenshotGallery({ images, gameName }) {
  const [selected, setSelected] = useState(0);
  if (images.length === 0) return <p className="muted">No screenshots available.</p>;

  return (
    <div className="gallery">
      <img className="gallery-main" src={images[selected]} alt={`${gameName} screenshot ${selected + 1}`} />
      <div className="gallery-thumbs">
        {images.map((src, index) => (
          <button
            key={src}
            className={index === selected ? 'thumb active' : 'thumb'}
            onClick={() => setSelected(index)}
            aria-label={`Show screenshot ${index + 1}`}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}