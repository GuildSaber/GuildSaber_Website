import ArcViewer from "@/components/Common/ArcViewer";
import Loader from "@/components/Common/Loader";
import MapHeader from "@/components/Map/MapHeader";
import MapRequirements from "@/components/Map/MapRequirements";
import { MAP_API_DATA_INCLUDES, MAP_PAGE_SIZE } from "@/constants";
import useArcViewer from "@/hooks/useArcViewer";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getMap } from "@/api/fetch/rankedMaps";
import MapLeaderboard from "@/components/Map/MapLeaderboard";

export default function Map() {
  const { mapID } = useParams();

  if (!mapID) {
    return;
  }

  const arcViewer = useArcViewer();

  const {
    data: map,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["maps", mapID],
    queryFn: () => getMap(parseInt(mapID, 10), MAP_API_DATA_INCLUDES),
    enabled: !!mapID,
  });

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
          <MapLeaderboard mapData={map} pageSize={MAP_PAGE_SIZE} />
        </div>
      </>
      <ArcViewer settings={arcViewer} />
    </div>
  );
}
