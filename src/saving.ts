import * as fs from "fs";
import { METADATA_FILE_NAME, PHOTOS_FOLDER_NAME } from "./config";
import { PhotoMetadata } from "./types";
import { Readable } from "stream";
import { ReadableStream } from "stream/web";

export const savePhotosMetadataToFile = (photosData: PhotoMetadata[]) => {
  console.log(
    `Saving ${photosData.length} photos metadata to ${METADATA_FILE_NAME}`
  );

  try {
    fs.writeFileSync(METADATA_FILE_NAME, JSON.stringify(photosData, null, 2));
  } catch (err) {
    console.error(
      "Error during saving photos metadata to file: ",
      (err as Error).message
    );
  }
};

export const downloadPhotos = async (photos: PhotoMetadata[]) => {
  const totalPhotos = photos.length;
  let currentPhoto = 1;

  for (const photo of photos) {
    // For slowing down requests to avoid timeouts
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await fetchAndSaveSinglePhoto(photo, `${currentPhoto} / ${totalPhotos}`);
    } catch (error) {
      console.error((error as Error).message);
    }

    currentPhoto++;
  }
};

const fetchAndSaveSinglePhoto = async (
  photo: PhotoMetadata,
  numeration: string
) => {
  return fetch(photo.photo_url).then((response) => {
    if (!response.ok || response.body === null) {
      throw new Error(
        `${numeration} - Error downloading photo with ID: ${photo.id}`
      );
    }

    const writeStream = fs
      .createWriteStream(`${PHOTOS_FOLDER_NAME}/${photo.id}.png`)
      .on("error", (error) => {
        throw new Error(
          `${numeration} - Error saving photo with ID: ${photo.id} - ${error.message}`
        );
      })
      .on("finish", () => {
        console.log(`${numeration} - Downloaded photo with ID: ${photo.id}`);
      });

    Readable.fromWeb(response.body as ReadableStream<any>).pipe(writeStream);
  });
};
