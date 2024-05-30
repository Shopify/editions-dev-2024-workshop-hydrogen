export default function CMSContent({data}) {
  return (
    <>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

        <div className="mt-4">
          <ul className="list-disc space-y-2 pl-4 text-sm">
            {data.highlights.map((highlight) => (
              <li key={highlight} className="text-gray-400">
                <span className="text-gray-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-900">Construction</h2>

        <div className="mt-4 space-y-6">
          <p className="text-sm text-gray-600">{data.construction}</p>
        </div>
      </div>
    </>
  );
}
