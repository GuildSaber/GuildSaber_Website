export default function MapRequirements() {
  return (
    <div className="mb-8 w-full overflow-hidden rounded bg-gray-800 p-8">
      <h3 className="mb-4 line-clamp-1 text-center text-h4 font-bold md:text-left">
        Requirements
      </h3>

      <div className="flex w-full flex-wrap justify-center gap-2 md:justify-start">
        <p className="badge gap-2 overflow-hidden p-0">
          <span className="h-full bg-gray-900 px-2.5 py-1">Min Accuracy</span>
          <span className="h-full py-1 pr-2.5">50%</span>
        </p>

        <p className="badge gap-2 overflow-hidden p-0">
          <span className="h-full bg-gray-900 px-2.5 py-1">Total Pause</span>
          <span className="h-full py-1 pr-2.5">{"<5s"}</span>
        </p>

        <p className="badge gap-2 overflow-hidden p-0">
          <span className="h-full bg-gray-900 px-2.5 py-1">Allowed</span>
          <span className="h-full py-1 pr-2.5">FS | DA</span>
        </p>

        <p className="badge gap-2 overflow-hidden p-0">
          <span className="h-full bg-gray-900 px-2.5 py-1">Not Allowed</span>
          <span className="h-full py-1 pr-2.5">SA | PM</span>
        </p>
      </div>
    </div>
  );
}
