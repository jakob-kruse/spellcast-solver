import {
  Direction,
  getPossibleDirectionsForPosOnMap,
  translate,
  Vec2,
} from "./pos";

// Split the string at spaces and newlines and return an array of strings.
export function loadMapString(mapString: string): string[] {
  return mapString.split(/\s/).filter(Boolean);
}

export type Map = string[][];

export function getMapSize(map: Map): Vec2 {
  return [map[0].length, map.length];
}

export function findFirstLetterPositions(map: Map, letter: string) {
  const indeces: Vec2[] = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === letter) {
        indeces.push([y, x]);
      }
    }
  }

  return indeces;
}

export function loadMap(letters: string[], size: number): Map {
  const map: string[][] = [];

  for (let i = 0; i < letters.length; i++) {
    const x = i % size;
    const y = Math.floor(i / size);

    if (!map[x]) {
      map[x] = [];
    }

    map[x][y] = letters[i];
  }

  return map;
}

export function findMatchingNeighbor(
  map: Map,
  pos: Vec2,
  target: string,
  disallow: Vec2[] = []
): Direction[] {
  return getPossibleDirectionsForPosOnMap(map, pos).filter((dir) => {
    const neighbor = translate(pos, dir);
    const [x, y] = neighbor;
    return (
      map[x][y] === target && !disallow.some((d) => d[0] === x && d[1] === y)
    );
  });
}

export function findDirectionsForWord(
  map: Map,
  currWord: string,
  currPos: Vec2 = [-1, -1],
  currDirs: Direction[] = [],
  visited: Vec2[] = []
): Direction[][] {
  const nextLetter = currWord[1];

  if (!nextLetter) {
    return [currDirs];
  }

  const [x, y] = currPos;
  if (x === -1 && y === -1) {
    return findFirstLetterPositions(map, currWord[0])
      .map((entry) =>
        findDirectionsForWord(map, currWord, entry, currDirs, [
          ...visited,
          entry,
        ])
      )
      .reduce((acc, val) => acc.concat(val), []);
  }

  const nextDirs = findMatchingNeighbor(map, currPos, nextLetter, visited);

  if (nextDirs.length > 0) {
    return nextDirs
      .map((dir) =>
        findDirectionsForWord(
          map,
          currWord.slice(1),
          translate(currPos, dir),
          currDirs.concat(dir),
          [...visited, translate(currPos, dir)]
        )
      )
      .reduce((acc, val) => acc.concat(val), []);
  }

  return [];
}
