import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { PropTypes } from 'prop-types';
import Loading from '../components/Loading';
import Button from '../components/Button';
import Select from '../components/Select';
import { setSettingsGame } from '../redux/actions';
import fetchCategories from '../services/categoriesAPI';

class Config extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      category: 'All Categories',
      difficulty: 'easy',
      type: 'multiple',
      loading: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.allCategories = this.allCategories.bind(this);
  }

  async componentDidMount() {
    const categories = await fetchCategories();
    categories.unshift({ id: 0, name: 'All Categories' });
    this.allCategories(categories);
  }

  handleSubmit(e) {
    const { category, difficulty, type, categories } = this.state;
    e.preventDefault();
    const { setSettingsGames } = this.props;
    const categoryId = categories.find((item) => item.name === category).id;
    setSettingsGames({ category: categoryId, difficulty, type });
    this.setState({ redirect: '/' });
  }

  allCategories(categories) {
    this.setState({ categories, loading: false });
  }

  renderCategory() {
    const { category, categories } = this.state;
    return (
      <Select
        value={ category }
        label="Categoria"
        id="category-input"
        onChange={ (e) => this.setState({ category: e.target.value }) }
        options={ categories.map((item) => item.name) }
      >
        ))
      </Select>
    );
  }

  renderDifficulty() {
    const { difficulty } = this.state;
    const difficulties = ['Any Difficulty', 'easy', 'medium', 'hard'];
    return (
      <Select
        label="Dificuldade"
        value={ difficulty }
        id="difficulty-input"
        onChange={ (e) => this.setState({ difficulty: e.target.value }) }
        options={ difficulties.map((item) => item) }
      >
        ))
      </Select>
    );
  }

  renderType() {
    const { type } = this.state;
    const types = ['Any Type', 'multiple', 'boolean'];
    return (
      <Select
        label="Tipo"
        value={ type }
        id="type-input"
        onChange={ (e) => this.setState({ type: e.target.value }) }
        options={ types.map((item) => item) }
      >
        ))
      </Select>
    );
  }

  render() {
    const { loading, redirect } = this.state;
    if (loading) {
      return (<Loading />);
    }
    if (redirect) {
      return <Redirect to={ redirect } />;
    }
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
};

export default connect(null, mapDispatchToProps)(Config);
