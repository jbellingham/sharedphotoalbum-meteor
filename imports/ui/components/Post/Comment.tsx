import React, { ReactElement } from 'react'
import { CommentModel } from '../../../api/comments/comments'

interface ICommentProps {
    text: string
    likes: number
    commenter: {
        email: string
    }
}

function Comment(props: ICommentProps): ReactElement {
    return (
        <div className="d-flex flex-row">
            {props.commenter.email}
            <p className="comment">
                Likes:{props.likes}
                <br />
                {props.text}
            </p>
        </div>
    )
}

export default Comment
