/**
 * Process the raw CSV of individual dogs into a list of dogs with a license expiring in 2024
 * to remove duplicate licenses, reduced to unique normalised names (remove unknown dogs, fix
 * weird formatting), calculating per breed count, and gender split count
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
    path.resolve(__dirname, "./NYC_Dog_Licensing_Dataset_20241117.csv"),
  );
  const dogs = await neatCsv(csv);
  return dogs;
};

const writeDogs = (dogs) => {
  const output = path.resolve(__dirname, "./formatteddogs.json");
  writeFileSync(output, "");
  writeFileSync(output, JSON.stringify(dogs));
};

const reduceDogs = (input) =>
  input.reduce((list, current) => {
    const normalisedCurrentName = current.AnimalName.toLowerCase()
      .replace(/(^|\s|\.)([a-z])/g, (match) => match.toUpperCase())
      .replace(/([A-Z])([A-Z])(?=\s|$)/g, "$1.$2")
      .replace(/([A-Z]\.[A-Z])(?=\s|$)/g, "$1.")
      .replace(/([A-Z])(?=\s|$)/g, "$1")
      .split(/[^a-zA-Z ]+/)[0]
      .trim();

    const normalisedCurrentBreed = current.BreedName.replace(/crossbreed/i, "")
      .split(/[^a-zA-Z ]+/)[0]
      .toLowerCase()
      .replace(/\b[a-z]/g, (match) => match.toUpperCase())
      .trim();

    const isValidName =
      current.AnimalName &&
      !omitList.some((term) => current.AnimalName.toUpperCase().includes(term));

    const isValidBreed =
      current.BreedName &&
      !omitList.some((term) => current.BreedName.toUpperCase().includes(term));

    const isExistingName = list.some(
      ({ name }) => name === normalisedCurrentName,
    );

    const isValidLicence =
      new Date(current.LicenseExpiredDate) > new Date("01/01/2024");

    const output =
      isValidName && isValidLicence
        ? isExistingName
          ? list.map((item) =>
              item.name === normalisedCurrentName
                ? {
                    name: item.name,
                    count: item.count + 1,
                    breeds: isValidBreed
                      ? Object.keys(item.breeds).some(
                          (breed) => breed === normalisedCurrentBreed,
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
                : item,
            )
          : [
              ...list,
              {
                name: normalisedCurrentName,
                count: 1,
                breeds: isValidBreed ? { [normalisedCurrentBreed]: 1 } : {},
                genders: {
                  [current.AnimalGender]: 1,
                },
              },
            ]
        : list;

    console.log(
      chalk.yellowBright(current.AnimalName),
      chalk.white(current.BreedName, `(${current.AnimalGender})`),
      " > ",
      chalk.yellowBright(normalisedCurrentName),
      chalk.white(normalisedCurrentBreed),
      !isValidName || !isValidLicence
        ? chalk.red(
            "[SKIP]",
            !isValidName ? "[INVALID NAME]" : undefined,
            !isValidLicence ? "[EXPIRED LICENCE]" : undefined,
          )
        : isExistingName
          ? chalk.gray("[APPEND]")
          : chalk.greenBright("[CREATE]"),
    );

    return output;
  }, []);

const run = async () => {
  const input = await readDogs();
  const output = reduceDogs(input);

  console.log(
    chalk.green("Processed"),
    chalk.greenBright(new Intl.NumberFormat("en-US").format(input.length)),
    chalk.green("dogs to"),
    chalk.greenBright(new Intl.NumberFormat("en-US").format(output.length)),
    chalk.green("unique entries"),
  );

  writeDogs(output);
};

await run();
