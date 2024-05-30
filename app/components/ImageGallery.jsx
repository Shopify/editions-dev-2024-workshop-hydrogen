export default function ImageGallery({images}) {
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      {images.map((image) => (
        <div
          className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg"
          key={image.id}
        >
          <img
            src={image.url}
            alt={image.altText}
            className="h-full w-full object-cover object-center"
          />
        </div>
      ))}
    </div>
  );
}
