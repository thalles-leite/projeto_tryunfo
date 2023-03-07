import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { value, onChange, trunfoDisable } = this.props;
    return (
      <>
        <label>
          Nome:
          <input
            type="text"
            data-testid="name-filter"
            name="nameFilter"
            onChange={ onChange }
            disabled={ trunfoDisable }
          />
        </label>
        <label>
          Raridade:
          <select
            onChange={ onChange }
            value={ value }
            data-testid="rare-filter"
            name="rareFilter"
            disabled={ trunfoDisable }
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
          <label>
            Super Trunfo
            <input
              type="checkbox"
              data-testid="trunfo-filter"
              onChange={ onChange }
              name="trunfoFilter"
            />
          </label>
        </label>
      </>
    );
  }
}
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  trunfoDisable: PropTypes.bool.isRequired,
};

export default Filter;
