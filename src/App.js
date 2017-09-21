import React, { Component } from 'react';
import './App.css';
import Header from './containers/header.js';
import './containers/header.css'
import Footer from './containers/footer.js';
import './containers/footer.css'
import { Col } from 'react-flexbox-grid';

class App extends Component {
  render() {
    return (
        <Col>
            <Header />
            <Footer />
        </Col>
    );
  }
}

export default App;
