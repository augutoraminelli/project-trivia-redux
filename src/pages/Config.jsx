import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Button from '../components/Button';
import { setSettingsGame } from '../redux/actions';
import fetchCategories from '../services/categoriesAPI';

class Config extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      category: 9,
      difficulty: 'easy',
      type: 'multiple',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.allCategories = this.allCategories.bind(this);
  }

  async componentDidMount() {
    const categories = await fetchCategories();
    this.allCategories(categories);
  }

  handleSubmit(e) {
    const { history } = this.props;
    const { category, difficulty, type } = this.state;
    e.preventDefault();
    const { setSettingsGames } = this.props;
    setSettingsGames({ category, difficulty, type });
    history.push('/');
  }

  allCategories(categories) {
    this.setState({ categories });
  }

  renderCategory() {
    const { category, categories } = this.state;
    return (
      <label htmlFor="category-input" className="category-selector">
        Categoria
        <select
          value={ category }
          id="category-input"
          onChange={ (e) => this.setState({ category: e.target.value }) }
        >
          { categories.map(({ id, name }) => (
            <option key={ id } value={ id }>{ name }</option>
          )) }
        </select>
      </label>
    );
  }

  renderDifficulty() {
    const { difficulty } = this.state;
    const difficultys = ['Any Difficulty', 'easy', 'medium', 'hard'];
    return (
      <label htmlFor="difficulty-input" className="difficulty-selector">
        Dificuldade
        <select
          value={ difficulty }
          id="difficulty-input"
          onChange={ (e) => this.setState({ difficulty: e.target.value }) }
        >
          { difficultys.map((option, index) => (
            <option key={ index } value={ option }>{ option }</option>
          )) }
        </select>
      </label>
    );
  }

  renderType() {
    const { type } = this.state;
    const types = ['Any Type', 'multiple', 'boolean'];
    return (
      <label htmlFor="type-input" className="type-selector">
        Tipo
        <select
          value={ type }
          id="type-input"
          onChange={ (e) => this.setState({ type: e.target.value }) }
        >
          { types.map((option, index) => (
            <option key={ index } value={ option }>{ option }</option>
          )) }
        </select>
      </label>
    );
  }

  render() {
    return (
      <main id="config">
        <h1 data-testid="settings-title">Configurações</h1>
        <form onSubmit={ this.handleSubmit }>
          { this.renderCategory() }
          { this.renderDifficulty() }
          { this.renderType() }
          <Button
            className="settings-btn"
            testid="settings-btn"
            value="Salvar e Bora Jogar!"
          />
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSettingsGames: (settings) => dispatch(setSettingsGame(settings)),
});

Config.propTypes = {
  setSettingsGames: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }),
};

Config.defaultProps = {
  history: <p>Sem valor</p>,
};

export default connect(null, mapDispatchToProps)(Config);
