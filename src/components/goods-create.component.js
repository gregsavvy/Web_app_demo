import React, { Component } from 'react';
import axios from 'axios';

export default class CreateGood extends Component {
  constructor(props) {
    super(props);

    this.onChangeParam1 = this.onChangeParam1.bind(this);
    this.onChangeParam2 = this.onChangeParam2.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      param1: '',
      param2: '',
      img: '',
      date: ''
    }
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

  onChangeImg(e) {
    this.setState({
      img: e.target.files[0]
    })
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('param1', this.state.param1);
    formData.append('param2', this.state.param2);
    formData.append('img', this.state.img);
    formData.append('date', this.state.date);

    axios.post('http://localhost:5000/goods/add', formData, {
      headers: {
        "Authorization": "token",
        "Content-type": "multipart/form-data",
      },
    })
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err);
      })

    window.location = '/admin';
  }

  render() {
    return (
    <div>
      <h3>Create New Good</h3>
      <form onSubmit={this.onSubmit} encType="multipart/form-data">
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
          <label htmlFor="file">Image: </label>
          <input
              type="file"
              filename="img"
              className="form-control-file"
              onChange={this.onChangeImg}
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
          <input type="submit" value="Create New Good" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
