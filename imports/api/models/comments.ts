export interface CommentModel {
  _id?: string;
  text: string;
  createdAt: Date;
  likes: number;
  postId: string | undefined;
  postedBy: string;
}
