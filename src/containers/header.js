import React, { Component } from 'react';
import './header.css';
import { Row, Col } from 'react-flexbox-grid';
import Product from '../components/product.js';
import '../components/product.css'

class Header extends Component {
    render() {
        return (
            <Col className="header">
                <Row center="xs">
                    <Col xs={8}>
                        <h2>adyax
                            <span>.</span>
                        </h2>
                    </Col>
                    <Col xs={8}>
                        <p className="under-logo">a better experience</p>
                    </Col>
                    <Col xs={8}>
                        <h1>Frond-End Developer
                            <span>.</span>
                        </h1>
                    </Col>
                    <Col xs={6}>
                         <p>Adyax’s core values take top priority: we care for our client, and we care for our people. Staff and clients work in partnership with consistent,  transparent communication.</p>
                    </Col>
                    <Col xsOffset={1} xs={11} className="cart">
                        <Product />
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Header;