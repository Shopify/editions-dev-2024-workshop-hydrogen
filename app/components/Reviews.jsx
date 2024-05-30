import {StarIcon} from '@heroicons/react/20/solid';
import {classNames} from '~/lib/utils';

export function Reviews({data}) {
  return data.map((review) => {
    const {id, name, date, content, starRating} = review;

    return (
      <div className="text-sm mb-10" key={id}>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                starRating >= rating ? 'text-gray-900' : 'text-gray-200',
                'h-5 w-5 flex-shrink-0',
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="text-sm font-medium text-gray-900">
          {name}{' '}
          <span className="text-gray-500 border-l-2 pl-1 font-light">
            {' '}
            {date}
          </span>
        </p>
        <p className="mt-3 space-y-6 text-sm text-gray-600">{content}</p>
      </div>
    );
  });
}

export function ReviewsSummary({data}) {
  return (
    <div className="mt-6">
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
          <AverageStarRating data={data} />
        </div>
        <p className="sr-only">{data.length} out of 5 stars</p>
        <a
          href="#reviews"
          className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {data.length} reviews
        </a>
      </div>
    </div>
  );
}

export function AverageStarRating({data}) {
  const total = data.reduce((sum, review) => sum + review.starRating, 0);
  const average = total / data.length;
  return [0, 1, 2, 3, 4].map((rating) => (
    <StarIcon
      key={rating}
      className={classNames(
        average > rating ? 'text-gray-900' : 'text-gray-200',
        'h-5 w-5 flex-shrink-0',
      )}
      aria-hidden="true"
    />
  ));
}
