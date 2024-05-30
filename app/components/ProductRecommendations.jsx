import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export default function ProductRecommendations({data}) {
  return (
    <section
      aria-labelledby="related-heading"
      className="mx-auto max-w-2xl sm:px-6  lg:max-w-7xl  lg:px-8"
    >
      <hr className="border-gray-200 mt-4" id="reviews" />

      <h2
        id="related-heading"
        className="text-lg font-medium text-gray-900 mt-10"
      >
        Don&apos;t forget the essentials
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data.map((product) => (
          <Link
            to={`/products/${product.handle}`}
            className="group relative"
            key={product.id}
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
              <Image
                data={product.featuredImage}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                sizes="540"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {product.title}
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900"></p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
