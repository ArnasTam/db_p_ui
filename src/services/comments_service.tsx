import Comment from 'src/models/comment';
import { ListResponse } from 'src/models/http/list_response';
import HttpClient from 'src/services/http_client';

class CommentsService {
  private _httpClient: HttpClient;
  private readonly _endpoint: string;

  constructor(client: HttpClient) {
    this._httpClient = client;
    this._endpoint = '/comments';
  }

  public async getCommentsByPostId(postId: number): Promise<Comment[]> {
    const response = await this._httpClient.get<ListResponse<Comment>>(
      `${this._endpoint}?postId=${postId}`,
    );
    return response.data;
  }

  public async getCommentByid(id: number): Promise<Comment> {
    return this._httpClient.get<Comment>(`${this._endpoint}/${id}`);
  }

  public async createComment(
    content: string,
    postId: number,
  ): Promise<Comment> {
    return this._httpClient.post<Comment>(this._endpoint, {
      content,
      postId,
    });
  }

  public async updateComment(id: number, content: string): Promise<Comment> {
    return this._httpClient.put<Comment>(`${this._endpoint}/${id}`, {
      content,
    });
  }

  public async deleteComment(id: number): Promise<Comment> {
    return this._httpClient.delete<Comment>(`${this._endpoint}/${id}`);
  }
}

export default CommentsService;
