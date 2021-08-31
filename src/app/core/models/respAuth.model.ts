import { User } from './user.model';

export class RespAuth {
  ok: boolean;
  token: string;
  user: User;
}
