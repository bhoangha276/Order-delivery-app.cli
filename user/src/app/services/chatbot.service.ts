import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CHATBOT_QUESTION_URL } from '../shared/constants/urls'

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(private httpClient: HttpClient) {}

  getResponseChatbot(request: {
    message: string
  }): Observable<{ answer: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    const options = { headers, withCredentials: true }

    return this.httpClient.post<{ answer: string }>(
      CHATBOT_QUESTION_URL,
      request,
      options,
    )
  }
}
