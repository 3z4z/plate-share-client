export default function CommonTitleComponent({ title, subtitle, margins }) {
  return (
    <div className={`text-center ${margins}`}>
      <h2 className="text-4xl mb-3 flex gap-2 justify-center flex-wrap">
        {title.split(" ").map((str, index) => (
          <span key={index} className="last:text-primary">
            {str}
          </span>
        ))}
      </h2>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
}
