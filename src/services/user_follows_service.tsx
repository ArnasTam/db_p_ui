import { ListResponse } from 'src/models/http/list_response';
import { User } from 'src/models/user';
import HttpClient from 'src/services/http_client';

class UserFollowsService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/follows';
  }

  public async follow(id: string): Promise<void> {
    await this._httpClient.post<ListResponse<User>>(`${this._endpoint}/${id}`);
  }
  public async unfollow(id: string): Promise<void> {
    await this._httpClient.delete<User>(`${this._endpoint}/${id}`);
  }
}

export default UserFollowsService;
