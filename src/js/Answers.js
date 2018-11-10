import React from 'react';
import PropTypes from 'prop-types';

const Answers = ({ allAnswers, allQuestions, correctAnswers }) => {
  return (
    <ol>
      {allQuestions.map((question, index) => {
        const isCorrect =
          correctAnswers.length && correctAnswers[index] === allAnswers[index];
        return (
          <li
            className={`${isCorrect ? 'text-success' : 'text-danger'}`}
            key={question.question}
          >
            {question.question} <br /> <strong>{allAnswers[index]}</strong>
            {correctAnswers.length && !isCorrect ? (
              <span className="correct-answer">
                {` ${correctAnswers[index]}`}
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
};

Answers.propTypes = {
  allAnswers: PropTypes.array.isRequired,
  allQuestions: PropTypes.array.isRequired,
  correctAnswers: PropTypes.array.isRequired,
};

export default Answers;
