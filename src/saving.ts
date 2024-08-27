import * as fs from "fs";
import { METADATA_FILE_NAME } from "./config";
import { PhotoMetadata } from "./types";

export const savePhotosMetadataToFile = (photosData: PhotoMetadata[]) => {
  console.log("Saving photos metadata to file");
  try {
    fs.appendFileSync(METADATA_FILE_NAME, JSON.stringify(photosData, null, 2));
  } catch (err) {
    console.log("Error during saving photos metadata to file");
    console.error(err);
  }
};

export const downloadPhotos = () => {};
