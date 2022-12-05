import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
import fetch from "node-fetch";
import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const src = "./img/test.png";

const result = await openai.createImageVariation(
  fs.createReadStream(src),
  1,
  "1024x1024"
);

const url = result.data.data[0].url;

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());

writeFileSync(`./img/${Date.now()}.png`, buffer);
