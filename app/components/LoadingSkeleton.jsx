import clsx from 'clsx';

export default function LoadingSkeleton({className}) {
  const styles = clsx('bg-gray-300 rounded animate-pulse', className);
  return <div className={styles}></div>;
}
