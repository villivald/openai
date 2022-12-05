import { Configuration, OpenAIApi } from "openai";
import fs, { writeFileSync } from "fs";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

// Two images are required for this endpoint
// The first image is the source image
// The second image is the masked image
const src = "./img/test.png";
const mask = "./img/test1.png";

const result = await openai.createImageEdit(
  fs.createReadStream(src),
  fs.createReadStream(mask),
  "cat is playing video games with human",
  1,
  "1024x1024"
);

const url = result.data.data[0].url;

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());

writeFileSync(`./img/${Date.now()}.png`, buffer);
