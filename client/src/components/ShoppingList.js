import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { v4 as uuidv4} from 'uuid' 
import { fetchPosts, removePost } from '../actions/postAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ItemModal from './ItemModal';

class ShoppingList extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    onDeleteClick = (id) => {
        this.props.removePost(id);
    }
    
    static propTypes = {
        fetchPosts: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    render() {
        const {items} = this.props.item;

        const list = items.map(({ _id, name}) => (
            <CSSTransition key={_id} timeout={700} className="fade">
                <ListGroupItem>
                    { this.props.isAuthenticated ? <Button className="remove-btn" color="danger" size="sm" onClick={this.onDeleteClick.bind(this, _id)}>&times;</Button> : null }
                    { name }
                </ListGroupItem>
            </CSSTransition>
        ));
        return (
            <div>
                <Container>
                        <ItemModal />
                        <ListGroup>
                            <TransitionGroup className="shopping-list">
                                {list}
                            </TransitionGroup>
                        </ListGroup>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.posts,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { fetchPosts, removePost })(ShoppingList);