import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class CardList extends Component {
  render() {
    const {
      cards,
      onRemoveButtonClick,
      rareFilter,
      nameFilter,
      trunfoFilter,
    } = this.props;

    let filteredCards = cards;

    if (!trunfoFilter) {
      if (nameFilter !== '') {
        filteredCards = cards
          .filter(({ cardName }) => cardName.includes(nameFilter));
      }

      if (rareFilter !== 'todas') {
        filteredCards = cards
          .filter(({ cardRare }) => cardRare === rareFilter);
      }
    } else {
      filteredCards = cards.filter(({ cardTrunfo }) => cardTrunfo === true);
    }

    return (
      <>
        <section className="cardListTitle">Lista de Cartas</section>

        <section className="cardsList">
          {filteredCards.map(({ cardName,
            cardDescription,
            cardAttr1,
            cardAttr2,
            cardAttr3,
            cardImage,
            cardRare,
            cardTrunfo,
          }, index) => (
            <div key={ index } data-index={ index } className="card">
              <button
                data-testid="delete-button"
                onClick={ onRemoveButtonClick }
                className="deleteButton"
              >
                Excluir

              </button>
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

            </div>))}
        </section>
      </>
    );
  }
}
CardList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
  rareFilter: PropTypes.string.isRequired,
  nameFilter: PropTypes.string.isRequired,
  trunfoFilter: PropTypes.bool.isRequired,
};
export default CardList;
