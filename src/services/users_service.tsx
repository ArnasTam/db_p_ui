import { ListResponse } from 'src/models/http/list_response';
import { User } from 'src/models/user';
import HttpClient from 'src/services/http_client';

export interface CreateUserData {
  id: string;
  email: string;
  about: string;
}

class UsersService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/users';
  }

  public async getUsers(): Promise<User[]> {
    const response = await this._httpClient.get<ListResponse<User>>(
      this._endpoint,
    );
    return response.data;
  }

  public async getFollowers(id: string): Promise<User[]> {
    const response = await this._httpClient.get<ListResponse<User>>(
      `${this._endpoint}/${id}/followers`,
    );
    return response.data;
  }

  public async getFollowing(id: string): Promise<User[]> {
    const response = await this._httpClient.get<ListResponse<User>>(
      `${this._endpoint}/${id}/following`,
    );
    return response.data;
  }

  public async createUser(createUserData: User): Promise<User> {
    return this._httpClient.post<User>(this._endpoint, createUserData);
  }
}

export default UsersService;
