import React from 'react';
import PropTypes from 'prop-types';
import LeftArrowIcon from '../images/navigation-left-arrow.svg';
import RightArrowIcon from '../images/navigation-right-arrow.svg';

const Arrow = ({
  direction,
  progress,
  allAnswers,
  handlerClick,
  showResults,
}) => {
  const icon = direction === 'left' ? LeftArrowIcon : RightArrowIcon;
  const isDisabled =
    (direction === 'left' && progress === 0) ||
    (direction === 'right' && !allAnswers[progress]) ||
    (direction === 'right' && showResults);
  return (
    <button
      disabled={isDisabled}
      className={`arrow ${isDisabled ? 'is-disabled' : ''}`}
      onClick={handlerClick}
    >
      <img src={icon} />
    </button>
  );
};

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  allAnswers: PropTypes.array.isRequired,
  handlerClick: PropTypes.func.isRequired,
  showResults: PropTypes.bool.isRequired,
};

export default Arrow;
