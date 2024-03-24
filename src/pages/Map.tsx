import ArcViewer from "@/components/ArcViewer";
import Loader from "@/components/Loader";
import useArcViewer from "@/hooks/useArcViewer";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

import MapHeader from "@/features/map/components/MapHeader";
import MapLeaderboard from "@/features/map/components/MapLeaderboard";
import MapRequirements from "@/features/map/components/MapRequirements";
import { useMap } from "@/features/map/hooks/useMap";

export default function Map() {
  const { mapID } = useParams();

  if (!mapID) {
    return;
  }

  const arcViewer = useArcViewer();

  const { data: map, isLoading, isError } = useMap(mapID);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || map == null) {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="mb-4 text-h1" />
        <h3 className="text-h3">Map not found</h3>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg">
      <>
        <MapHeader mapData={map} arcViewer={arcViewer.open} />

        <MapRequirements />
        <div className="flex w-full justify-center">
          <MapLeaderboard mapData={map} />
        </div>
      </>
      <ArcViewer settings={arcViewer} />
    </div>
  );
}
