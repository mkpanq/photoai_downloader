const fs = require("fs");
const Readable = require("stream").Readable;

const convertPhotosData = (data) => {
  return data.map((photo) => ({
    id: photo.photo_id,
    photo_url: photo.photo_url,
    seed: photo.seed,
    model_strength: photo.model_strength,
    manual_prompt: photo.manual_prompt,
    details: {
      emotion: photo.emotion,
      place: photo.place,
      camera: photo.camera,
      film: photo.film,
    },
  }));
};

const saveMetadatasToFile = (metadataArray) => {
  console.log("Saving metadatas to file");
  try {
    fs.appendFileSync(
      METADATA_FILE_NAME,
      JSON.stringify(metadataArray, null, 2)
    );
  } catch (err) {
    console.log("Error during saving metadatas to file");
    console.error(err);
  }
};

const downloadPhotos = async (photos) => {
  const totalLength = photos.length;

  fs.mkdirSync(PHOTOS_FOLDER_NAME, { recursive: true });

  const fetchPhoto = (photo) => {
    return fetch(photo.url).then((response) => {
      if (!response.ok) throw new Error(`ERROR ! PhotoId: ${photo.id}`);
      Readable.from(response.body).pipe(
        fs.createWriteStream(`${PHOTOS_FOLDER_NAME}/${photo.id}.png`)
      );
    });
  };

  let currentPhoto = 1;
  for (const photo of photos) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await fetchPhoto(photo);
      console.log(
        `${currentPhoto} / ${totalLength} Downloaded PhotoId: ${photo.id}`
      );
    } catch (err) {
      console.error(
        `${currentPhoto} / ${totalLength} Failed to download PhotoId: ${photo.id}`,
        err
      );
    }
    currentPhoto++;
  }
};

const main = async () => {
  let offset = 0;
  const photosData = [];

  while (true) {
    const data = await fetchData(CURRENT_COOKIE, CURRENT_HASH, offset);
    if (data.length <= 0) break;

    console.log(`Downloaded data length: ${data.length} with offset ${offset}`);
    const convertedData = convertPhotosData(data);
    saveMetadatasToFile(convertedData);

    photosData.push(
      ...convertedData.map((photo) => {
        return {
          id: photo.id,
          url: photo.photo_url,
        };
      })
    );

    offset += DEFAULT_OFFSET;
  }

  downloadPhotos(photosData);
};

main();
