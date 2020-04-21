import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addPost } from '../actions/postAction';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modal: false,
            name: ''
        }
    }

    static propType = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const item = {
            name: this.state.name
        }
        this.props.addPost(item);
        this.toggle();
    }

    render() {
        const {isAuthenticated} = this.props;
        return (
            <div>
                { isAuthenticated ? <Button color="dark" style={{marginBottom: '2rem'}} onClick={this.toggle}>Add Item</Button> : <h4 className="mb-3 ml-4">Please login to manage items.</h4> }
                
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.handleChange}
                                    />
                            </FormGroup>
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block>Add Item</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.posts,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addPost })(ItemModal)