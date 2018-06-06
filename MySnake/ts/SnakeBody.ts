module MySnake {
    export enum MoveDirection {
        Up = 0,
        Right = 1,
        Down = 2,
        Left = 3
    }

    export class SnakeBody {
        X: number;
        Y: number;

        constructor(x: number, y: number) {
            this.X = x;
            this.Y = y;
        }
    }
}