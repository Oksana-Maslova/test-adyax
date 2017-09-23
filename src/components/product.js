import React, {Component} from 'react';
import './product.css';
import { Row, Col } from 'react-flexbox-grid';

const PRODUCTS = [
    {
        id: 1,
        title: "Title Lorem ipsum dolor sit",
        sub_title: "Lorem ipsum dolor sit amet, quis dictum mauris erat aliquam, ac in pede pharetra quis non et.",
        sku: [
            {
                min: 1,
                max: 5,
                price: 10,
                label: 'Bread',
                image: "http://www.holdsworthfoods.co.uk/images/srv/product-enlargement/Frozen/Bread/Speciality%20Rolls%20for%20Filling/49650%20Multigrain%20Square%20Bread%20Rolls.jpg"
            },
            {
                price: 20,
                min: 2,
                max: 6,
                label: "Eggs",
                image: "http://redonline.cdnds.net/main/thumbs/18009/should-i-freeze-my-eggs---facebook-offer-egg-freezing---womens-fertility---health---redonline__square.jpg"
            },
            {
                price: 30,
                min: 3,
                max: 7,
                label: "Tomatoes",
                image: "https://www.apieceofrainbow.com/wp-content/uploads/2017/01/grow-tomatoes-5-secrets-apieceofrainbowblog-29.jpg"
            }
            ]
    },
    {   id: 2,
        title: "Title Lorem ipsum dolor sit",
        sub_title: "Lorem ipsum dolor sit amet, quis dictum mauris erat aliquam, ac in pede pharetra quis non et.",
        sku: [
            {
                min: 1,
                max: 5,
                price: 10,
                label: 'Bread',
                image: "http://www.holdsworthfoods.co.uk/images/srv/product-enlargement/Frozen/Bread/Speciality%20Rolls%20for%20Filling/49650%20Multigrain%20Square%20Bread%20Rolls.jpg"
            },
            {
                price: 20,
                min: 2,
                max: 6,
                label: "Eggs",
                image: "http://redonline.cdnds.net/main/thumbs/18009/should-i-freeze-my-eggs---facebook-offer-egg-freezing---womens-fertility---health---redonline__square.jpg"
            },
            {
                price: 30,
                min: 3,
                max: 7,
                label: "Tomatoes",
                image: "https://www.apieceofrainbow.com/wp-content/uploads/2017/01/grow-tomatoes-5-secrets-apieceofrainbowblog-29.jpg"
            }
            ]
    },
    {
        id: 3,
        title: "Title Lorem ipsum dolor sit",
        sub_title: "Lorem ipsum dolor sit amet, quis dictum mauris erat aliquam, ac in pede pharetra quis non et.",
        sku: [
            {
                min: 1,
                max: 5,
                price: 10,
                label: 'Bread',
                image: "http://www.holdsworthfoods.co.uk/images/srv/product-enlargement/Frozen/Bread/Speciality%20Rolls%20for%20Filling/49650%20Multigrain%20Square%20Bread%20Rolls.jpg"
            },
            {
                price: 20,
                min: 2,
                max: 6,
                label: "Eggs",
                image: "http://redonline.cdnds.net/main/thumbs/18009/should-i-freeze-my-eggs---facebook-offer-egg-freezing---womens-fertility---health---redonline__square.jpg"
            },
            {
                price: 30,
                min: 3,
                max: 7,
                label: "Tomatoes",
                image: "https://www.apieceofrainbow.com/wp-content/uploads/2017/01/grow-tomatoes-5-secrets-apieceofrainbowblog-29.jpg"
            }
            ]
    },
    ];

class ProductList extends Component {
    state = {
        items: PRODUCTS,
        total: PRODUCTS.map((item) => item.sku[0].price * item.sku[0].min).reduce((a, b) => a + b)
    };


    handleChangeProduct = (updatedItem, index) => {
        let items = this.state.items;
        items[index] = updatedItem;
        this.setState({
            items,
            total: this.countTotal(items)
        });
    };

    handleDeleteItem = (index) => {
        let items = this.state.items;
        items.splice(index, 1);

        this.setState({
            items,
            total: this.countTotal(items)
        });
    };

    countTotal = (items) => {
        let total = 0;
        items.forEach((item) => {
            let sku = item.hasOwnProperty('activeSku') ? item.activeSku : item.sku[0];
            total += sku.price * (item.quantity ? item.quantity : sku.min);
        });
        return total;
    }



    render() {
        const {items} = this.state;
        return (
            <Col>
                <Col>
                    {
                        items.map((el, index) => {
                            return (
                                <Product
                                    key={el.id}
                                    index={index}
                                    item={el}
                                    onDelete={this.handleDeleteItem}
                                    onChange={this.handleChangeProduct}
                                />);
                        })
                    }
                </Col>
                <Row end="xs" className="total">
                    {this.state.total} €
                </Row>
            </Col>
        )
    }
}


class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeSku: props.activeSku || props.item.sku[0]
        };
    }

    handleChange = (event) => {
        this.setState({
            activeSku: this.props.item.sku.filter((sku) => sku.label === event.target.value)[0]
        }, () => {
            this.props.onChange({
                ...this.props.item,
                activeSku: this.state.activeSku
            }, this.props.index);
        });
    }

    handleChangeProductQuantity = (quantity) => {
        let updatedItem = {
            ...this.props.item,
            quantity,
            activeSku: this.state.activeSku
        };
        this.props.onChange(updatedItem, this.props.index);
     }

    render() {
        const {onDelete, index} = this.props;
        return (
            <Col className="product-block">
                <Row center="xs" className="product">
                    <Col xs={12} >
                        <Row center="xs">
                            <Col xs={9} className="first-section">
                                <Row center="xs" middle="xs">
                                    <Col xs={4} >
                                        <img className="image" src={this.state.activeSku.image} alt=" " width="131px" height="131px"/>
                                    </Col>
                                    <Col xs={8}>
                                        <Row start="xs" className="title">
                                             {this.props.item.title}
                                        </Row>
                                        <Row start="xs" className="subtitle">
                                            {this.props.item.sub_title}
                                        </Row>
                                        <Row className="select-sku">
                                            <select id="sku" value={this.state.skuLabel} onChange={this.handleChange} >
                                                {this.props.item.sku.map((sku, index) => {
                                                    return (<option key={index} value={sku.label}>{sku.label}</option>)
                                                })}
                                            </select>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3}>
                                <Row end="xs" className="delete-row">
                                    <button className="delete" onClick={() => {onDelete(index)}} />
                                </Row>
                                <Row center="xs">
                                    <Col xs={12}>
                                        <EstimateProduct activeSku={this.state.activeSku}
                                                         onChange={this.handleChangeProductQuantity}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
    );
    }
}

class EstimateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: props.activeSku.min,
            worth: props.activeSku.price * props.activeSku.min
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.activeSku !== this.props.activeSku  ) {
            this.setState (
                {
                    quantity: nextProps.activeSku.min,
                    worth: nextProps.activeSku.price * nextProps.activeSku.min
                }
            )}
    }

    handleChangeQuantity = (increase = false) => {
        if(increase && this.state.quantity === this.props.activeSku.max) return;
        if(!increase && this.state.quantity === this.props.activeSku.min) return;

        let quantity = increase ? this.state.quantity + 1 : this.state.quantity - 1;
        this.setState({
            quantity,
            worth: this.props.activeSku.price * quantity
        });
        this.props.onChange(quantity);
    }

    render () {
        const {max, min} = this.props.activeSku;
        const {quantity, worth} = this.state;
        return (
            <Row middle="xs">
                <Col xs={3} >
                    <Row center="xs">
                        <button
                            className="button-quantity"
                            disabled={quantity === min}
                            onClick={() => { this.handleChangeQuantity(false) }}
                            name="decrease">
                            -
                        </button>
                    </Row>
                </Col>
                <Col xs={1} className="quantity">
                    {quantity}
                </Col>
                <Col xs={3}>
                    <Row center="xs">
                        <button
                            className="button-quantity"
                            disabled={quantity === max}
                            onClick={() => { this.handleChangeQuantity(true) }}
                            name="increase">
                            +
                        </button>
                    </Row>
                </Col>
                <Col xs={5} >
                    <Row end="xs" className="worth">
                        {worth} €
                    </Row>
                </Col>
            </Row>
        )
    }
}


export default ProductList;