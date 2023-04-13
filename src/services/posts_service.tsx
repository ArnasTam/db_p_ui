import { ListResponse } from 'src/models/http/list_response';
import Post from 'src/models/post';
import HttpClient from 'src/services/http_client';

class PostsService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/posts';
  }

  public async getPosts(): Promise<Post[]> {
    const response = await this._httpClient.get<ListResponse<Post>>(
      `${this._endpoint}`,
    );
    return response.data;
  }

  public async getPostById(id: number): Promise<Post> {
    return this._httpClient.get<Post>(`${this._endpoint}/${id}`);
  }

  public async createPost(title: string, content: string): Promise<Post> {
    return this._httpClient.post<Post>(this._endpoint, {
      title,
      content,
    });
  }

  public async updatePost(
    id: number,
    title: string,
    content: string,
  ): Promise<Post> {
    return this._httpClient.put<Post>(`${this._endpoint}/${id}`, {
      title,
      content,
    });
  }

  public async deletePost(id: number): Promise<Post> {
    return this._httpClient.delete<Post>(`${this._endpoint}/${id}`);
  }
}

export default PostsService;
