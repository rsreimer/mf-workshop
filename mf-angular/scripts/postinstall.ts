import { readFileSync, writeFileSync, existsSync } from "fs";

if (!existsSync(".name")) {
  const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

  packageJson.name = "xxxxxxxxxxxxxxx".replace(/x/g, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26)),
  );

  writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
  writeFileSync(".name", packageJson.name);
}
