# Steam calendar — open day in tabs

A small browser extension for **Google Chrome** (and other Chromium browsers) that adds an **“Open all in tabs”** button under each **day** on Steam’s calendar views, so you can open every game listed for that day in new tabs.

It runs only on Steam’s store. **No accounts, no servers, no API** — it only reads the page you already have open.

## Where it works

- [Steam personal calendar](https://store.steampowered.com/personalcalendar/)
- [Steam upcoming](https://store.steampowered.com/upcoming/)

## What you need

- **Google Chrome** (recommended), or **Microsoft Edge** (Chromium). Other Chromium-based browsers usually work the same way.
- The extension files on your computer (from a ZIP download of this repository, or by cloning the repo).

---

## Install the extension (Chrome)

These steps are for a normal user installing from a folder on your PC.

### 1. Get the extension files

**Option A — Download from GitHub**

1. Open this repository on GitHub.
2. Click **Code** → **Download ZIP**.
3. Unzip the archive somewhere you can find it (for example `Documents` or `Desktop`).
4. Open the unzipped folder. You should see a folder that contains **`manifest.json`**, **`content.js`**, and **`content.css`** directly inside it.  
   - If you see those files inside a subfolder, remember **that subfolder** is the one you’ll load in step 3.

**Option B — Git**

If you use Git, clone the repository and use the folder that contains `manifest.json` as the extension folder.

### 2. Turn on Developer Mode in Chrome

1. Open Chrome.
2. Go to **`chrome://extensions`** (paste it in the address bar and press Enter).
3. Turn **Developer mode** **on** (toggle in the top-right).

### 3. Load the extension

1. Click **Load unpacked**.
2. Choose the folder that contains **`manifest.json`** (the extension root folder — not a parent folder that doesn’t have `manifest.json` inside it).
3. The extension **“Steam calendar — open day in tabs”** should appear in your list.

### 4. Use it on Steam

1. Visit the [personal calendar](https://store.steampowered.com/personalcalendar/) or [upcoming](https://store.steampowered.com/upcoming/) while signed in to Steam as usual.
2. Under each day’s date you should see **Open all in tabs**.
3. Click it to open each game for **that day** in a new tab.

If you don’t see the buttons, refresh the page (**Ctrl+R** or **F5**).

---

## Install the extension (Microsoft Edge)

1. Open **`edge://extensions`**.
2. Enable **Developer mode** (usually in the lower-left).
3. Click **Load unpacked** and select the same folder that contains **`manifest.json`**.

---

## Tips and troubleshooting

- **Many tabs at once:** Your browser may limit how many tabs open from one click, or ask you to allow pop-ups for `store.steampowered.com`. If tabs don’t all open, check Chrome’s pop-up settings for that site.
- **Buttons missing after an update:** Go to **`chrome://extensions`**, find this extension, and click **Reload**. Then refresh the Steam page.
- **Wrong folder loaded:** The extension only loads if you picked the folder that **directly** contains `manifest.json`. If Chrome shows an error, go up or down one folder level and try **Load unpacked** again.

---

## Privacy

This extension does not collect data, does not send your browsing activity anywhere, and does not require permissions beyond what Chrome assigns to content scripts on Steam store pages. All work happens in your browser on the Steam pages you open.

## License

This project is released under the **[MIT License](https://opensource.org/licenses/MIT)** — see [`LICENSE`](LICENSE). You may use, modify, and distribute the code freely. If you redistribute copies, keep the copyright and license notice with them (standard MIT requirement). This is a normal open-source license; it does not turn the project into a commercial product on its own.

## Steam / Valve

This extension is **not affiliated with Valve or Steam**. It only automates what you could do manually (opening store pages in new tabs from links already on the page). It does not scrape private data, bypass security, or interact with Steam’s servers beyond normal browsing.

Your use of **Steam** is still governed by **[Valve’s agreements](https://store.steampowered.com/subscriber_agreement/)** and other policies they publish. If you are unsure whether something is allowed, read those terms — this README is not legal advice.
