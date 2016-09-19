'use strict';

import classNames from 'classnames';

const Button = ({
  children,
  className = [],
  style = {},
  type = 'button',
  ...props,
}) =>
  <button
    type={type}
    style={style}
    className={classNames('Button', className)}
    {...props}
  >
    {children}
  </button>;

Button.propTypes = {
  className: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.string,
  ]),
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  onMouseEnter: React.PropTypes.func,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
};

export default Button;
