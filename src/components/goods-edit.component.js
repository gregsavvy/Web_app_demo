import React, { Component } from 'react';
import axios from 'axios';

export default class EditGood extends Component {
  constructor(props) {
    super(props);

    this.onChangeParam1 = this.onChangeParam1.bind(this);
    this.onChangeParam2 = this.onChangeParam2.bind(this);
    this.onChangeImgPath = this.onChangeImgPath.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      param1: '',
      param2: '',
      imgpath: '',
      date: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/goods/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          param1: response.data.param1,
          param2: response.data.param2,
          imgpath: response.data.imgpath,
          date: response.data.date
        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  onChangeParam1(e) {
    this.setState({
      param1: e.target.value
    })
  }

  onChangeParam2(e) {
    this.setState({
      param2: e.target.value
    })
  }

  onChangeImgPath(e) {
    this.setState({
      imgpath: e.target.value
    })
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const good = {
      param1: this.state.param1,
      param2: this.state.param2,
      imgpath: this.state.imgpath,
      date: this.state.date
    }

    console.log(good);

    axios.post('http://localhost:5000/goods/update/' + this.props.match.params.id, good)
      .then(res => console.log(res.data));

    window.location = '/admin';
  }

  render() {
    return (
    <div>
      <h3>Edit Good</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
        <label>Name: </label>
        <input  type="text"
            required
            className="form-control"
            value={this.state.param1}
            onChange={this.onChangeParam1}
            />
      </div>
      <div className="form-group">
        <label>Description: </label>
        <input  type="text"
            required
            className="form-control"
            value={this.state.param2}
            onChange={this.onChangeParam2}
            />
      </div>
      <div className="form-group">
        <label>Image: </label>
        <input
            type="text"
            className="form-control"
            value={this.state.imgpath}
            onChange={this.onChangeImgPath}
            />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <input
              type="date"
              className="form-control"
              value={this.state.date}
              onChange={this.onChangeDate}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Good" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
