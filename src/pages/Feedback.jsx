import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { setPlayerRanking } from '../redux/actions';

import '../styles/Feedback.css';

const LOW_SCORE_MESSAGE = 'Podia ser melhor...';
const HIGH_SCORE_MESSAGE = 'Mandou bem!';
const SCORE_THRESHOLD = 3;

class Feedback extends React.Component {
  render() {
    const { player: { name, assertions, score, picture }, dispatchPayload } = this.props;

    dispatchPayload({ name, score, picture });

    return (
      <>
        <Header />
        <main>

          <h1 className="feedback" data-testid="feedback-text">
            { assertions >= SCORE_THRESHOLD ? HIGH_SCORE_MESSAGE : LOW_SCORE_MESSAGE }
          </h1>
          <h2 className="feedback">
            Você acertou&nbsp;
            <span data-testid="feedback-total-question">{ assertions }</span>
            { assertions >= 2 ? ' questões!' : ' questão!' }
            <br />
            Um total de&nbsp;
            <span data-testid="feedback-total-score">{ score }</span>
            &nbsp;pontos.
          </h2>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking" className="btn btn-ranking">
              VER RANKING
            </button>
          </Link>
          <Link to="/">
            <button type="button" data-testid="btn-play-again" className="btn btn-play">
              JOGAR NOVAMENTE
            </button>
          </Link>

          <Footer />
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    assertions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  dispatchPayload: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchPayload: (payload) => dispatch(setPlayerRanking(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
