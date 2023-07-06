import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
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
    } = this.props;
    return (
      <section className={ `cardPreviewContainer ${cardRare}` }>
        {cardTrunfo
        && (
          <span className="superTrunfo">

            <img className="superTrunfoImg" src="./logo_tryunfo.png" alt="trunfo" />
          </span>
        )}
        <span
          data-testid="name-card"
          className="nameCardPreview"
        >
          {cardName || 'Nome da Carta'}

        </span>
        <img
          data-testid="image-card"
          src={ cardImage || './noimg.jpg' }
          alt={ cardName }
          className="imageCard"
        />
        <p
          data-testid="description-card"
          className={ `descriptionPreviewCard ${cardRare}` }
        >
          {cardDescription}

        </p>
        <section className="cardAttributes">
          <section className="lineAttribute">
            <section className="attrName">Attr01</section>
            <section
              data-testid="attr1-card"
              className="attrVal"
            >
              {cardAttr1 || 0}

            </section>
          </section>
          <section className="lineAttribute">
            <section className="attrName">Attr02</section>
            <section
              data-testid="attr2-card"
              className="attrVal"
            >
              {cardAttr2 || 0}

            </section>
          </section>
          <section className="lineAttribute">
            <section className="attrName">Attr03</section>
            <section
              data-testid="attr3-card"
              className="attrVal"
            >
              {cardAttr3 || 0}

            </section>
          </section>

        </section>
        {/* <span data-testid="rare-card">{cardRare}</span> */}
        {/* {cardTrunfo && <span data-testid="trunfo-card">Super Trunfo</span>} */}

      </section>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};
export default Card;
