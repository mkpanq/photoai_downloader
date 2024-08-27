const fs = require("fs");
const Readable = require("stream").Readable;

const CURRENT_COOKIE = require("./config.locale.js").CURRENT_COOKIE;
const CURRENT_HASH = require("./config.locale.js").CURRENT_HASH;

const DEFAULT_OFFSET = 19;
const PHOTOS_FOLDER_NAME = "photos";
const METADATA_FILE_NAME = "metadata.json";

const fetchData = async (cookie, hash, offset) => {
  return await fetch(
    `https://photoai.com/?action=get-camera-roll&offset=${offset}&query=&mode=camera&hash=${hash}`,
    {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9,pl;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua": '"Not;A=Brand";v="24", "Chromium";v="128"',
        "sec-ch-ua-arch": '"arm"',
        "sec-ch-ua-bitness": '"64"',
        "sec-ch-ua-full-version": '"128.0.6613.85"',
        "sec-ch-ua-full-version-list":
          '"Not;A=Brand";v="24.0.0.0", "Chromium";v="128.0.6613.85"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": '""',
        "sec-ch-ua-platform": '"macOS"',
        "sec-ch-ua-platform-version": '"14.6.1"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie: `${cookie}`,
        Referer: `https://photoai.com/?hash=${hash}`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  ).then((response) => response.json());
};

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
