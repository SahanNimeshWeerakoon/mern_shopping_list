import React, { Component } from 'react'

class PostForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="post-form">
                <h1>Add Post</h1>
                <form>
                    <div>
                        <label>Titiel</label>
                        <input type="text" name="title" />
                    </div>
                    <div>
                        <label>Body</label>
                        <textarea name="body"></textarea>
                    </div>
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        );
    }
}

export default PostForm