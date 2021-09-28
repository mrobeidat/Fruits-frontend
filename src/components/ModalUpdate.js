import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'


export class ModalUpdate extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>MY Favorite Fruit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={(event) => this.props.update(event)}>

                            <Form.Group className="mb-3" >
                                <Form.Label>image</Form.Label>
                                <Form.Control type="text" name="image" defaultValue={this.props.image} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>name</Form.Label>
                                <Form.Control type="text" name="name" defaultValue={this.props.name} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>price</Form.Label>
                                <Form.Control type="text" name="price" defaultValue={this.props.price} />
                            </Form.Group>

                            <Button onClick={this.props.close}variant="primary" type="submit">
                                submit                          
                                  </Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ModalUpdate
