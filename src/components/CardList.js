import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardList extends Component {
  render() {
    const { cards, onRemoveButtonClick, rareFilter } = this.props;
    let filteredCards = '';
    if (rareFilter === 'todas') {
      filteredCards = cards;
    } else {
      console.log(rareFilter);
      filteredCards = cards.filter(({ cardRare }) => cardRare === rareFilter);
    }
    return (
      <>
        <h1>Cartas</h1>
        {filteredCards.map(({ cardName,
          cardDescription,
          cardAttr1,
          cardAttr2,
          cardAttr3,
          cardImage,
          cardRare,
          cardTrunfo,
        }, index) => (
          <div key={ index } data-index={ index }>
            <p>
              {cardName}
            </p>
            <p>
              {cardDescription}
            </p>
            <p>
              {cardAttr1}
            </p>
            <p>
              {cardAttr2}
            </p>
            <p>
              {cardAttr3}
            </p>
            <img src={ cardImage } alt={ cardName } />
            <p>
              {cardRare}
            </p>
            {cardTrunfo && <span>Trunfo</span>}
            <button
              data-testid="delete-button"
              onClick={ onRemoveButtonClick }
            >
              Excluir

            </button>
          </div>))}
      </>
    );
  }
}
CardList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemoveButtonClick: PropTypes.func.isRequired,
  rareFilter: PropTypes.string.isRequired,
};
export default CardList;
