export default function CardSkeletonLoader() {
  return (
    <div className="flex w-full flex-col p-6 rounded-lg gap-4 bg-base-200">
      <div className="skeleton w-full aspect-[5/3.5]"></div>
      <div className="h-10 w-1/2 skeleton"></div>
      <div className="h-6 w-3/5 skeleton"></div>
      <div className="h-5 w-4/6 skeleton"></div>
      <div className="h-5 w-4/6 skeleton"></div>
      <div className="flex gap-3">
        <div className="skeleton h-10 flex-1"></div>
        <div className="skeleton h-10 flex-1"></div>
      </div>
    </div>
  );
}
