'use strict';

import classNames from 'classnames';

const Label = ({
  htmlFor,
  children: text,
  className = [],
  style = {},
  ...props,
}) =>
  <label
    htmlFor={htmlFor}
    style={style}
    className={classNames('Input', className)}
    {...props}
  >
    {text}
  </label>;

Label.propTypes = {
  className: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
  ]),
  children: React.PropTypes.string.isRequired,
  htmlFor: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  defaultValue: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};

export default Label;
