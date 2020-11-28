import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Good = props => (
  <tr>
    <td>{props.good.param1}</td>
    <td>{props.good.param2}</td>
    <td>{props.good.imgpath}</td>
    <td>{props.good.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.good._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGood(props.good._id) }}>delete</a>
    </td>
  </tr>
)

export default class GoodsList extends Component {
  constructor(props) {
    super(props);

    this.deleteGood = this.deleteGood.bind(this)
    this.goodListTable = this.goodListTable.bind(this)

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

  deleteGood(id) {
     axios.delete('http://localhost:5000/goods/'+id)
       .then(response => { console.log(response.data)});

     this.setState({
       goods: this.state.goods.filter(el => el._id !== id)
     })
   }

  goodListTable() {
    return this.state.goods.map(currentgood => {
      return <Good good={currentgood} deleteGood={this.deleteGood} key={currentgood._id}/>;
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.goodListTable() }
          </tbody>
        </table>
        <Link to={"/create"}>Create Goods</Link>
      </div>
    )
  }
}
