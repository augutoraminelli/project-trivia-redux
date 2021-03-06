import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import QuestionCard from '../components/QuestionCard';
import opentdbAPI from '../services/opentdbAPI';

const QUESTIONS_AMOUNT = 5;

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      score: 0,
      loading: true,
    };

    this.handleAnswer = this.handleAnswer.bind(this);
  }

  async componentDidMount() {
    const { settings } = this.props;
    const response = await opentdbAPI.fetchQuestions(QUESTIONS_AMOUNT, settings);
    this.loadQuestions(response.results);
  }

  loadQuestions(questions) {
    this.setState({ questions, loading: false });
  }

  handleAnswer(answer) {
    const { score } = this.state;
    this.setState({ score: score + (answer ? 1 : 0) });
  }

  // ver https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array ***
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  render() {
    const { questions, loading } = this.state;
    if (loading) {
      return (<Loading />);
    }

    if (questions.length === 0) {
      return (<Redirect to="/feedback" />);
    }

    const {
      category,
      question,
      difficulty,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions.shift();
    const options = this.shuffle([correctAnswer, ...incorrectAnswers]);

    return (
      <>
        <Header />
        <QuestionCard
          data={
            { category, difficulty, question, correctAnswer, incorrectAnswers, options }
          }
          callback={ this.handleAnswer }
        />
        <Footer />
      </>
    );
  }
}

Trivia.propTypes = {
  settings: PropTypes.shape({
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStatetoProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStatetoProps)(Trivia);
