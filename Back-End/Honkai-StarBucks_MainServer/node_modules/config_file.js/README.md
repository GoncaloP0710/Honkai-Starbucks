# ConfigFile.js
A config file management library for Node.js.

## Installation
```sh-session
npm i config_file.js
```

## Usage
```js
const { ConfigFile } = require("config_file.js");

const config = new ConfigFile("./config.json", {});

run();

async function run() {
    await config.load(); // or just config.loadSync();

    config.set("a", 2); // { "a": 2 }
    config.set("b", 4); // { "a": 2, "b": 4 }

    config.get("c").set("d", []); // { "a": 2, "b": 4, "c": { "d": [] } }
    config.get("c", "d").add(6); // { "a": 2, "b": 4, "c": { "d": [6] } }

    console.log(config.get("c", "d", 0).getValue()); // Output: 6

    await config.save(); // or just config.saveSync();
}
```

Also, you can edit and save in a single line.
```js
await config.set("key", "value").save();
```
