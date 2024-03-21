export default function MapRequirements() {
  return (
    <div className="mb-8 mt-8 w-full overflow-hidden rounded bg-gray-800 p-8">
      <h3 className="mb-4 line-clamp-1 text-center text-h4 font-bold md:text-left">
        Requirements
      </h3>

      <div className="flex w-full flex-wrap justify-center gap-2 md:justify-start">
        <span className="badge badge-split">
          <span>Min Accuracy</span>
          <span>50%</span>
        </span>

        <span className="badge badge-split">
          <span>Total Pause</span>
          <span>{"<5s"}</span>
        </span>

        <span className="badge badge-split">
          <span>Allowed</span>
          <span>FS | DA</span>
        </span>

        <p className="badge badge-split">
          <span>Not Allowed</span>
          <span>SA | PM</span>
        </p>
      </div>
    </div>
  );
}
