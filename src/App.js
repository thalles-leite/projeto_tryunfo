/* eslint-disable no-magic-numbers */
/* eslint-disable max-lines */
/* eslint-disable camelcase */
import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import CardList from './components/CardList';
import Filter from './components/Filter';
import Data from './data';

const initialState = {
  cards: Data,
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  rareFilter: 'todas',
  nameFilter: '',
  trunfoFilter: false,
  isSaveButtonDisabled: true,
  hasTrunfo: false,
  trunfoDisable: false,
};
class App extends React.Component {
  state = initialState;

  onInputChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = (type === 'checkbox') ? checked : target.value;
    this.setState({
      [name]: value,
    }, this.verifyValidation);
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();

    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    if (newCard.cardTrunfo) this.state.hasTrunfo = true;

    this.setState((currentState) => ({
      cards: [...currentState.cards, newCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    }));
  };

  onRemoveButtonClick = ({ target: { parentNode: { dataset } } }) => {
    const { index } = dataset;
    const { cards } = this.state;
    const { cardTrunfo } = cards[index];
    if (cardTrunfo) this.setState({ hasTrunfo: false });
    const updateCards = [...cards];
    updateCards.splice(index, 1);
    this.setState({
      cards: updateCards,
    });
  };

  onChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = (type === 'checkbox') ? checked : target.value;
    this.setState({
      [name]: value,
    });
    if (name === 'trunfoFilter' && checked === true) {
      this.setState({
        trunfoDisable: true });
    } else {
      this.setState({
        trunfoDisable: false });
    }
  };

  verifyValidation = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3 } = this.state;
    const MINATT = 0;
    const MAXATT = 90;
    const MAXSUM = 210;

    const validationText = cardName.length > 0
    && cardDescription.length > 0
    && cardImage.length > 0
    && cardRare.length > 0;
    const validationMaxAtt = (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3))
    <= MAXSUM;

    const validationPositiveValues = Number(cardAttr1) >= MINATT
    && Number(cardAttr1) <= MAXATT
    && Number(cardAttr2) >= MINATT
    && Number(cardAttr2) <= MAXATT
    && Number(cardAttr3) >= MINATT
    && Number(cardAttr3) <= MAXATT;

    this.setState({
      isSaveButtonDisabled: !(validationText
      && validationMaxAtt
      && validationPositiveValues),
    });
  };

  create_card = async (name, image, desc) => {
    const maxAtt = 70;
    const types = ['normal', 'raro', 'muitoRaro'];
    const randomIndex = Math.floor(Math.random() * types.length);

    const card = {
      cardAttr1: Math.floor(Math.random() * maxAtt),
      cardAttr2: Math.floor(Math.random() * maxAtt),
      cardAttr3: Math.floor(Math.random() * maxAtt),
      cardDescription: desc,
      cardImage: image,
      cardName: name,
      cardRare: types[randomIndex],
      cardTrunfo: false,
    };
    return card;
  };

  somaAttrs = (card) => card.cardAttr1 + card.cardAttr2 + card.cardAttr3;

  randomSort = () => Math.random() - 0.5;

  updateAllCards = (array) => {
    // Atualiza a trunfo card
    const trunfoCard = array.reduce((maior, atual) => (this.somaAttrs(atual)
       > this.somaAttrs(maior) ? atual : maior));
    const indice = array.indexOf(trunfoCard);
    array[indice].cardTrunfo = true;
    array.sort(this.randomSort);
    this.setState({
      cards: array,
    });
  };

  apiPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    const { results } = data;

    const pokemons = await Promise.all(results.map(async ({ url }) => {
      const pokemonResponse = await fetch(url);
      const { name, sprites: { front_default }, species } = await pokemonResponse.json();
      const specieUrl = species.url;
      const dataSpecie = await fetch(specieUrl);
      const resultDataSpecie = await dataSpecie.json();
      const { flavor_text_entries } = resultDataSpecie;
      const desc = flavor_text_entries[1].flavor_text;
      const card = await this.create_card(name, front_default, desc);
      return card;
    }));
    this.updateAllCards(pokemons);
  };

  apiNaruto = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/anime/20/characters');
      const { data } = await response.json();
      const dataSliced = data.slice(0, 50);
      const personagens = await Promise.all(dataSliced
        .map(async ({ character: { images: { webp }, name } }) => {
          const { image_url } = webp;
          const card = await this.create_card(name, image_url, name);

          return card;
        }));
      this.updateAllCards(personagens);
    } catch (error) {
      console.log(error.message);
    }
  };

  apiRickAMorty = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const { results } = await response.json();
    const characters = await Promise.all(results
      .map(async ({ name, image, species, location }) => {
        const descr = (
          <section>
            <p>
              {`Specie: ${species}`}
            </p>
            <p>
              {`Localização: ${location.name}`}
            </p>
          </section>
        );
        const card = this.create_card(name, image, descr);
        return card;
      }));
    console.log(characters);
    this.updateAllCards(characters);
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      cards,
      rareFilter,
      nameFilter,
      trunfoFilter,
      trunfoDisable,
    } = this.state;

    return (
      <div>
        <header>
          <img src="/logo_tryunfo.png" alt="logo" className="headerLogo" />
        </header>
        <main>
          <section className="apiButtons">
            <button
              className="apiPokemonButton"
              onClick={ this.apiPokemons }
            >
              Pokemons
            </button>
            <button
              className="apiNarutoButton"
              onClick={ this.apiNaruto }
            >
              Naruto
            </button>
            <button
              className="apiRickAndMorty"
              onClick={ this.apiRickAMorty }
            >
              Rick and Morty
            </button>
          </section>
          <section className="cardRegister">

            <Form
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              onInputChange={ this.onInputChange }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onSaveButtonClick={ this.onSaveButtonClick }
              hasTrunfo={ hasTrunfo }
            />
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </section>
          {cards.length > 0
          && <Filter
            cards={ cards }
            onChange={ this.onChange }
            trunfoDisable={ trunfoDisable }
          />}

          {cards.length > 0
          && <CardList
            cards={ cards }
            onRemoveButtonClick={ this.onRemoveButtonClick }
            rareFilter={ rareFilter }
            nameFilter={ nameFilter }
            trunfoFilter={ trunfoFilter }
            disableFilter={ this.disableFilter }
          />}
        </main>

      </div>
    );
  }
}
export default App;
