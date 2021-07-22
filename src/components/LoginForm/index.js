import React, { useState, Component } from 'react';
import {Form, Row, Col, Button } from 'react-bootstrap';

function LoginForm(props) {
    const {setShowModal, showModal }= props
    
    return(
        <div>
            {showModal ? 

        <div>
                <>
                <div className= "modal">
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
                </div>
                </>
            </div>
            
            
            : null} </div>
    )
}

export default LoginForm;