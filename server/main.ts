import { Meteor } from 'meteor/meteor';
import './imports/service-config';
import { Comments, CommentModel } from '/imports/api/comments';
import { Posts } from '/imports/api/posts';
import { Feeds } from '/imports/api/feeds';
import { Media } from '/imports/api/media';

function insertPost(text: string, comments: CommentModel[], feedId: string) {
  const postId = Posts.insert({ text, createdAt: new Date(), comments: [], feedId, media: [] });
  comments.map((c) => {
    const commentId = Comments.insert({ text: c.text, postId, likes: 0, createdAt: new Date(), postedBy: '' });
    let post = Posts.findOne(postId)
    post?.comments.push(commentId)
    Posts.update(postId, {
      $push: {comments: commentId}
    })
  })
}

function insertFeed(name: string, description: string): string {
  return Feeds.insert({
    name,
    description,
    posts: [],
    ownerId: '',
    createdAt: new Date()
  })
}

function insertMedia() {
  return Media.insert({
    postId: '',
    createdAt: new Date(),
    publicId: ''
  })
}

Meteor.startup(() => {
  // let feedId: string = '' 
  // if (Feeds.find().count() === 0) {
  //   feedId = insertFeed("Baby Oli", "old mate")
  // }
  // else {
  //   feedId = Feeds.findOne({}, { sort: { createdAt: -1 }})?._id || ''
  // }

  // if (Posts.find().count() === 0) {
  //   insertPost('Some post', [], feedId)
  //   insertPost('Some other post',
  //     [
  //       {text: 'Some comment', createdAt: new Date(), likes: 0, postId: ''},
  //       {text: 'Some other comment', createdAt: new Date(), likes: 0, postId: ''},
  //     ], feedId)
  //   insertPost('Some other other post', [], feedId)
  //   insertPost('Some post with poop', [], feedId)
  // }
});
