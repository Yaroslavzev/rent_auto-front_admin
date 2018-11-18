var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Picture from "./Picture";
import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";

var Wrapper = glamorous.div(function () {
    return [{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "relative"
    }];
});

Wrapper.displayName = "Wrapper";
var PictureWrapper = glamorous.div(function () {
    return [{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }];
});

PictureWrapper.displayName = "PictureWrapper";

var FullSizePicture = function (_React$PureComponent) {
    _inherits(FullSizePicture, _React$PureComponent);

    function FullSizePicture() {
        _classCallCheck(this, FullSizePicture);

        return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
    }

    FullSizePicture.prototype.getImageStyles = function getImageStyles(propsStyle) {
        return [{
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "auto",
            height: "auto",
            minWidth: "100%",
            minHeight: "100%",
            maxWidth: "none",
            maxHeight: "none",
            transform: "translate3d(-50%, -50%, 0)"
        }, propsStyle];
    };

    FullSizePicture.prototype.render = function render() {
        var _props = this.props,
            className = _props.className,
            pictureClassName = _props.pictureClassName,
            style = _props.style,
            pictureCSS = _props.pictureCSS,
            css = _props.css,
            rest = _objectWithoutProperties(_props, ["className", "pictureClassName", "style", "pictureCSS", "css"]);

        return React.createElement(
            Wrapper,
            { className: className, css: css, style: style },
            React.createElement(
                PictureWrapper,
                null,
                React.createElement(Picture, _extends({
                    className: pictureClassName,
                    css: this.getImageStyles(pictureCSS)
                }, rest))
            )
        );
    };

    return FullSizePicture;
}(React.PureComponent);

FullSizePicture.propTypes = {
    className: PropTypes.string,
    pictureClassName: PropTypes.string,
    alt: PropTypes.string,
    sources: PropTypes.array,
    src: PropTypes.string,
    style: PropTypes.object,
    css: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
    pictureCSS: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string])
};

export default FullSizePicture;