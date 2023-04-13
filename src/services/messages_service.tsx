import { ListResponse } from 'src/models/http/list_response';
import { Message } from 'src/models/message';
import HttpClient from 'src/services/http_client';

export interface CreateUserData {
  id: string;
  email: string;
  about: string;
}

class MessagesService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/messages';
  }

  public async getMessages(from: string, to: string): Promise<Message[]> {
    const response = await this._httpClient.get<ListResponse<Message>>(
      `${this._endpoint}?from=${from}&to=${to}`,
    );
    return response.data;
  }

  public async getFollowers(id: string): Promise<Message[]> {
    const response = await this._httpClient.get<ListResponse<Message>>(
      `${this._endpoint}/${id}/followers`,
    );
    return response.data;
  }

  public async getFollowing(id: string): Promise<Message[]> {
    const response = await this._httpClient.get<ListResponse<Message>>(
      `${this._endpoint}/${id}/following`,
    );
    return response.data;
  }

  public async createMessage(content: string, toId: string): Promise<Message> {
    return this._httpClient.post<Message>(this._endpoint, {
      content,
      toId,
    });
  }
}

export default MessagesService;
