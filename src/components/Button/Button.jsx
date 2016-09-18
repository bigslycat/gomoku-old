'use strict';

const Button = ({
  children,
  classes = [],
  style = {},
  ...props,
}) => {
  classes.unshift('Button');

  const customProps = {
    style,
    type: 'button',
    className: classes.join(' '),
  };

  return <button {...customProps} {...props}>{children}</button>;
};

Button.propTypes = {
  children: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func,
  onMouseEnter: React.PropTypes.func,
  classes: React.PropTypes.array,
  style: React.PropTypes.object,
};

export default Button;
