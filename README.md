# PhotoAI Camera Roll Downloader

This project is a simple TypeScript script designed to download your entire camera roll from [photoai.com](https://photoai.com/) in one run. Due to the large number of photos (over 600), this script helps automate the download process.

## Setup

1. **Install All Versions**  
   Install the required versions for Node.js and any other dependencies. Best would be using [asdf](https://asdf-vm.com/), but feel free to install each tool in right version using `.tool-versions` file:

   ```bash
   asdf install
   ```

2. **Configure Environment Variables**  
   Create file `.env.local` or just use `.env` to fill in the required variables in the script:

   - `CURRENT_COOKIE`
   - `CURRENT_HASH`

   These values are necessary for authenticating your requests to photoai.com.

3. **Run the Script**  
   Once everything is set up, you can start the download process by running:
   ```bash
   pnpm build_start
   ```

## How to Find Your Cookie and Hash

To locate the `CURRENT_COOKIE` and `CURRENT_HASH` values, follow these steps (screenshot below):

1. Open your browser and go to [photoai.com](https://photoai.com).
2. Log in to your account if you haven't already.
3. Open the Developer Tools in your browser:
   - For Chrome: `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Opt+I` (Mac)
   - For Firefox: `Ctrl+Shift+K` (Windows/Linux) or `Cmd+Opt+K` (Mac)
4. Navigate to the **Network** tab.
5. Start any action that triggers a request to download your camera roll or refresh the page.
6. Look for a network request that corresponds to fetching your camera roll. This might be named something like `?action=get-camera-roll&offset=0&query=...`.
7. Click on this request, and then go to the **Headers** tab.
8. You will find the necessary values highlighted:

   - **Cookie**: Look for a value starting with `PHPSESSID=`, this will be your `CURRENT_COOKIE`. **IMPORTANT: Remember to copy whole value of key `cookie`, also with `PHPSESSID=`**
   - **Hash**: Look for a value that might be associated with your session or request, often labeled as `hash`. Copy only string which is present after `hash=`

   Refer to the screenshot provided for a visual reference—highlighted areas indicate where these values are typically found.

9. Copy these values into your script where prompted to fill `CURRENT_COOKIE` and `CURRENT_HASH`.

![alt text](<Screenshot 2024-08-28 at 16.36.05.png>)
