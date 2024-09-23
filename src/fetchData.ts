import {
  BASE_URL,
  CURRENT_COOKIE,
  CURRENT_HASH,
  DEFAULT_OFFSET,
} from "./config";
import { PhotoMetadata } from "./types";

const downloadPhotosMetadata = async () => {
  let offset = 0;
  const photosData: PhotoMetadata[] = [];
  let totalData = 0;

  while (true) {
    const data = await fetchData(offset);
    const dataSize = data.length;

    if (dataSize <= 1) break;
    totalData += dataSize;
    console.log(
      `Downloading ${dataSize} photos metadata... Total: ${totalData}`
    );

    photosData.push(...data.map(convertDownloadedData));
    offset += DEFAULT_OFFSET;
  }

  return photosData;
};

const convertDownloadedData = (data: any): PhotoMetadata => {
  return {
    id: data.photo_id,
    photo_url: data.photo_url,
    seed: data.seed,
    model_strength: data.model_strength,
    manual_prompt: data.manual_prompt,
    details: {
      emotion: data.emotion,
      place: data.place,
      camera: data.camera,
      film: data.film,
    },
  };
};

const fetchData = async (offset: number) => {
  return await fetch(
    `${BASE_URL}&offset=${offset}&query=&mode=camera&hash=${CURRENT_HASH}`,
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
        cookie: `${CURRENT_COOKIE}`,
        Referer: `https://photoai.com/?hash=${CURRENT_HASH}`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  ).then((response) => response.json());
};

export default downloadPhotosMetadata;
