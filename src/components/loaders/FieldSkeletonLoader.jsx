export default function FieldSkeletonLoader({ width, height, margin }) {
  return (
    <div
      className={`${width ? width : "w-full"} ${
        height ? height : "h-5"
      } ${margin} skeleton`}
    ></div>
  );
}
