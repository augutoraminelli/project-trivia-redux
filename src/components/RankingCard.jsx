import React from 'react';
import PropTypes from 'prop-types';

export default class RankingCard extends React.Component {
  render() {
    const { index, player: { name, score, picture } } = this.props;

    return (
      <div className="ranking-card">
        <div>{ index + 1 }</div>
        <div data-testid={ `player-name-${index}` }>
          <img className="player-picture" src={ picture } alt={ name } />
          { name }
        </div>
        <div data-testid={ `player-score-${index}` }>{ score }</div>
      </div>
    );
  }
}

RankingCard.propTypes = {
  index: PropTypes.number.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};
