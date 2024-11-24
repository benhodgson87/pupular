import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import Redis from "ioredis";
import pLimit from "p-limit";

/**
 * Bulk upload the formatted output to Upstash Redis,
 * rate limited to avoid hitting consecutive command limits (1000 per second)
 */

const client = new Redis(
  `rediss://default:${
    process.env.UPSTASH_REDIS_REST_TOKEN
  }@${process.env.UPSTASH_REDIS_REST_URL.replace("https://", "")}:6379`
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dogs = JSON.parse(
  readFileSync(path.resolve(__dirname, "./formatteddogs.json"), "utf-8")
);

const limit = pLimit(500);

await Promise.all(
  dogs.map((dog) =>
    limit(async () => {
      const key = `dog:${crypto.randomUUID()}`;
      const payload = {
        name: dog.name,
        count: dog.count,
        breeds: JSON.stringify(dog.breeds),
        genders: JSON.stringify(dog.genders),
      };

      await client.hset(key, payload);

      console.log(
        chalk.green("Setting"),
        chalk.white(dog.name),
        chalk.gray(">"),
        chalk.yellow(key),
        chalk.white(JSON.stringify(payload))
      );
    })
  )
);

process.exit();
