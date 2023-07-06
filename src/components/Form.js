import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
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
      onInputChange,
      onSaveButtonClick,
      hasTrunfo,
    } = this.props;
    return (

      <section className="registerForm">
        <section className="formTitle">ADICIONE NOVA CARTA</section>
        <label className="lbInputName">
          <section className="nameInput">Nome:</section>
          <input
            type="text"
            data-testid="name-input"
            name="cardName"
            value={ cardName }
            onChange={ onInputChange }
            className="inputName"
          />
        </label>
        <section className="descAtt">
          <section className="attrInputs">

            <section className="attInput">
              <section className="nameInput"> Attr01</section>
              <input
                type="number"
                data-testid="attr1-input"
                name="cardAttr1"
                value={ cardAttr1 }
                onChange={ onInputChange }
                className="cardAttr"
              />
            </section>

            <section className="attInput">

              <section className="nameInput"> Attr02</section>
              <input
                type="number"
                data-testid="attr2-input"
                name="cardAttr2"
                value={ cardAttr2 }
                onChange={ onInputChange }
                className="cardAttr"
              />

            </section>

            <section className="attInput">
              <section className="nameInput">  Attr03</section>
              <input
                type="number"
                data-testid="attr3-input"
                name="cardAttr3"
                value={ cardAttr3 }
                onChange={ onInputChange }
                className="cardAttr"
              />
            </section>

          </section>
          <label className="lbInputDescription">
            <section className="nameInput"> Descrição:</section>
            <textarea
              data-testid="description-input"
              name="cardDescription"
              value={ cardDescription }
              onChange={ onInputChange }
              rows="3"
              maxLength={ 125 }
              className="inputDescription"
            />
          </label>
        </section>
        <label className="lbInputImg">
          <section className="nameInput">  Imagem: </section>
          <input
            type="text"
            data-testid="image-input"
            name="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
            className="cardImage"
          />
        </label>
        <section className="rareSuperTrunfo">
          <label className="lbInputRare">
            <section className="nameInput">  Raridade </section>
            <select
              data-testid="rare-input"
              name="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
              className="inputRare"
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muitoRaro">Muito Raro</option>
            </select>
          </label>

          <label className="lbCheckText">
            { (!hasTrunfo)
              ? (
                <div className="checkText">
                  <input
                    type="checkbox"
                    data-testid="trunfo-input"
                    name="cardTrunfo"
                    checked={ cardTrunfo }
                    onChange={ onInputChange }
                  />
                  <section> Super Trunfo?</section>

                </div>)
              : (
                <span className="srPhrase">
                  Você já tem um Super Trunfo em seu baralho
                </span>)}
          </label>
          <section className="lbInputSav">

            <button
              data-testid="save-button"
              disabled={ isSaveButtonDisabled }
              onClick={ onSaveButtonClick }
              className="saveButton"
            >
              Salvar

            </button>

          </section>

        </section>
      </section>
    );
  }
}

Form.propTypes = {

  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,

  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
