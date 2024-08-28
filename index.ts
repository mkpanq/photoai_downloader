import { downloadPhotos, savePhotosMetadataToFile } from "./src/saving";
import downloadPhotosMetadata from "./src/fetchData";

const main = async () => {
  init();
  const photosData = await downloadPhotosMetadata();

  savePhotosMetadataToFile(photosData);
  downloadPhotos(photosData);
};

main();
