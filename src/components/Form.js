import React, { Component } from 'react';

class Form extends Component {
  state = { };

  render() {
    return (
      <>
        <label>
          Nome:
          <input type="text" data-testid="name-input" />
        </label>
        <label>
          Descrição:
          <textarea data-testid="description-input" />
        </label>
        <label>
          attr1
          <input type="number" data-testid="attr1-input" />
        </label>
        <label>
          attr2
          <input type="number" data-testid="attr2-input" />
        </label>
        <label>
          attr3
          <input type="number" data-testid="attr3-input" />
        </label>
        <label>
          Imagem
          <input type="text" data-testid="image-input" />
        </label>
        <label>
          Raridade
          <select data-testid="rare-input">
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
        <label>
          Super Trunfo?
          <input type="checkbox" data-testid="trunfo-input" />
        </label>
        <button data-testid="save-button">Salvar</button>
      </>
    );
  }
}

export default Form;
