import React, { useState } from 'react';
import { Card, Button, Modal, Container, Row, Col,Carousel } from 'react-bootstrap';

import {FaEye,FaCartPlus} from "react-icons/fa";
import './CardItem.css';


export default function CardItem(props) {
    const { product, onAdd } = props;

    const [show, setShow] = useState(false);

    const handleClose = (e) => {
        setShow(false);
    }
    const quickView = (e) => {
        setShow(true);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col >
                                {/* <Image className="thumnailImage" src={product.image} rounded /> */}
                                <Carousel variant="dark">
                                    <Carousel.Item interval={1000}>
                                        <img
                                            className="d-block w-100"
                                            src={product.image}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item interval={500}>
                                        <img
                                            className="d-block w-100"
                                            src={product.image2}
                                            alt="Second slide"
                                        />
                                    </Carousel.Item>
                                </Carousel>
                            </Col>
                            <Col>
                                <h4 >{product.name}</h4>
                               
                                <div className="price-box">
                                    <span className="product-price-win">$ {product.price}</span>
                                </div>
                                <div className="rating">
                                    <input type="radio" name="rating" value="5" id="5" /><label htmlFor="5">☆</label>
                                    <input type="radio" name="rating" value="4" id="4" /><label htmlFor="4">☆</label>
                                    <input type="radio" name="rating" value="3" id="3" /><label htmlFor="3">☆</label>
                                    <input type="radio" name="rating" value="2" id="2" /><label htmlFor="2">☆</label>
                                    <input type="radio" name="rating" value="1" id="1" /><label htmlFor="1">☆</label>
                                </div>
                                <div className="product-desc"><p>{product.desc}</p></div>
                                <Button variant="secondary" onClick={(e) => onAdd(e, product)}>
                                <FaCartPlus size='1.6em'/> ADD TO CART
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                </Modal.Body>
            </Modal>
            <div>
                <Card className="cardItem" >
                    {/* <Card.Img variant="top" src={product.image} /> */}
                    <Carousel fade pause="hover" interval='5000'>
                                    <Carousel.Item >
                                        <img
                                            className="d-block w-100"
                                            src={product.image}
                                            alt="First slide"
                                        />
                                    </Carousel.Item>
                                    <Carousel.Item >
                                        <img
                                            className="d-block w-100"
                                            src={product.image2}
                                            alt="Second slide"
                                        />
                                    </Carousel.Item>
                                </Carousel>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text className="cardText">
                            {product.desc.slice(0,90)}...
                        </Card.Text>
                      
                        <div className="price-box">
                            <span className="product-price" >$ {product.price}</span>
                        </div>
                        <button className="btn btn-sm btn-secondary"  onClick={(e) => quickView(e)}> <FaEye/> Quick View</button>
                    </Card.Body>
                </Card>

            </div>
        </>
    )
}
