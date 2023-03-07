import React, { Component } from 'react';

class CardList extends Component {
  render() {
    const { cards } = { ...this.props };

    return (
      <>
        <h1>Cartas</h1>
        {cards.map(({ cardName,
          cardDescription,
          cardAttr1,
          cardAttr2,
          cardAttr3,
          cardImage,
          cardRare,
          cardTrunfo,
        }, index) => (
          <div key={ index }>
            <p>
              Nome:
              {cardName}
            </p>
            <p>
              Descrição:
              {cardDescription}
            </p>
            <p>
              Attr1:
              {cardAttr1}
            </p>
            <p>
              Attr2:
              {cardAttr2}
            </p>
            <p>
              Attr3:
              {cardAttr3}
            </p>
            <img src={ cardImage } alt={ cardName } />
            <p>
              Raridade:
              {cardRare}
            </p>
            {cardTrunfo && <span>Trunfo</span>}
          </div>))}
      </>
    );
  }
}

export default CardList;
