import React from 'react';
import data from './data/Data';

import PlaneIcon from '../images/plane.svg';
import BusIcon from '../images/bus.svg';
import CarIcon from '../images/car.svg';
import ShipIcon from '../images/ship.svg';
import BicycleIcon from '../images/bicycle.svg';
import TruckIcon from '../images/truck.svg';

import Question from './Question';
import Results from './Results';
import Progress from './Progress';
import Arrow from './Arrow';
import { log } from 'util';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allQuestions: data.allQuestions,
      currentQuestion: data.allQuestions[0],
      progress: 0,
      allAnswers: [],
      loadNewQuestion: false,
      showResults: false,
      loadingResults: false,
      correctAnswers: [],
      resultsLoaded: false,
    };
  }

  onSelectAnswer = answer => {
    this.setState(
      prevState => {
        const currentAnswer = prevState.allAnswers[prevState.progress];
        if (currentAnswer) {
          const allAnswers = [...prevState.allAnswers];
          allAnswers[prevState.progress] = answer;
          return {
            allAnswers,
          };
        } else {
          return {
            allAnswers: [...prevState.allAnswers, answer],
          };
        }
      },
      () => {
        this.goToNextQuestion();
      }
    );
  };

  goToNextQuestion = () => {
    this.setState({
      loadNewQuestion: true,
    });

    setTimeout(() => {
      this.setState(prevState => {        
        if (prevState.progress < prevState.allQuestions.length - 1) {          
          return {
            progress: prevState.progress + 1,
            currentQuestion: prevState.allQuestions[prevState.progress + 1],
            loadNewQuestion: false,
          };
        } else {
          return {
            loadNewQuestion: false,
            showResults: true,
          };
        }
      });
    }, 300);
  };

  goToPreviousQuestion = () => {
    this.setState({
      loadNewQuestion: true,
    });

    setTimeout(() => {
      this.setState(prevState => {
        let newState = {};
        if (prevState.progress > 0 && !prevState.showResults) {
          newState = {
            progress: prevState.progress - 1,
            currentQuestion: prevState.allQuestions[prevState.progress - 1],
            loadNewQuestion: false,
          };
        }
        if (prevState.showResults) {
          newState = {
            ...newState,
            showResults: false,
            loadNewQuestion: false,
          };
        }

        return newState;
      });
    }, 300);
  };

  onLoadResults = () => {
    this.setState({
      loadingResults: true,
    });

    fetch('https://api.myjson.com/bins/zgpjb')
      .then(res => res.json())
      .then(data => {
        const correctAnswers = data.correctAnswers;

        this.setState({
          correctAnswers,
          loadingResults: false,
          resultsLoaded: true,
        });
      })
      .catch(err => {
        this.setState({
          loadingResults: false,
          resultsLoaded: true,
        });
      });
  };

  getImage = ({ image }) => {
    switch (image) {
      case 'plane':
        return PlaneIcon;
      case 'bus':
        return BusIcon;
      case 'car':
        return CarIcon;
      case 'ship':
        return ShipIcon;
      case 'bicycle':
        return BicycleIcon;
      default:
        return PlaneIcon;
    }
  };

  onRestart = () => {
    this.setState({
      allAnswers: [],
      correctAnswers: [],
      currentQuestion: this.state.allQuestions[0],
      progress: 0,
      resultsLoaded: false,
      showResults: false
    })
  } 

  render() {
    const {
      currentQuestion,
      loadNewQuestion,
      showResults,
      allQuestions,
      allAnswers,
      loadingResults,
      correctAnswers,
      resultsLoaded,
      progress,
    } = this.state;

    const navIsActive = allAnswers.length > 0;
    const image = currentQuestion.image && this.getImage(currentQuestion);
    const headerImage = !showResults ? image : TruckIcon;

    return (
      <div
        className={`${loadingResults ? 'is-loading-results' : ''} 
        ${resultsLoaded ? 'is-showing-results' : 'no-results-loaded'}`}
      >
        <header>
          <img
            src={headerImage}
            className={`fade-out ${loadNewQuestion ? 'fade-out-active' : ''}`}
          />
        </header>

        <div className={`content`}>
          <Progress total={allQuestions.length} progress={allAnswers.length} />
          {!showResults ? (
            <Question
              currentQuestion={currentQuestion}
              loadNewQuestion={loadNewQuestion}
              allAnswers={allAnswers}
              onSelectAnswer={this.onSelectAnswer}
            />
          ) : (
            <Results
              loadNewQuestion={loadNewQuestion}
              allAnswers={allAnswers}
              allQuestions={allQuestions}
              correctAnswers={correctAnswers}
              resultsLoaded={resultsLoaded}
              onLoadResults={this.onLoadResults}
              onRestart={this.onRestart}
            />
          )}
        </div>

        <div
          className={`navigation text-center ${navIsActive ? 'is-active' : ''}`}
        >
          <Arrow
            direction="left"
            progress={progress}
            allAnswers={allAnswers}
            handlerClick={this.goToPreviousQuestion}
            showResults={showResults}
          />
          <Arrow
            direction="right"
            progress={progress}
            allAnswers={allAnswers}
            handlerClick={this.goToNextQuestion}
            showResults={showResults}
          />
        </div>
      </div>
    );
  }
}

export default App;
