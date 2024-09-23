import process from "process";
import { RequestBaseURL, RequestCookie, RequestHash } from "./types";
import * as fs from "fs";

export const CURRENT_COOKIE: RequestCookie = process.env.CURRENT_COOKIE;
export const CURRENT_HASH: RequestHash = process.env.CURRENT_HASH;
export const BASE_URL: RequestBaseURL = process.env.BASE_URL;

export const DEFAULT_OFFSET = 100;

const DOWNLOADED_DATA_FOLDER_NAME = "downloaded_data";
export const PHOTOS_FOLDER_NAME = `${DOWNLOADED_DATA_FOLDER_NAME}/photos`;
export const METADATA_FILE_NAME = `${DOWNLOADED_DATA_FOLDER_NAME}/photos_metadata.json`;

export const init = () => {
  if (!CURRENT_COOKIE || !CURRENT_HASH) {
    console.error(
      "Please provide CURRENT_COOKIE and CURRENT_HASH in .env or .env.local file"
    );
    process.exit(1);
  }

  console.log("Creating data folders...");
  fs.mkdirSync(PHOTOS_FOLDER_NAME, { recursive: true });
};
