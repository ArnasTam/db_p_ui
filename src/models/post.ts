import { User } from 'src/models/user';

interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export default Post;
