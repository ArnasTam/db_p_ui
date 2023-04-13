import { User } from 'src/models/user';

export interface Message {
  id: string;
  content: string;
  from: User;
  to: User;
}
