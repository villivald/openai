import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const prompt =
  "singer Timo Soini from Finland wins the Eurovision Song Contest 2023";

const result = await openai.createImage({
  prompt,
  n: 1,
  size: "1024x1024",
});

const url = result.data.data[0].url;

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());

writeFileSync(`./img/${Date.now()}.png`, buffer);
