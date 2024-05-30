import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import {ShoppingBagIcon} from '@heroicons/react/24/outline';

export function Header({cart}) {
  return (
    <header className="relative bg-white pb-6">
      <nav
        aria-label="Top"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="border-b border-gray-200">
          <div className="flex h-16 items-center justify-between">
            <span className="font-bold antialiased text-sky-800">
              SLOW SURF
            </span>

            <CartToggle cart={cart} />
          </div>
        </div>
      </nav>
    </header>
  );
}

function CartBadge({count, loading}) {
  return (
    <div className="ml-4 flow-root lg:ml-6">
      <a
        href={'#cart-aside'}
        className="group -m-2 flex items-center p-2 hover:no-underline"
      >
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {count}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </a>
    </div>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}
