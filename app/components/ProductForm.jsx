import {Link} from '@remix-run/react';
import {CartForm, VariantSelector} from '@shopify/hydrogen';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductForm({product, selectedVariant, variants}) {
  return (
    <div className="mt-10">
      <VariantSelector
        options={product.options}
        variants={variants}
        handle={product.handle}
      >
        {({option}) => (
          <>
            <h3 className="text-sm font-medium text-gray-900 mt-10">
              {option.name}
            </h3>
            <div className="flex items-center space-x-3 mt-4">
              {option.values.map(({value, isAvailable, isActive, to}) => {
                const selected = selectedVariant.selectedOptions.some(
                  (o) => o.name === option.name && o.value === value,
                );
                return (
                  <Link
                    className={classNames(
                      isAvailable
                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                      selected ? 'ring-indigo-500 ring-4' : '',
                      'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none hover:no-underline sm:flex-1 sm:py-6',
                    )}
                    key={option.name + value}
                    preventScrollReset
                    replace
                    to={to}
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </VariantSelector>
      <CartForm
        route="/cart"
        inputs={{
          lines: selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                },
              ]
            : [],
        }}
        action={CartForm.ACTIONS.LinesAdd}
      >
        {(fetcher) => (
          <>
            <button
              type="submit"
              disabled={
                !selectedVariant.availableForSale || fetcher.state !== 'idle'
              }
              onClick={() => {
                window.location.href = window.location.href + '#cart-aside';
              }}
              className="disabled:bg-indigo-100 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to bag
            </button>
          </>
        )}
      </CartForm>
    </div>
  );
}
