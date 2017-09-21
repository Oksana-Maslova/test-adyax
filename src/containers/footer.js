import React, { Component } from 'react';
import './footer.css';
import { Row, Col } from 'react-flexbox-grid';

class Footer extends Component {
    render() {
        return (
            <Col className="footer">
                <Row center="xs">
                    <Col xs={6}>
                        Adyax specializes in working with multi-national, multi-brand companies on a wide range of customer, client and employee-facing solutions.
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Footer;