(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './ctx-style.css'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./ctx-style.css'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.ctxStyle);
        global.index = mod.exports;
    }
})(this, function (exports, _react) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var xOffset = '';
    var yOffset = '';

    var CTXMenu = function (_React$Component) {
        _inherits(CTXMenu, _React$Component);

        function CTXMenu(props) {
            _classCallCheck(this, CTXMenu);

            var _this = _possibleConstructorReturn(this, (CTXMenu.__proto__ || Object.getPrototypeOf(CTXMenu)).call(this, props));

            _this.openContextMenu = function (event) {
                event.preventDefault();
                _this.setState({ target: event.target });

                xOffset = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                yOffset = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

                var menu = document.getElementById('contextMenu');

                menu.style.cssText = 'left: ' + (event.clientX + xOffset) + 'px;' + 'top: ' + (event.clientY + yOffset) + 'px;' + 'visibility: visible;';
            };

            _this.closeContextMenu = function (event) {

                var menu = document.getElementById('contextMenu');

                menu.style.cssText = 'left: ' + (event.clientX + xOffset) + 'px;' + 'top: ' + (event.clientY + yOffset) + 'px;' + 'visibility: visible; opacity:0;';
            };

            _this.state = {
                target: ''
            };
            return _this;
        }

        _createClass(CTXMenu, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                var context = document.getElementById(this.props.ctxId);
                context.addEventListener('contextmenu', function (event) {
                    _this2.openContextMenu(event);
                });

                var menu = document.getElementById('contextMenu');
                menu.addEventListener('mouseleave', function (event) {
                    _this2.closeContextMenu(event);
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                return _react2.default.createElement(
                    'div',
                    { id: 'contextMenu' },
                    this.props.menuItems.map(function (item) {
                        var handleClick = function handleClick(event) {
                            _this3.closeContextMenu(event);
                            item.onClick(_this3.state.target);
                        };
                        var text = item.text;
                        var image = item.image;
                        return _react2.default.createElement(
                            'span',
                            { onClick: handleClick, key: text },
                            image && _react2.default.createElement('img', { className: 'icon', src: image, alt: text }),
                            text
                        );
                    })
                );
            }
        }]);

        return CTXMenu;
    }(_react2.default.Component);

    exports.default = CTXMenu;
});