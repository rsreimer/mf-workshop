import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { createWriteStream, readFileSync } from "fs";
import { rm, mkdir } from "shelljs";
import { promisify } from "util";
import { pipeline } from "stream";

const pump = promisify(pipeline);

const app = Fastify({ logger: true });

app.register(cors, { origin: "*" });
app.register(multipart);

interface Database {
  microFrontends: { name: string; url: string; secret: string }[];
}

const db = JSON.parse(readFileSync("db.json", "utf8")) as Database;

function writeDatabase() {
  //writeFileSync("db.json", JSON.stringify(db, null, 2));
}

app.get("/micro-frontend", async () => {
  return db.microFrontends.map((mf) => ({
    ...mf,
    secret: undefined,
  }));
});

app.put("/micro-frontend/:name/:secret", async (request) => {
  const { name, secret } = request.params as any;
  const { url } = request.body as any;

  const microFrontend = db.microFrontends.find((mf) => mf.name === name);

  if (!microFrontend) {
    db.microFrontends.push({ name, url, secret });
    writeDatabase();
  } else if (microFrontend.secret === secret) {
    microFrontend.url = url;
    writeDatabase();
  } else {
    throw new Error("secret did not match");
  }
});

app.put("/micro-frontend/:name/:secret/files", async (request) => {
  const { name, secret } = request.params as any;

  const microFrontend = db.microFrontends.find((mf) => mf.name === name);

  if (microFrontend && microFrontend.secret !== secret) {
    throw new Error("Micro frontend not found or secret did not match");
  }

  if (!microFrontend) {
    db.microFrontends.push({
      name,
      url: `http://164.92.164.40/micro-frontends/${name}`,
      secret,
    });
    writeDatabase();
  }

  rm(`-rf`, `./micro-frontends/${name}`);
  mkdir(`-p`, `./micro-frontends/${name}`);

  const parts = request.files();

  for await (const part of parts) {
    await pump(
      part.file,
      createWriteStream(`./micro-frontends/${name}/${part.filename}`),
    );
  }
});

async function start() {
  try {
    await app.listen({ port: 4000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
