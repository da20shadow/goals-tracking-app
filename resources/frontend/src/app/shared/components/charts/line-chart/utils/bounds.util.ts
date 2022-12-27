import {Point} from "../models/point";
import {Bounds} from "../models/Bounds";

export function getBounds(points: Point[]): Bounds {
  return points.reduce(
    (bounds, { x, y }) => {
      return {
        minX: Math.min(x, bounds.minX),
        minY: Math.min(y, bounds.minY),
        maxX: Math.max(x, bounds.maxX),
        maxY: Math.max(y, bounds.maxY)
      };
    },
    {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity
    } as Bounds
  );
}
