module MySnake {
    class Snake {
        //容器类
        Container: HTMLTableElement;
        //蛇身
        Bodies: Array<SnakeBody> = new Array();
        //方向
        Direction: MoveDirection;
        //速度
        private Speed: number = 250;
        //是否已暂停
        private IsPaused: boolean = true;
        //初始化行数
        private RowCount: number = 30;
        //初始化列数
        private ColumnCount: number = 30;
        //计时器
        private Timer: number;

        constructor() {
            this.Container = <HTMLTableElement>document.getElementById("tblContainer");
            this.Direction = Math.floor(Math.random() * 4);
            var x: number;
            var y: number;

            for (var i = 0; i < this.RowCount; i++) {
                var _Row = <HTMLTableRowElement>this.Container.insertRow(-1);
                for (var j = 0; j < this.ColumnCount; j++) {
                    _Row.insertCell(-1);
                }
            }

            for (var i = 0; i < 10; i++) {
                x = Math.floor(Math.random() * this.ColumnCount);
                y = Math.floor(Math.random() * this.RowCount);

                if (!Draw.IsCellFilled(this.Container, x, y)) {
                    (<HTMLTableCellElement>(<HTMLTableRowElement>this.Container.rows[y]).cells[x]).style.backgroundColor = "#ff0";
                }
            }

            //产生蛇头
            while (true) {
                x = Math.floor(Math.random() * this.ColumnCount);
                y = Math.floor(Math.random() * this.RowCount);

                if (!Draw.IsCellFilled(this.Container, x, y)) {
                    (<HTMLTableCellElement>(<HTMLTableRowElement>this.Container.rows[y]).cells[x]).style.backgroundColor = "#999";

                    var _body = new SnakeBody(x, y);
                    this.Bodies.push(_body);
                    break;
                }
            }

            document.onkeydown = (e) => {
                switch (e.keyCode | e.which | e.charCode) {
                    case 13:
                        //回车
                        if (this.IsPaused) {
                            this.Run();
                            this.IsPaused = false;
                        }
                        else {
                            this.Pause();
                            this.IsPaused = true;
                        }
                        break;
                    case 37:
                        //左箭头
                        //阻止射倒退走
                        if (this.Direction == MoveDirection.Right) {
                            break;
                        }
                        this.Direction = MoveDirection.Left;
                        break;
                    case 38:
                        //上箭头
                        if (this.Direction == MoveDirection.Down) {
                            break;
                        }
                        this.Direction = MoveDirection.Up;
                        break;
                    case 39:
                        //右箭头
                        if (this.Direction == MoveDirection.Left) {
                            break;
                        }
                        this.Direction = MoveDirection.Right;
                        break;
                    case 40:
                        //下箭头
                        if (this.Direction == MoveDirection.Up) {
                            break;
                        }
                        this.Direction = MoveDirection.Down;
                        break;
                }
            }
        }
        
        Pause = function () {
            clearInterval(this.Timer);
            this.IsPaused = true;
            Draw.Paint(this.Bodies, this.Container);
        }

        MoveNextStep = function () {
            var nextStep = Draw.CheckNextStep(this.Bodies, this.Direction, this.ColumnCount, this.RowCount, this.Container);

            if (nextStep == -1) {
                alert("游戏结束");
                this.Pause();
                return;
            }
            if (nextStep == 1) {
                var newBody = Draw.GetNextPosition(this.Bodies, this.Direction);
                this.Bodies.unshift(newBody);
                this.GenerateDood();
                return;
            }
            var newBody = Draw.GetNextPosition(this.Bodies, this.Direction);
            this.Bodies.unshift(newBody);
            this.Bodies.pop();
        }

        Run = function () {
            var _Snake = this;
            this.Timer = setInterval(function () {
                Draw.Erase(_Snake.Bodies, _Snake.Container);
                _Snake.MoveNextStep();
                Draw.Paint(_Snake.Bodies, _Snake.Container);
            }, this.Speed);
        }

        //产生食物
        GenerateDood = function () {
            var x = Math.floor(Math.random() * this.ColumnCount);
            var y = Math.floor(Math.random() * this.RowCount);

            if (!Draw.IsCellFilled(this.Container, x, y)) {
                (<HTMLTableCellElement>(<HTMLTableRowElement>this.Container.rows[y]).cells[x]).style.backgroundColor = "#ff0";
            }
        }
    }

    window.onload = (e) => {
        var _Snake = new Snake();
    }
}