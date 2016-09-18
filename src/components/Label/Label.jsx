'use strict';

const Label = ({
  classes = [],
  style = {},
  type = 'text',
  htmlFor,
  children: text,
  ...props,
}) => {
  classes.unshift('Label');

  const customProps = {
    type,
    style,
    className: classes.join(' '),
  };

  return <label htmlFor={htmlFor} {...customProps} {...props}>{text}</label>;
};

Label.propTypes = {
  children: React.PropTypes.string.isRequired,
  htmlFor: React.PropTypes.string.isRequired,
  classes: React.PropTypes.array,
  style: React.PropTypes.object,
  type: React.PropTypes.string,
  defaultValue: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};

export default Label;
