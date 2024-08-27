const main = () => {
  return 0;
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
