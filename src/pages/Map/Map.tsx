import { useParams } from "react-router-dom";
import MapHeader from "../../components/Map/MapHeader";
import MapRequirements from "../../components/Map/MapRequirements";
import List from "../../components/List/List";
import { useState } from "react";

const PAGE_SIZE = 10;

export default function Map() {
  const { mapID } = useParams();
  if (!mapID) {
    return <p>Error</p>;
  }
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="mx-auto max-w-screen-lg">
      <>
        <MapHeader />

        <MapRequirements />
        <div className="flex w-full rounded bg-gray-800 p-8">
          <List
            totalCount={20}
            pageSize={PAGE_SIZE}
            hasPreviousPage={false}
            hasNextPage={true}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          >
            <div className="flex gap-2"></div>

            <div className="grid w-full">
              <div className="btn grid w-full grid-cols-[4fr_8fr_6fr_repeat(5,_4fr)] gap-2 px-1 py-2">
                <p>Rank</p>
                <p></p>
                <p>Pass Points</p>
                <p>Modifiers</p>
                <p>Headset</p>
                <p>Pause</p>
                <p>Accuracy</p>
                <p>Score</p>
              </div>
              <div className="btn grid w-full grid-cols-[4fr_8fr_6fr_repeat(5,_4fr)] gap-3 px-1 py-2 hover:bg-gray-900">
                <div className="flex gap-2">
                  <p>#4235</p>
                </div>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
              </div>
              <div className="btn grid w-full grid-cols-[4fr_8fr_6fr_repeat(5,_4fr)] gap-3 px-1 py-2 hover:bg-gray-900">
                <div className="flex gap-2">
                  <p>#45</p>
                </div>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
              </div>
            </div>
          </List>
        </div>
      </>
    </div>
  );
}
