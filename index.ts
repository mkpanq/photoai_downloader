import { downloadPhotos, savePhotosMetadataToFile } from "./src/saving";
import downloadPhotosMetadata from "./src/fetchData";
import { init } from "./src/config";

const main = async () => {
  init();
  const photosData = await downloadPhotosMetadata();

  savePhotosMetadataToFile(photosData);
  downloadPhotos(photosData);
};

main();
