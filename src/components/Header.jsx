import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { name, score, picture } = this.props;
    return (
      <header>
        <div className="header-profile-picture">
          { picture && <img
            data-testid="header-profile-picture"
            src={ picture }
            alt="userAvatar"
          /> }
        </div>
        <h2 data-testid="header-player-name">{ `Olá, ${name}` }</h2>
        <div className="header-score">
          Seu placar:&nbsp;
          <span data-testid="header-score">
            { score }
          </span>
        </div>
        <div className="header-links">
          <Link to="/config">
            <span role="img" aria-label="configuração">⚙️</span>
            &nbsp;Configuração
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  picture: state.player.picture,
});

export default connect(mapStateToProps)(Header);
