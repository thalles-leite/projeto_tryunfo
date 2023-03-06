import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

const initialState = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '',
  cardAttr2: '',
  cardAttr3: '',
  cardImage: '',
  cardRare: '',
  cardTrunfo: false,
};
class App extends React.Component {
  state = initialState;

  onInputChange = ({ target }) => {
    const { name, type, checked } = target;
    const value = (type === 'checkbox') ? checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form cardState={ this.state } onInputChange={ this.onInputChange } />
        <br />
        <br />
        <Card cardState={ this.state } />
      </div>
    );
  }
}

export default App;
