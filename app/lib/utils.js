import {redirect} from '@shopify/remix-oxygen';
import {getVariantUrl} from '~/lib/variants';

export function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
