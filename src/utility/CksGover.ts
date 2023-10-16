
import { Coordinate } from "../types/type";

export const checkGover = (sviewHead: Coordinate, boundaries: any): boolean => {

    return (
        sviewHead.x < boundaries.xMin ||
        sviewHead.x > boundaries.xMax ||
        sviewHead.y < boundaries.yMin ||
        sviewHead.y > boundaries.yMax
    )

};