import {useNavigation} from '@remix-run/react';
import { useEffect, useState } from 'react';

export default function useOptimisticProduct(product, variants) {
  const navigation = useNavigation();
  const [resolvedVariants, setResolvedVariants] = useState([])

  useEffect(() => {
    Promise.resolve(variants)
      .then((productWithVariants) => {
        if (productWithVariants) {
          setResolvedVariants(
            productWithVariants instanceof Array
              ? productWithVariants
              : productWithVariants.product
                  .variants.nodes || [],
          );
        }
      })
      .catch((error) => {
        console.error(
          '[h2:error:useOptimisticProduct] An error occurred while resolving the variants for the optimistic product hook.',
          error,
        );
      });
  }, [variants]);


  if (navigation.state === 'loading') {
    const queryParams = new URLSearchParams(navigation.location.search);

    // Convert the search params to a key-value object
    const params = {};
    queryParams.forEach((value, key) => {
      params[key] = value;
    });

    // Find matching variant
    const selectedVariant =
      resolvedVariants.find((variant) => {
        if (!variant.selectedOptions) {
          console.error(
            '[h2:error:useOptimisticProduct] The optimistic product hook requires your product query to include variants with the selectedOptions field.',
          );
          return false;
        }

        return variant.selectedOptions.every((option) => {
          return params[option.name] && params[option.name] === option.value;
        });
      }) || product.selectedVariant;

    if (selectedVariant) {
      return {
        ...product,
        isOptimistic: true,
        selectedVariant,
      };
    }
  }

  return product;
}
