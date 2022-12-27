import {getPathCommandsForLine} from "./line.utils";
import {getBounds} from "./bounds.util";
import {Point} from "../models/point";

export function getPathCommandsForPolygon(points: Point[]) {
  const lineForPoints = getPathCommandsForLine(points);
  const bounds = getBounds(points);
  const lineToBottomRight = `L ${bounds.maxX}, ${bounds.maxY}`;
  const lineToBottomLeft = `L ${bounds.minX}, ${bounds.maxY}`;
  const closePath = "Z";

  return `${lineForPoints} ${lineToBottomRight} ${lineToBottomLeft} ${closePath}`;
}
