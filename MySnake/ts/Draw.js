var MySnake;
(function (MySnake) {
    var Draw = /** @class */ (function () {
        function Draw() {
        }
        //擦除蛇身
        Draw.Erase = function (p_Bodies, p_Table) {
            for (var i = 0; i < p_Bodies.length; i++) {
                this.EraseDot(p_Bodies[i].X, p_Bodies[i].Y, p_Table);
            }
        };
        //擦除点
        Draw.EraseDot = function (x, y, p_Table) {
            p_Table.rows[y].cells[x].style.backgroundColor = "";
        };
        //绘制蛇身
        Draw.Paint = function (p_Bodies, p_Table) {
            for (var i = 0; i < p_Bodies.length; i++) {
                this.PaintDot(p_Bodies[i].X, p_Bodies[i].Y, p_Table);
            }
        };
        //绘制点
        Draw.PaintDot = function (x, y, p_Table) {
            p_Table.rows[y].cells[x].style.backgroundColor = "#999";
        };
        Draw.CheckNextStep = function (p_Bodies, p_Direction, p_ColumnCount, p_RowCount, p_Table) {
            var _NewBody = this.GetNextPosition(p_Bodies, p_Direction);
            //边界
            if (_NewBody.X < 0 || _NewBody.X >= p_ColumnCount || _NewBody.Y < 0 || _NewBody.Y >= p_RowCount) {
                return -1;
            }
            //碰到蛇身
            for (var i = 0; i < p_Bodies.length; i++) {
                if (p_Bodies[i].X == _NewBody.X && p_Bodies[i].Y == _NewBody.Y) {
                    return -1;
                }
            }
            //有食物
            if (this.IsCellFilled(p_Table, _NewBody.X, _NewBody.Y)) {
                return 1;
            }
            //空白继续运行
            return 0;
        };
        //获得蛇头运行下一节点
        Draw.GetNextPosition = function (p_Bodies, p_Direction) {
            var x = p_Bodies[0].X;
            var y = p_Bodies[0].Y;
            switch (p_Direction) {
                case MySnake.MoveDirection.Up:
                    y--;
                    break;
                case MySnake.MoveDirection.Right:
                    x++;
                    break;
                case MySnake.MoveDirection.Down:
                    y++;
                    break;
                case MySnake.MoveDirection.Left:
                    x--;
                    break;
            }
            //返回蛇头
            return new MySnake.SnakeBody(x, y);
        };
        //单元格是否被填充
        Draw.IsCellFilled = function (p_Table, x, y) {
            if (p_Table.rows[y].cells[x].style.backgroundColor == "") {
                return false;
            }
            return true;
        };
        return Draw;
    }());
    MySnake.Draw = Draw;
})(MySnake || (MySnake = {}));
//# sourceMappingURL=Draw.js.map