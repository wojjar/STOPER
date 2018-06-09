"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.state = {
            isRunning: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "reset",
        value: function reset() {
            if (!this.state.running) {
                this.setState({
                    times: {
                        minutes: 0,
                        seconds: 0,
                        miliseconds: 0
                    }
                });
            }
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.isRunning) {
                this.setState({ isRunning: true });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.state.isRunning) return;
            this.calculate();
        }
    }, {
        key: "calculate",
        value: function calculate() {
            var times = this.state.times;
            times.miliseconds += 1;

            if (times.miliseconds >= 100) {
                times.seconds += 1;
                times.miliseconds = 0;
            }
            if (times.seconds >= 60) {
                times.minutes += 1;
                times.seconds = 0;
            }
            this.setState({ times: times });
        }
    }, {
        key: "stop",
        value: function stop() {
            this.setState({ isRunning: false });
            clearInterval(this.watch);
        }
    }, {
        key: "save",
        value: function save() {
            var _this3 = this;

            this.setState(function (prevState) {
                return {
                    results: [].concat(_toConsumableArray(prevState.results), [format(_this3.state.times)])
                };
            });
        }
    }, {
        key: "delete",
        value: function _delete() {
            var x = confirm("Are you sure ?");
            if (x) {
                this.setState({ results: [] });
            }
        }
    }, {
        key: "getList",
        value: function getList() {
            return this.state.results.map(function (item, index) {
                return React.createElement(
                    "li",
                    { key: index },
                    index + 1 + ". " + item
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "nav",
                    { className: "controls" },
                    React.createElement(
                        "button",
                        { type: "button", className: "btn btn-success", onClick: function onClick() {
                                return _this4.start();
                            } },
                        "Start"
                    ),
                    React.createElement(
                        "button",
                        { type: "button", className: "btn btn-danger", onClick: function onClick() {
                                return _this4.stop();
                            } },
                        "Stop"
                    ),
                    React.createElement(
                        "button",
                        { type: "button", className: "btn btn-secondary ", onClick: function onClick() {
                                return _this4.reset();
                            } },
                        "Reset"
                    ),
                    React.createElement(
                        "button",
                        { type: "button", className: "btn btn btn-info", onClick: function onClick() {
                                return _this4.save();
                            } },
                        "Save"
                    ),
                    React.createElement(
                        "button",
                        { type: "button", className: "btn btn-warning", onClick: function onClick() {
                                return _this4.delete();
                            } },
                        "Delete Results"
                    )
                ),
                React.createElement(
                    "div",
                    { className: "stopwatch" },
                    format(this.state.times)
                ),
                React.createElement(
                    "p",
                    null,
                    "THE RESULTS"
                ),
                React.createElement(
                    "ul",
                    { className: "list-result" },
                    this.getList()
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

var pad0 = function pad0(value) {
    var result = value.toString();
    return result.length < 2 ? "0" + result : result;
};
var format = function format(times) {
    return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
};

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
