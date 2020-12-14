import React, { Component } from 'react';
import axios from 'axios';
import Card from '../../node_modules/react-bootstrap/Card';
import CardDeck from '../../node_modules/react-bootstrap/CardDeck';
import Button from '../../node_modules/react-bootstrap/Button';
import InfiniteScroll from "react-infinite-scroll-component";

const context = require.context('../img/', true);
var i=10;
var j=20;

const images = {};
context.keys().forEach((key) => {
  const img = key.split('./').pop() // remove the first 2 characters
  images[img] = context(key);
});

const Good = props => (
    <Card style={{minWidth: '40%', minHeight: '10%'}}>
    <Card.Img variant="top" style={{maxHeight:'60%', maxWidth:'40%'}} src={images[props.good.img].default} alt="..." />
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

    this.state = {goods: [],
    items: []};
  }



  fetchMoreData = () => {
    function slicearrincrement(arr, i, j) {
      return arr.slice(i,j)
      i=i+10
      j=j+10
    };
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(slicearrincrement(this.state.goods,i,j))
      });
    }, 1500);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/goods/')
      .then(response => {
        this.setState({
        goods: response.data,
        items: response.data.slice(0,10)});
      })
      .catch((error) => {
        console.log(error);
      })
    }

    goodListTable() {
    return this.state.items.map(currentgood => {
      return <Good good={currentgood} key={currentgood._id}/>;
    });
  }

  render() {
    return (
      <div>
        <h3>Goods List</h3>
          <InfiniteScroll
                dataLength={this.state.goods.length}
                next={this.fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
            <div>
                <CardDeck>
                { this.goodListTable() }
                </CardDeck>
            </div>
          </InfiniteScroll>
          {console.log(this.state.goods)}
          {console.log(this.state.items)}
      </div>
    )
  }
}
