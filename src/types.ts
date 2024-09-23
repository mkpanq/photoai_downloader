export type RequestCookie = string | undefined;
export type RequestHash = string | undefined;
export type RequestBaseURL = string | undefined;

export type PhotoMetadata = {
  id: string;
  photo_url: string;
  seed: number;
  model_strength: number;
  manual_prompt: string;
  details: {
    emotion: string;
    place: string;
    camera: string;
    film: string;
  };
};
