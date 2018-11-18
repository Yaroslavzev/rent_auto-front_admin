"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _glamorous = require("glamorous");

var _glamorous2 = _interopRequireDefault(_glamorous);

var _canUseDom = require("can-use-dom");

var _canUseDom2 = _interopRequireDefault(_canUseDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Img = _glamorous2.default.img();

Img.displayName = "Img";

var Picture = function (_React$PureComponent) {
    _inherits(Picture, _React$PureComponent);

    function Picture() {
        _classCallCheck(this, Picture);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    Picture.prototype.componentDidMount = function componentDidMount() {
        // c.f. https://github.com/scottjehl/picturefill/pull/556
        var picturefill;
        try {
            picturefill = require('picturefill');
        } catch (x) {}

        if (picturefill) picturefill(); // browser
        // else node
    };

    Picture.prototype.renderSources = function renderSources() {
        var ieVersion = _canUseDom2.default && document.documentMode ? document.documentMode : -1;
        var sources = this.props.sources;


        if (sources == null) {
            return null;
        }

        var mappedSources = sources.map(function (source, index) {
            if (source.srcSet == null) {
                return null;
            }

            return _react2.default.createElement("source", {
                key: index,
                srcSet: source.srcSet,
                media: source.media,
                type: source.type
            });
        });

        // IE9 requires the sources to be wrapped around an <audio> tag.
        if (ieVersion === 9) {
            return _react2.default.createElement(
                "video",
                { style: { display: "none" } },
                mappedSources
            );
        }

        return mappedSources;
    };

    Picture.prototype.renderImage = function renderImage(props) {
        var skipSizes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var alt = props.alt,
            src = props.src,
            sizes = props.sizes,
            rest = _objectWithoutProperties(props, ["alt", "src", "sizes"]);

        // Adds sizes props if sources isn't defined


        var sizesProp = skipSizes ? null : { sizes: sizes };

        return _react2.default.createElement(Img, _extends({
            alt: alt,
            srcSet: src,
            "data-no-retina": true
        }, sizesProp, rest));
    };

    Picture.prototype.render = function render() {
        var _props = this.props,
            sources = _props.sources,
            rest = _objectWithoutProperties(_props, ["sources"]);

        if (sources != null) {
            return _react2.default.createElement(
                "picture",
                null,
                this.renderSources(),
                this.renderImage(rest, true)
            );
        }

        return this.renderImage(rest);
    };

    return Picture;
}(_react2.default.PureComponent);

Picture.propTypes = {
    sources: _propTypes2.default.array,
    src: _propTypes2.default.string.isRequired,
    style: _propTypes2.default.object,
    css: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
    alt: _propTypes2.default.string,
    className: _propTypes2.default.string,
    sizes: _propTypes2.default.string
};

Picture.defaultProps = {
    src: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
};

exports.default = Picture;