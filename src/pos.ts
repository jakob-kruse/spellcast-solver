export type Vec2 = [number, number];
import { getMapSize, Map } from "./map";
export const DIRECTIONS = [
  "up",
  "down",
  "left",
  "right",
  "upleft",
  "upright",
  "downleft",
  "downright",
] as const;
export type Direction = typeof DIRECTIONS[number];

export function getPossibleDirectionsForPosOnMap(
  map: Map,
  pos: Vec2
): Direction[] {
  const [x, y] = pos;
  const [width, height] = getMapSize(map);
  const directions: Direction[] = [];
  if (y > 0) directions.push("up");
  if (y < height - 1) directions.push("down");
  if (x > 0) directions.push("left");
  if (x < width - 1) directions.push("right");
  if (y > 0 && x > 0) directions.push("upleft");
  if (y > 0 && x < width - 1) directions.push("upright");
  if (y < height - 1 && x > 0) directions.push("downleft");
  if (y < height - 1 && x < width - 1) directions.push("downright");
  return directions;
}

export function translate([x, y]: Vec2, dir: Direction): Vec2 {
  switch (dir) {
    case "up":
      return [x, y - 1];
    case "down":
      return [x, y + 1];
    case "left":
      return [x - 1, y];
    case "right":
      return [x + 1, y];
    case "upleft":
      return [x - 1, y - 1];
    case "upright":
      return [x + 1, y - 1];
    case "downleft":
      return [x - 1, y + 1];
    case "downright":
      return [x + 1, y + 1];
  }
}

export function directionToSymbol(dir: Direction) {
  switch (dir) {
    case "up":
      return "↑";
    case "down":
      return "↓";
    case "left":
      return "←";
    case "right":
      return "→";
    case "upleft":
      return "↖️";
    case "upright":
      return "↗️";
    case "downleft":
      return "↙️";
    case "downright":
      return "↘️";
  }
}
