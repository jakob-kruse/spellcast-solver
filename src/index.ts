import { readFile } from "fs/promises";
import { findDirectionsForWord, loadMap, loadMapString } from "./map";
import { Direction, directionToSymbol } from "./pos";

(async () => {
  const wordsContent = await readFile("./words.txt", "utf8");
  const words = wordsContent.split("\n").filter((w) => w.length >= 2);

  const mapString = await readFile("./map.txt", "utf8");
  const map = loadMap(loadMapString(mapString), 5);

  let foundWords: [string, Direction[][]][] = [];
  for (const word of words) {
    const dirs = findDirectionsForWord(map, word.toUpperCase());

    if (dirs.length > 0) {
      foundWords.push([word.toUpperCase(), dirs]);
    }
  }

  const sorted = foundWords.sort(([a], [b]) => a.length - b.length);

  for (const [word, allDirs] of sorted) {
    console.log(`\n${word.split("").join(" ")} (${word.length})`);

    for (const dirs of allDirs) {
      const path = dirs.map(directionToSymbol).join(" ");
      console.log("  " + path);
    }
  }
})();
