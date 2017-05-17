'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('uuid');

var _lodash = require('lodash.keys');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.throttle');

var _lodash4 = _interopRequireDefault(_lodash3);

var _reactDisplayName = require('react-display-name');

var _reactDisplayName2 = _interopRequireDefault(_reactDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var resizeListener = void 0;
var listeners = {};

var Sizes = function Sizes() {
  for (var _len = arguments.length, mappedSizesToProps = Array(_len), _key = 0; _key < _len; _key++) {
    mappedSizesToProps[_key] = arguments[_key];
  }

  return function (WrappedComponent) {
    var _class, _temp;

    var parseMappedSizesToProps = function parseMappedSizesToProps(_ref) {
      var width = _ref.width,
          height = _ref.height;

      var propsToPass = mappedSizesToProps.map(function (check) {
        return check({ width: width, height: height });
      }).reduce(function (acc, props) {
        return _extends({}, acc, props);
      }, {});
      return propsToPass;
    };

    return _temp = _class = function (_Component) {
      _inherits(_class, _Component);

      function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.state = {
          id: 'A' + (0, _uuid.v4)(),
          propsToPass: {}
        };

        _this.dispatchSizes = function () {
          (0, _lodash2.default)(listeners).forEach(function (key) {
            var callback = listeners[key];

            if (typeof callback === 'function') {
              callback({
                width: typeof window !== 'undefined' && window.innerWidth,
                height: typeof window !== 'undefined' && window.innerHeight
              });
            }
          });
        };

        _this.throttledWindowResize = (0, _lodash4.default)(_this.dispatchSizes, 200);

        _this.state.propsToPass = parseMappedSizesToProps({
          width: typeof window !== 'undefined' && window.innerWidth,
          height: typeof window !== 'undefined' && window.innerHeight
        });
        return _this;
      }

      _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          if (!resizeListener) {
            resizeListener = window.addEventListener('resize', this.throttledWindowResize);
          }

          listeners[this.state.id] = function (dimensions) {
            return _this2.setState({ propsToPass: parseMappedSizesToProps(dimensions) });
          };
          this.dispatchSizes();
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          delete listeners[this.state.id];
          if ((0, _lodash2.default)(listeners).length < 1) {
            window.removeEventListener('resize', this.throttledWindowResize);
            resizeListener = null;
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state.propsToPass));
        }
      }]);

      return _class;
    }(_react.Component), _class.displayName = 'Sizes(' + (0, _reactDisplayName2.default)(WrappedComponent) + ')', _temp;
  };
};

Sizes.isMobile = function (_ref2) {
  var width = _ref2.width;
  return width < 480;
};
Sizes.isTablet = function (_ref3) {
  var width = _ref3.width;
  return width >= 480 && width < 1024;
};
Sizes.isDesktop = function (_ref4) {
  var width = _ref4.width;
  return width >= 1024;
};

Sizes.isGtMobile = function (sizes) {
  return !Sizes.isMobile(sizes);
};
Sizes.isGtTablet = function (sizes) {
  return Sizes.isDesktop(sizes);
};

Sizes.isStTablet = function (sizes) {
  return Sizes.isMobile(sizes);
};
Sizes.isStDesktop = function (sizes) {
  return !Sizes.isStDesktop(sizes);
};

Sizes.isTabletAndGreater = function (sizes) {
  return !Sizes.isMobile(sizes);
};
Sizes.isTabletAndSmaller = function (sizes) {
  return !Sizes.isStDesktop(sizes);
};

exports.default = Sizes;
//# sourceMappingURL=Sizes.js.map