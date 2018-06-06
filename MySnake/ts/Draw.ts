module MySnake {
    export class Draw {

        //擦除蛇身
        static Erase(p_Bodies: Array<SnakeBody>, p_Table: HTMLTableElement): void {
            for (var i = 0; i < p_Bodies.length; i++) {
                this.EraseDot(p_Bodies[i].X, p_Bodies[i].Y, p_Table);
            }
        }

        //擦除点
        private static EraseDot(x: number, y: number, p_Table: HTMLTableElement): void {
            (<HTMLTableCellElement>(<HTMLTableRowElement>p_Table.rows[y]).cells[x]).style.backgroundColor = "";
        }

        //绘制蛇身
        static Paint(p_Bodies: Array<SnakeBody>, p_Table: HTMLTableElement): void {
            for (var i = 0; i < p_Bodies.length; i++) {
                this.PaintDot(p_Bodies[i].X, p_Bodies[i].Y, p_Table);
            }
        }

        //绘制点
        private static PaintDot(x: number, y: number, p_Table: HTMLTableElement): void {
            (<HTMLTableCellElement>(<HTMLTableRowElement>p_Table.rows[y]).cells[x]).style.backgroundColor = "#999";
        }

        static CheckNextStep(p_Bodies: Array<SnakeBody>, p_Direction: MoveDirection, p_ColumnCount: number, p_RowCount: number, p_Table: HTMLTableElement): number {
            var _NewBody: SnakeBody = this.GetNextPosition(p_Bodies, p_Direction);

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
        }

        //获得蛇头运行下一节点
        static GetNextPosition(p_Bodies: Array<SnakeBody>, p_Direction: MoveDirection): SnakeBody {
            var x = p_Bodies[0].X;
            var y = p_Bodies[0].Y;

            switch (p_Direction) {
                case MoveDirection.Up:
                    y--;
                    break;
                case MoveDirection.Right:
                    x++;
                    break;
                case MoveDirection.Down:
                    y++;
                    break;
                case MoveDirection.Left:
                    x--;
                    break;
            }

            //返回蛇头
            return new SnakeBody(x, y);
        }

        //单元格是否被填充
        static IsCellFilled(p_Table: HTMLTableElement, x: number, y: number): boolean {
            if ((<HTMLTableCellElement>(<HTMLTableRowElement>p_Table.rows[y]).cells[x]).style.backgroundColor == "") {
                return false;
            }
            return true;
        }
    }
}
