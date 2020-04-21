import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';

class RegisterModal extends Component {;
    constructor(props) {
        super(props);
        
        this.state = {
            modal: false,
            name: '',
            email: '',
            password: '',
            msg: null
        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    toggle = () => {
        // Clear errors
        this.props.clearErrors();

        // toggle modal
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
        
        const { name, email, password } = this.state;
        const newUser = { name, email, password };
        this.props.register(newUser);

        // this.toggle();
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        // Show errors
        if(error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // close modal if authenticated
        if(this.state.modal && isAuthenticated) {
            this.toggle();
        }
    }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Register</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register a New User</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? (
                            <Alert color="danger">{this.state.msg}</Alert>
                        ) : null }
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="Name" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} />
                            </FormGroup>
                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block>Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);