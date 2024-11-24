/**
 * Process the raw CSV of dog licenses into a list of mostly unique dogs with an unexpired
 * licence, remove duplicates, normalise names (remove unknown names, fix weird formatting),
 * calculate total breed split counts, and total gender split counts
 *
 * eg. The CSV has a male Shih Tzu called 'Sachel' born in 2007, located in ZIP 10016 with 5
 * entries, 2 of which are for a licence expiring in 2025; this reduces them to a single entry
 */

import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import neatCsv from "neat-csv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// shoutout to whoever has logged 300+ dog names as "unknowed"
const omitList = ["UNKNOWN", "UNKNOWED", "NOT PROVIDED", "."];

const readDogs = async () => {
  const csv = readFileSync(
    path.resolve(__dirname, "./NYC_Dog_Licensing_Dataset_20241117.csv")
  );
  const dogs = await neatCsv(csv);
  return dogs;
};

const writeDogs = (dogs) => {
  const output = path.resolve(__dirname, "./formatteddogs.json");
  writeFileSync(output, "");
  writeFileSync(output, JSON.stringify(dogs));
};

const processDogs = (input) =>
  input
    .map((current) => ({
      ...current,
      AnimalName: current.AnimalName.toLowerCase()
        .replace(/(^|\s|\.)([a-z])/g, (match) => match.toUpperCase())
        .replace(/([A-Z])([A-Z])(?=\s|$)/g, "$1.$2")
        .replace(/([A-Z]\.[A-Z])(?=\s|$)/g, "$1.")
        .replace(/([A-Z])(?=\s|$)/g, "$1")
        .split(/[^a-zA-Z ]+/)[0]
        .trim(),
    }))
    .reduce((list, current) => {
      /**
       * Omit dogs with invalid/unknown names
       */
      const isValidName =
        current.AnimalName &&
        !omitList.some((term) =>
          current.AnimalName.toUpperCase().includes(term)
        );

      if (!isValidName) {
        console.log(
          chalk.yellowBright(current.AnimalName),
          chalk.red("✍️  [INVALID NAME]"),
          chalk.redBright("Skipped")
        );
        return list;
      }

      /**
       * Omit dogs where the entry is for a licence that expired before the dataset
       * was last generated (06/02/24)
       */
      const isExpired =
        new Date(current.LicenseExpiredDate) < new Date("06/02/2024");

      if (isExpired) {
        console.log(
          chalk.yellowBright(current.AnimalName),
          chalk.red("📆 [EXPIRED]"),
          chalk.redBright("Skipped")
        );
        return list;
      }

      /**
       * Omit dogs that are almost certainly duplicates by identical name,
       * birth year, zip code, gender and breed
       */
      const isDuplicate = list.find(
        (existing) =>
          existing.AnimalName === current.AnimalName &&
          existing.AnimalBirthYear === current.AnimalBirthYear &&
          existing.AnimalGender === current.AnimalGender &&
          existing.BreedName === current.BreedName &&
          existing.ZipCode === current.ZipCode
      );

      if (isDuplicate) {
        console.log(
          chalk.yellowBright(current.AnimalName),
          chalk.red("👯‍♀️ [DUPLICATE]"),
          chalk.redBright("Skipped")
        );
        return list;
      }

      console.log(
        chalk.yellowBright(current.AnimalName),
        chalk.greenBright("Passed")
      );

      return [...list, current];
    }, [])
    .reduce((list, current) => {
      /**
       * Remove 'crossbreed' and other additional data to attempt to combine
       * into a single base breed
       */
      const normalisedCurrentBreed = current.BreedName.replace(
        /crossbreed/i,
        ""
      )
        .split(/[^a-zA-Z ]+/)[0]
        .toLowerCase()
        .replace(/\b[a-z]/g, (match) => match.toUpperCase())
        .trim();

      /**
       * Determine if the breed is also a placeholder/unknown breed
       */
      const isValidBreed =
        current.BreedName &&
        !omitList.some((term) =>
          current.BreedName.toUpperCase().includes(term)
        );

      const isExistingName = list.some(
        ({ name }) => name === current.AnimalName
      );

      const output = isExistingName
        ? list.map((item) =>
            item.name === current.AnimalName
              ? {
                  name: item.name,
                  count: item.count + 1,
                  breeds: isValidBreed
                    ? Object.keys(item.breeds).some(
                        (breed) => breed === normalisedCurrentBreed
                      )
                      ? {
                          ...item.breeds,
                          [normalisedCurrentBreed]:
                            item.breeds[normalisedCurrentBreed] + 1,
                        }
                      : { ...item.breeds, [normalisedCurrentBreed]: 1 }
                    : item.breeds,
                  genders: {
                    ...item.genders,
                    [current.AnimalGender]:
                      (item.genders[current.AnimalGender] || 0) + 1,
                  },
                }
              : item
          )
        : [
            ...list,
            {
              name: current.AnimalName,
              count: 1,
              breeds: isValidBreed ? { [normalisedCurrentBreed]: 1 } : {},
              genders: {
                [current.AnimalGender]: 1,
              },
            },
          ];

      console.log(
        chalk.yellowBright(current.AnimalName),
        chalk.white(current.BreedName, `(${current.AnimalGender})`),
        " > ",
        chalk.yellowBright(current.AnimalName),
        chalk.white(normalisedCurrentBreed),
        isExistingName ? chalk.gray("[APPEND]") : chalk.greenBright("[CREATE]")
      );

      return output;
    }, []);

const run = async () => {
  const input = await readDogs();
  const output = processDogs(input);

  console.log(
    chalk.green("Processed"),
    chalk.greenBright(new Intl.NumberFormat("en-US").format(input.length)),
    chalk.green("dogs to"),
    chalk.greenBright(new Intl.NumberFormat("en-US").format(output.length)),
    chalk.green("unique entries")
  );

  writeDogs(output);

  process.exit();
};

await run();
