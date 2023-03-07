import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <label>
        Raridade:
        <select
          onChange={ onChange }
          value={ value }
          data-testid="rare-filter"
          name="rareFilter"
        >
          <option value="todas">Todas</option>
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito raro</option>
        </select>
      </label>
    );
  }
}
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
