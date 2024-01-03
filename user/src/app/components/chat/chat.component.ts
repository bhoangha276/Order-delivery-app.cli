import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { ChatbotService } from 'src/app/services/chatbot.service'

type MessageType = { name: string; text: string }

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  isChatOpen = false
  chatMessages: MessageType[] = []
  text = ''
  private chatbotSubscription?: Subscription

  constructor(private api: ChatbotService) {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen
  }

  sendMessage() {
    if (this.text.trim() === '') return
    const newMessage: MessageType = { name: 'user', text: this.text }

    this.chatMessages.push(newMessage)
    const userMessage = this.text
    this.text = ''

    let chatbotMessage: MessageType = { name: 'bot', text: '' }
    this.chatbotSubscription = this.api
      .getResponseChatbot({ message: userMessage })
      .subscribe({
        next: (result: { answer: string }) => {
          chatbotMessage = { name: 'bot', text: result.answer }
          this.chatMessages.push(chatbotMessage)
        },
        error: (error: any) => {
          console.error('Response chatbot error: ', error)
        },
      })
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.chatbotSubscription) {
      this.chatbotSubscription.unsubscribe()
    }
  }
}
