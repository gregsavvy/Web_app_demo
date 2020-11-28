import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Good = props => (
  <tr>
    <td>{props.good.param1}</td>
    <td>{props.good.param2}</td>
    <td>{props.good.imgpath}</td>
    <td>{props.good.date.substring(0,10)}</td>
  </tr>
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
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { this.goodListTable() }
          </tbody>
        </table>
      </div>
    )
  }
}
