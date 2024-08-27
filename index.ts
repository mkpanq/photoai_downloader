import fetchData from "./src/fetchData";
import { PhotoMetadata } from "./src/types";
import { DEFAULT_OFFSET } from "./src/config";
import { convertDownloadedData } from "./src/tools";

const main = async () => {
  let offset = 0;
  const photosData: PhotoMetadata[] = [];

  while (true) {
    const data = await fetchData(offset);
    if (data.length <= 0) return;

    photosData.push(...data.map(convertDownloadedData));
    offset += DEFAULT_OFFSET;
  }
};

main();

// const main = async () => {
//   let offset = 0;
//   const photosData = [];

//   while (true) {
//     const data = await fetchData(CURRENT_COOKIE, CURRENT_HASH, offset);
//     if (data.length <= 0) break;

//     console.log(`Downloaded data length: ${data.length} with offset ${offset}`);
//     const convertedData = convertPhotosData(data);
//     saveMetadatasToFile(convertedData);

//     photosData.push(
//       ...convertedData.map((photo) => {
//         return {
//           id: photo.id,
//           url: photo.photo_url,
//         };
//       })
//     );

//     offset += DEFAULT_OFFSET;
//   }

//   downloadPhotos(photosData);
// };
