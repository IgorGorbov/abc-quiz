import React from 'react';
import PropTypes from 'prop-types';

import Answers from './Answers';

const Results = ({
  loadNewQuestion,
  allAnswers,
  allQuestions,
  onLoadResults,
  onRestart,
  correctAnswers,
  resultsLoaded,
}) => {
  let numberOfCorrect = 0;
  correctAnswers &&
    allAnswers.map((_, i) => {
      correctAnswers[i] == allAnswers[i] && numberOfCorrect++;
    });

  return (
    <div
      className={`results fade-out 
    ${loadNewQuestion ? 'fade-out-active' : ''}`}
    >
      <div className="loader">
        <div className="icon" />
      </div>
      <div className="results-overlay" />
      <h1>{`${
        resultsLoaded
          ? `${numberOfCorrect} out of ${allQuestions.length}`
          : 'Here are your answers:'
      }`}</h1>
      <div className="answers">
        <Answers
          allAnswers={allAnswers}
          allQuestions={allQuestions}
          correctAnswers={correctAnswers}
        />
      </div>
      <div className="text-center">
        <button
          className="btn btn-dark"
          onClick={resultsLoaded ? onRestart : onLoadResults}
        >
          {resultsLoaded ? 'Restart' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

Results.propTypes = {
  loadNewQuestion: PropTypes.bool.isRequired,
  allAnswers: PropTypes.array.isRequired,
  allQuestions: PropTypes.array.isRequired,
  onLoadResults: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  correctAnswers: PropTypes.array.isRequired,
  resultsLoaded: PropTypes.bool.isRequired,
};

export default Results;
