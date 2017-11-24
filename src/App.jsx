import React, { Component } from 'react';
import { Button, Panel, Col, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: 'https://api.giphy.com/v1/gifs/search?api_key=KAZ5aeC4SrlUli74p7KpuOH7CO6Pic7Y',
      query: '',
      limit: 10,
      giphyUrls: { array: [] },
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    loadProgressBar();
  }

  onClick() {
    this.setState({ query: this.state.query }, () => {
      this.getGifs();
    });
  }

  onChange(e) {
    this.setState({ query: e.target.value }, () => {
      this.getGifs();
    });
  }

  getGifs() {
    axios.get(`${this.state.api}&q=${this.state.query}&limit=${this.state.limit}&offset=0&rating=G&lang=en`)
      .then((res) => {
        const arrayOfUrls = [];
        for (let i = 0; i < this.state.limit; i += 1) {
          arrayOfUrls[i] = res.data.data[i].embed_url;
        }
        const object = { array: arrayOfUrls };
        this.setState({ giphyUrls: object });
      });
  }

  render() {
    return (
      <div className="App">
        <br />
        <div className="container">
          <div className="row">
            <Panel>
              <Col className="btn" md={10}>
                <FormControl
                  onChange={this.onChange}
                  value={this.state.query}
                  type="text"
                  placeholder="Search"
                />
              </Col>
              <Col className="btn" md={2}>
                <Button onClick={this.onClick} bsStyle="danger" block>Find GIF</Button>
              </Col>
            </Panel>
            <Panel>
              <center>
                {
                this.state.giphyUrls.array.map(gif => (<iframe
                  src={gif}
                  width="256"
                  height="256"
                  frameBorder="0"
                  title="gif"
                />))
                }
              </center>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
