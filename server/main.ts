import { Meteor } from 'meteor/meteor';
import { Comments, CommentModel } from '/imports/api/comments';
import { Posts } from '/imports/api/posts';

function insertPost(text: string, comments: CommentModel[]) {
  const postId = Posts.insert({ text, createdAt: new Date(), comments: [] });
  comments.map((c) => {
    const commentId = Comments.insert({ text: c.text, postId, likes: 0, createdAt: new Date() });
    let post = Posts.findOne(postId)
    post?.comments.push(commentId)
    Posts.update(postId, {
      $push: {comments: commentId}
    })
  })
}

Meteor.startup(() => {
  if (Posts.find().count() === 0)
  insertPost('Some post', [])
  insertPost('Some other post',
    [
      {text: 'Some comment', createdAt: new Date(), likes: 0, postId: ''},
      {text: 'Some other comment', createdAt: new Date(), likes: 0, postId: ''},
    ])
  insertPost('Some other other post', [])
  insertPost('Some post with poop', [])
});
