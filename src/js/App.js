import React from 'react';
import data from './data/Data';

import PlaneIcon from '../images/plane.svg';
import LeftArrowIcon from '../images/navigation-left-arrow.svg';
import RightArrowIcon from '../images/navigation-right-arrow.svg';

import Question from './Question';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allQuestions: data.allQuestions,
      currentQuestion: data.allQuestions[0],
      progress: 0,
      allAnswers: [],
    };
  }

  onSelectAnswer = answer => {
    
  };

  render() {
    const { currentQuestion } = this.state;

    return (
      <div>
        <header>
          <img src={PlaneIcon} />
        </header>

        {/* Content - start */}
        <div className={`content`}>
          {/* Progress - start */}
          <div className="progress-container">
            <div className="progress-label">1 of 5 answered</div>
            <div className="progress">
              <div className="progress-bar" style={{ width: `20%` }}>
                <span className="sr-only">20% Complete</span>
              </div>
            </div>
          </div>
          {/* Progress - end */}

          <Question
            currentQuestion={currentQuestion}
            onSelectAnswer={this.onSelectAnswer}
          />

          {/* Results - start */}
          <div className="results">
            <div className="loader">
              <div className="icon" />
            </div>
            <div className="results-overlay" />
            <h1>Here are your answers:</h1>
            <div className="answers">
              <ol>
                <li>
                  What is the best city in the world? <br />
                  <strong>Melbourne</strong>
                </li>
              </ol>
            </div>
            <div className="text-center">
              <button className="btn btn-dark">Submit</button>
            </div>
          </div>
          {/* Results - end */}
        </div>
        {/* Content - end */}

        {/* Navigation - start */}
        <div className={`navigation text-center is-active`}>
          <button className={`arrow`}>
            <img src={LeftArrowIcon} />
          </button>
          <button disabled className={`arrow is-disabled`}>
            <img src={RightArrowIcon} />
          </button>
        </div>
        {/* Navigation - end */}
      </div>
    );
  }
}

export default App;
