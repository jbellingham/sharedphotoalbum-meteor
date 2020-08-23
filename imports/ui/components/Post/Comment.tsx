import React, { ReactElement } from 'react'
import { CommentModel } from '../../../api/comments/comments'

interface ICommentProps {
    text: string
    likes: number
    commenter: {
        email: string
        name: string
    }
}

function Comment(props: ICommentProps): ReactElement {
    return (
        <div className="comment">
            <div className="d-flex flex-row">
                <div className="comment-body">
                    <span className="commenter-name">{props.commenter.name || props.commenter.email}</span>
                    <span>
                        <br />
                        {props.text}
                    </span>
                </div>
                <br />
            </div>
        </div>
    )
}

export default Comment
