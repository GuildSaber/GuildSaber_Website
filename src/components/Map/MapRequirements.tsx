import useScreenSize from "../../hooks/useScreenSize";
export default function MapRequirements() {
  const screenSize = useScreenSize();

  return (
    <>
      {screenSize.width >= 768 && (
        <div className="mb-8 w-full overflow-hidden rounded bg-gray-800 p-8">
          <h3 className="mb-4 line-clamp-1 text-h4 font-bold">Requirements</h3>

          <div className="flex gap-2">
            <p className="badge gap-2 overflow-hidden p-0">
              <span className="h-full bg-gray-900 px-2.5 py-1">
                Min Accuracy
              </span>
              <span className="h-full py-1 pr-2.5">50%</span>
            </p>

            <p className="badge gap-2 overflow-hidden p-0">
              <span className="h-full bg-gray-900 px-2.5 py-1">
                Total Pause
              </span>
              <span className="h-full py-1 pr-2.5">{"<5s"}</span>
            </p>

            <p className="badge gap-2 overflow-hidden p-0">
              <span className="h-full bg-gray-900 px-2.5 py-1">Allowed</span>
              <span className="h-full py-1 pr-2.5">FS | DA</span>
            </p>

            <p className="badge gap-2 overflow-hidden p-0">
              <span className="h-full bg-gray-900 px-2.5 py-1">
                Not Allowed
              </span>
              <span className="h-full py-1 pr-2.5">SA | PM</span>
            </p>
          </div>
        </div>
      )}
      {screenSize.width < 768 && (
        <div className="flex w-full flex-col overflow-hidden rounded bg-gray-800 p-8 text-center">
          <h3 className="line-clamp-1 text-h4 font-bold">Requirements</h3>
        </div>
      )}
    </>
  );
}
