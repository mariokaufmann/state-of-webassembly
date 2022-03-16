import cpy from "cpy";
import fs from "fs";

fs.rmSync("../docs", {
    recursive: true,
});

fs.mkdirSync("../docs");

await cpy('dist/**', '../docs');
