import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { value, onChange, trunfoDisable } = this.props;
    return (
      <section className="filterSection">
        <label className="filterNome">
          Nome:
          <input
            type="text"
            data-testid="name-filter"
            name="nameFilter"
            onChange={ onChange }
            disabled={ trunfoDisable }
            className="nameFilter"
          />
        </label>
        <label className="filterRaridade">
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
            <option value="muitoRaro">Muito raro</option>
          </select>
        </label>
        <label className="filterTrunfo">
          <input
            type="checkbox"
            data-testid="trunfo-filter"
            onChange={ onChange }
            name="trunfoFilter"
          />
          Super Trunfo
        </label>
      </section>
    );
  }
}
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  trunfoDisable: PropTypes.bool.isRequired,
};

export default Filter;
