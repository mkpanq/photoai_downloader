## PhotoAI downloader

I needed to create small script to easy download my whole camera roll from [openai.com](https://photoai.com/). Due to having over 600 photos, I had to create small script to download them in one run

### Steps:

1. Create `config.locale.js` file, and fill two variables: `CURRENT_COOKIE` and `CURRENT_HASH` - both of them are easy to extract from GET request from Network Tab in browser dev console.

2. Run `node download.js` - script (if your URL is OK) will download all raw photos from your Camera roll from [photoai.com](https://photoai.com/) to `photos` folder. Also will save most important metadata for each photo in `metadata.json` file to see what settings were used in image generation

Downloading is a little bit slow, but having 1 sec timeout was necessity due to often timouts using parallel Promises.

This is very raw, uncooked version. But it works. Maybe in incoming days I'll improve it a little.
