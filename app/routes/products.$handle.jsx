import {Money, getSelectedProductOptions} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData, useNavigation} from '@remix-run/react';
import {Breadcrumbs} from '~/components/Breadcrumbs';
import {redirectToFirstVariant} from '~/lib/utils';

import ImageGallery from '~/components/ImageGallery';
import ProductForm from '~/components/ProductForm';
import {Reviews, ReviewsSummary} from '~/components/Reviews';
import ProductRecommendations from '~/components/ProductRecommendations';
import CMSContent from '~/components/CMSContent';
import LoadingSkeleton from '~/components/LoadingSkeleton';

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront, fetchReviews, fetchContent} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const selectedOptions = getSelectedProductOptions(request);

  // Fetch product information from Shopify
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
    cache: storefront.CacheNone(),
  });

  // Fetch construction details from third-party CMS
  const constructionDetails = await fetchContent(handle);

  // Throw a 404 if the product isn't found
  if (!product?.id) throw new Response(null, {status: 404});

  // Fetch product reviews from third-party source
  const reviews = await fetchReviews(handle);

  // Fetch product recommendations from Shopify
  const {productRecommendations} = await storefront.query(
    RECOMMENDED_PRODUCTS_QUERY,
    {
      variables: {
        productId: product.id,
      },
      cache: storefront.CacheNone(),
    },
  );

  // Determine selected variant
  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  // If the product has a single variant, we'll use that as the selected variant
  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  return json({product, productRecommendations, reviews, constructionDetails});
}

export default function Product() {
  const {product, productRecommendations, reviews, constructionDetails} =
    useLoaderData();
  const selectedVariant = product.selectedVariant;

  return (
    <div className="bg-white">
      <Breadcrumbs product={product} />

      {/* Image gallery */}
      <ImageGallery images={product.images.nodes} />

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.title}
          </h1>
        </div>
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <div>
            <Money
              data={selectedVariant.price}
              className="text-3xl tracking-tight text-gray-900"
            />
          </div>

          {/* Reviews */}
          <ReviewsSummary data={reviews} />

          {/* Options */}
          <ProductForm
            product={product}
            selectedVariant={selectedVariant}
            variants={product.variants}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">{product.description}</p>
            </div>
          </div>
          <CMSContent data={constructionDetails} />

          {/* Reviews */}
          <hr className="border-gray-200 my-16" id="reviews" />
          <Reviews data={reviews} />
        </div>
      </div>
      <ProductRecommendations data={productRecommendations} />
    </div>
  );
}

const VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
  }`;

const PRODUCT_QUERY = `#graphql
  query ProductPage(
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) {
    product(handle: $handle) {
      id
      title
      handle
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
        ...ProductVariant
      }
      images(first: 5) {
        nodes {
          id
          altText
          url
        }
      }
      variants(first: 250) {
        nodes {
          ...ProductVariant
        }
      }
    }
  }
  ${VARIANT_FRAGMENT}
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      featuredImage {
        altText
        url
        height
        width
      }
    }
  }
`;
