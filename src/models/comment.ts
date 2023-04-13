import { User } from 'src/models/user';

interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: Date;
}

export default Comment;
