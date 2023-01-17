# Crypto Tools

## Design Goals

### Everything Client Side (no backend needed)
I do not want to know about your crypto data points, even the ones that are publicly readable on-chain.
Neither do I care about how much you are using this tool, what annotations you add, your ip address, your name, etc.

No backend arguably also simplifies development and hosting.

No backend is possible because your most essential crypto data points (i.e. transactions) are publicly readable on-chain, once you enter your wallet address into this/any app. Any other info that you enter will be stored in your browser's local storage (and never leave your computer!). I recommend that you consider this data as ephemeral, i.e. chances are high you'll lose it. Be careful with clearing cookies etc. if this data is dear to you! A nice-to-have for this site would be the ability to export and import the locally stored data, so you can easily make backups should you wish. Who knows, even an (encrypted?) Google Drive, iCloud, Dropbox... integration?

## Delightfully Ugly
I do not give a damn about the looks of this site, as long as it's usable.

## Roadmap

### TODOs
- build persistence layer around local storage

### Nice-to-haves
- export and import data from local storage
- consider: if not all page state is reflected in the url, how can folks easily share their progress?

### Distant future
- backup data from local storage to Google Drive, iCloud, Dropbox... (encrypted?!)

## Cheat Sheet
- `npm start`
- `npm test`
- `npm run build`
- `npm run eject` (escape from [Create React App](https://create-react-app.dev/),
irrevocable!)
