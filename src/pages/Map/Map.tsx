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
            <div className="flex gap-2">
              <button className="badge">CPP</button>
              <button className="badge">CPA</button>
            </div>

            <div className="grid w-full gap-1 font-medium">
              <div className="grid w-full grid-cols-[4fr_10fr_6fr_repeat(5,_4fr)] gap-2 px-1 py-2 text-btn">
                <p>Rank</p>
                <p></p>
                <p>Pass Points</p>
                <p>Modifiers</p>
                <p>Headset</p>
                <p>Pause</p>
                <p>Accuracy</p>
                <p>Score</p>
              </div>
              <div className="mb-1 grid w-full cursor-pointer grid-cols-[4fr_10fr_6fr_repeat(5,_4fr)] items-center gap-3 rounded px-2 py-1 text-btn outline outline-1 outline-secondary transition-colors hover:bg-gray-900">
                <div className="flex gap-2">
                  <p>#4235</p>
                </div>
                <div className="inline-flex items-center gap-2 overflow-hidden">
                  <img
                    className="rounded-full"
                    src="https://avatars.akamai.steamstatic.com/641bb318819718248bb4570d4300949935052ccc_full.jpg"
                    height={28}
                    width={28}
                  />
                  <p className="truncate text-[0.80rem]">Player1</p>
                  <p className="inline-block rounded bg-muted px-2 align-middle text-[0.80rem]">
                    25
                  </p>
                </div>
                <p className="text-secondary">12500 CPP</p>
                <p>FS</p>
                <p>Rift S</p>
                <p>5s</p>
                <p>79.86%</p>
                <p>12 312 312</p>
              </div>

              <div className="grid w-full cursor-pointer grid-cols-[4fr_10fr_6fr_repeat(5,_4fr)] items-center gap-3 rounded px-2 py-1 text-btn transition-colors hover:bg-gray-900">
                <p>#1</p>
                <div className="inline-flex items-center gap-2 overflow-hidden">
                  <img
                    className="rounded-full"
                    src="https://avatars.akamai.steamstatic.com/641bb318819718248bb4570d4300949935052ccc_full.jpg"
                    height={28}
                    width={28}
                  />
                  <p className="truncate text-[0.80rem]">Player1</p>
                  <p className="inline-block rounded bg-muted px-2 align-middle text-[0.80rem]">
                    25
                  </p>
                </div>
                <p className="text-secondary">12500 CPP</p>
                <p>FS</p>
                <p>Rift S</p>
                <p>5s</p>
                <p>79.86%</p>
                <p>12 312 312</p>
              </div>

              <div className="grid w-full cursor-pointer grid-cols-[4fr_10fr_6fr_repeat(5,_4fr)] items-center gap-3 rounded px-2 py-1 text-btn transition-colors hover:bg-gray-900">
                <p>#1</p>
                <div className="inline-flex items-center gap-2 overflow-hidden">
                  <img
                    className="rounded-full"
                    src="https://avatars.akamai.steamstatic.com/641bb318819718248bb4570d4300949935052ccc_full.jpg"
                    height={28}
                    width={28}
                  />
                  <p className="truncate text-[0.80rem]">Player1</p>
                  <p className="inline-block rounded bg-muted px-2 align-middle text-[0.80rem]">
                    25
                  </p>
                </div>
                <p className="text-secondary">12500 CPP</p>
                <p>FS</p>
                <p>Rift S</p>
                <p>5s</p>
                <p>79.86%</p>
                <p>12 312 312</p>
              </div>

              <div className="grid w-full cursor-pointer grid-cols-[4fr_10fr_6fr_repeat(5,_4fr)] items-center gap-3 rounded px-2 py-1 text-btn transition-colors hover:bg-gray-900">
                <p>#1</p>
                <div className="inline-flex items-center gap-2 overflow-hidden">
                  <img
                    className="rounded-full"
                    src="https://avatars.akamai.steamstatic.com/641bb318819718248bb4570d4300949935052ccc_full.jpg"
                    height={28}
                    width={28}
                  />
                  <p className="truncate text-[0.80rem]">Player1</p>
                  <p className="inline-block rounded bg-muted px-2 align-middle text-[0.80rem]">
                    25
                  </p>
                </div>
                <p className="text-secondary">12500 CPP</p>
                <p>FS</p>
                <p>Rift S</p>
                <p>5s</p>
                <p>79.86%</p>
                <p>12 312 312</p>
              </div>

              <div className="grid w-full cursor-pointer grid-cols-[4fr_10fr_6fr_repeat(5,_4fr)] items-center gap-3 rounded px-2 py-1 text-btn transition-colors hover:bg-gray-900">
                <p>#1</p>
                <div className="inline-flex items-center gap-2 overflow-hidden">
                  <img
                    className="rounded-full"
                    src="https://avatars.akamai.steamstatic.com/641bb318819718248bb4570d4300949935052ccc_full.jpg"
                    height={28}
                    width={28}
                  />
                  <p className="truncate text-[0.80rem]">Player1</p>
                  <p className="inline-block rounded bg-muted px-2 align-middle text-[0.80rem]">
                    25
                  </p>
                </div>
                <p className="text-secondary">12500 CPP</p>
                <p>FS</p>
                <p>Rift S</p>
                <p>5s</p>
                <p>79.86%</p>
                <p>12 312 312</p>
              </div>
            </div>
          </List>
        </div>
      </>
    </div>
  );
}
