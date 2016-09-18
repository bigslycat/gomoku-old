'use strict';

const Input = ({
  classes = [],
  style = {},
  type = 'text',
  ...props,
}) => {
  classes.unshift('Input');

  const customProps = {
    type,
    style,
    className: classes.join(' '),
  };

  return <input {...customProps} {...props} />;
};

Input.propTypes = {
  classes: React.PropTypes.array,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  defaultValue: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};

export default Input;
