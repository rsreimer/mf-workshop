import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { randomUUID } from "crypto";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const ORIGIN = "https://where-ever-the-backend-is-hosted.com";

if (!existsSync(".secret")) {
  writeFileSync(".secret", randomUUID());
}

const secret = readFileSync(".secret", "utf-8");
const name = JSON.parse(readFileSync("./package.json", "utf-8")).name;

const form = new FormData();

const files = readdirSync("./dist");

files
  .filter((file) => !file.endsWith(".map") && file !== "3rdpartylicenses.txt")
  .forEach((file) => {
    form.append("file", fs.createReadStream(`./dist/${file}`), {
      filename: file,
    });
  });

const url = `${ORIGIN}/micro-frontend/${name}/${secret}/files`;

axios.put(url, form, { headers: form.getHeaders() });
