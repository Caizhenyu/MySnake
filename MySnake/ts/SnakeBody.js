var MySnake;
(function (MySnake) {
    var MoveDirection;
    (function (MoveDirection) {
        MoveDirection[MoveDirection["Up"] = 0] = "Up";
        MoveDirection[MoveDirection["Right"] = 1] = "Right";
        MoveDirection[MoveDirection["Down"] = 2] = "Down";
        MoveDirection[MoveDirection["Left"] = 3] = "Left";
    })(MoveDirection = MySnake.MoveDirection || (MySnake.MoveDirection = {}));
    var SnakeBody = /** @class */ (function () {
        function SnakeBody(x, y) {
            this.X = x;
            this.Y = y;
        }
        return SnakeBody;
    }());
    MySnake.SnakeBody = SnakeBody;
})(MySnake || (MySnake = {}));
//# sourceMappingURL=SnakeBody.js.map