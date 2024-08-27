import fetchData from "./src/fetchData";
import { PhotoMetadata } from "./src/types";
import { DEFAULT_OFFSET } from "./src/config";
import { convertDownloadedData } from "./src/tools";
import { savePhotosMetadataToFile } from "./src/saving";

const main = async () => {
  let offset = 0;
  const photosData: PhotoMetadata[] = [];

  while (true) {
    const data = await fetchData(offset);
    if (data.length <= 0) break;

    photosData.push(...data.map(convertDownloadedData));
    offset += DEFAULT_OFFSET;
  }

  savePhotosMetadataToFile(photosData);
};

main();
