import { PhotoMetadata } from "./types";

export const convertDownloadedData = (data: any): PhotoMetadata => {
  return {
    id: data.id,
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
