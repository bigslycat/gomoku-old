'use strict';

import classNames from 'classnames';

const Input = ({
  className = [],
  style = {},
  type = 'text',
  ...props,
}) =>
  <input
    type={type}
    style={style}
    className={classNames('Input', className)}
    {...props}
  />;

Input.propTypes = {
  className: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.string,
  ]),
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  defaultValue: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};

export default Input;
