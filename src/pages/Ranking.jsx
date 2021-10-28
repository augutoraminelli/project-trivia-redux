import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from '../components/Footer';
import RankingCard from '../components/RankingCard';

import '../styles/Ranking.css';

class Ranking extends React.Component {
  render() {
    const { ranking } = this.props;
    ranking.sort((a, b) => b.score - a.score);
    return (
      <>
        <main id="ranking">
          <h1 data-testid="ranking-title">Ranking</h1>
          <div className="ranking-container">
            <div className="ranking-header">
              <div className="ranking-header-item">Posição</div>
              <div className="ranking-header-item">Nome</div>
              <div className="ranking-header-item">Pontuação</div>
            </div>
            { ranking.map(
              (player, i) => <RankingCard key={ i } index={ i } player={ player } />,
            ) }
          </div>
          <Link to="/">
            <button type="button" data-testid="btn-go-home">JOGAR NOVAMENTE</button>
          </Link>
        </main>
        <Footer />
      </>
    );
  }
}

Ranking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  ranking: state.ranking,
});

export default connect(mapStateToProps)(Ranking);
