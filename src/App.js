import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import CardList from './components/CardList';

const initialState = {
  cards: [],
  cardName: '',
  cardDescription: '',
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  isSaveButtonDisabled: true,
  hasTrunfo: false,
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
    const newCard = { ...this.state };
    if (newCard.cardTrunfo) this.state.hasTrunfo = true;

    this.setState((currentState) => ({
      cards: [...currentState.cards, newCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
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
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
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
        <br />
        <br />

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
        <CardList
          cards={ cards }
          onRemoveButtonClick={ this.onRemoveButtonClick }
        />
      </div>
    );
  }
}

export default App;
