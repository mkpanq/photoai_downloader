import process from "process";
import { RequestCookie, RequestHash } from "./types";

export const CURRENT_COOKIE: RequestCookie = process.env.CURRENT_COOKIE;
export const CURRENT_HASH: RequestHash = process.env.CURRENT_HASH;

export const DEFAULT_OFFSET = 19;
export const PHOTOS_FOLDER_NAME = "photos";
export const METADATA_FILE_NAME = "photos_metadata.json";
