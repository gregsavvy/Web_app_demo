import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '../../node_modules/react-bootstrap/Card';
import CardDeck from '../../node_modules/react-bootstrap/CardDeck';
import Button from '../../node_modules/react-bootstrap/Button';

const context = require.context('../img/', true);

const images = {};
context.keys().forEach((key) => {
  const imgpath = key.split('./').pop() // remove the first 2 characters
    //.slice(0, -4); // remove the file extension
  images[imgpath] = context(key);
});

const Good = props => (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" style={{height:150, width:150}} src={images[props.good.imgpath].default} />
    <Card.Body>
      <Card.Title>{props.good.param1}</Card.Title>
      <Card.Text>
          {props.good.param2}
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
    </Card>
)

export default class GoodsList extends Component {
  constructor(props) {
    super(props);

    this.state = {goods: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/goods/')
      .then(response => {
        this.setState({ goods: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  goodListTable() {
    return this.state.goods.map(currentgood => {
      return <Good good={currentgood} key={currentgood._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Goods List</h3>
        <CardDeck>
        { this.goodListTable() }
        </CardDeck>
      </div>
    )
  }
}
