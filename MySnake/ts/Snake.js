var MySnake;
(function (MySnake) {
    var Snake = /** @class */ (function () {
        function Snake() {
            var _this = this;
            //蛇身
            this.Bodies = new Array();
            //速度
            this.Speed = 250;
            //是否已暂停
            this.IsPaused = true;
            //初始化行数
            this.RowCount = 30;
            //初始化列数
            this.ColumnCount = 30;
            this.Pause = function () {
                clearInterval(this.Timer);
                this.IsPaused = true;
                MySnake.Draw.Paint(this.Bodies, this.Container);
            };
            this.MoveNextStep = function () {
                var nextStep = MySnake.Draw.CheckNextStep(this.Bodies, this.Direction, this.ColumnCount, this.RowCount, this.Container);
                if (nextStep == -1) {
                    alert("游戏结束");
                    this.Pause();
                    return;
                }
                if (nextStep == 1) {
                    var newBody = MySnake.Draw.GetNextPosition(this.Bodies, this.Direction);
                    this.Bodies.unshift(newBody);
                    this.GenerateDood();
                    return;
                }
                var newBody = MySnake.Draw.GetNextPosition(this.Bodies, this.Direction);
                this.Bodies.unshift(newBody);
                this.Bodies.pop();
            };
            this.Run = function () {
                var _Snake = this;
                this.Timer = setInterval(function () {
                    MySnake.Draw.Erase(_Snake.Bodies, _Snake.Container);
                    _Snake.MoveNextStep();
                    MySnake.Draw.Paint(_Snake.Bodies, _Snake.Container);
                }, this.Speed);
            };
            //产生食物
            this.GenerateDood = function () {
                var x = Math.floor(Math.random() * this.ColumnCount);
                var y = Math.floor(Math.random() * this.RowCount);
                if (!MySnake.Draw.IsCellFilled(this.Container, x, y)) {
                    this.Container.rows[y].cells[x].style.backgroundColor = "#ff0";
                }
            };
            this.Container = document.getElementById("tblContainer");
            this.Direction = Math.floor(Math.random() * 4);
            var x;
            var y;
            for (var i = 0; i < this.RowCount; i++) {
                var _Row = this.Container.insertRow(-1);
                for (var j = 0; j < this.ColumnCount; j++) {
                    _Row.insertCell(-1);
                }
            }
            for (var i = 0; i < 10; i++) {
                x = Math.floor(Math.random() * this.ColumnCount);
                y = Math.floor(Math.random() * this.RowCount);
                if (!MySnake.Draw.IsCellFilled(this.Container, x, y)) {
                    this.Container.rows[y].cells[x].style.backgroundColor = "#ff0";
                }
            }
            //产生蛇头
            while (true) {
                x = Math.floor(Math.random() * this.ColumnCount);
                y = Math.floor(Math.random() * this.RowCount);
                if (!MySnake.Draw.IsCellFilled(this.Container, x, y)) {
                    this.Container.rows[y].cells[x].style.backgroundColor = "#999";
                    var _body = new MySnake.SnakeBody(x, y);
                    this.Bodies.push(_body);
                    break;
                }
            }
            document.onkeydown = function (e) {
                switch (e.keyCode | e.which | e.charCode) {
                    case 13:
                        //回车
                        if (_this.IsPaused) {
                            _this.Run();
                            _this.IsPaused = false;
                        }
                        else {
                            _this.Pause();
                            _this.IsPaused = true;
                        }
                        break;
                    case 37:
                        //左箭头
                        //阻止射倒退走
                        if (_this.Direction == MySnake.MoveDirection.Right) {
                            break;
                        }
                        _this.Direction = MySnake.MoveDirection.Left;
                        break;
                    case 38:
                        //上箭头
                        if (_this.Direction == MySnake.MoveDirection.Down) {
                            break;
                        }
                        _this.Direction = MySnake.MoveDirection.Up;
                        break;
                    case 39:
                        //右箭头
                        if (_this.Direction == MySnake.MoveDirection.Left) {
                            break;
                        }
                        _this.Direction = MySnake.MoveDirection.Right;
                        break;
                    case 40:
                        //下箭头
                        if (_this.Direction == MySnake.MoveDirection.Up) {
                            break;
                        }
                        _this.Direction = MySnake.MoveDirection.Down;
                        break;
                }
            };
        }
        return Snake;
    }());
    window.onload = function (e) {
        var _Snake = new Snake();
    };
})(MySnake || (MySnake = {}));
//# sourceMappingURL=Snake.js.map