import { Injectable } from '@angular/core';
import { IMessages } from '../../interfaces/IMessages';
import { MessageType } from '../../enums/Messege';

@Injectable({
  providedIn: 'root',
})


export class MessageService {

  private _messages: IMessages[] = []


  public get messages(): IMessages[] {
    return this._messages;
  }

  private _nextId = 1;

  private addMessage(text: string, type: MessageType, desc: string): void {


    const newId = this._nextId++;
  
    const newMsg: IMessages = {
      id: newId,
      text: text,
      desc: desc,
      type: type,
      photo: 'photo-icon',
      icon: 'delete-icon',
    }
      this._messages.push(newMsg);

    setTimeout(() => {
      this.closeMessage(newId);
    }, 5000);

  }
  
  public closeMessage(id: number): void {
    
    this._messages = this._messages.filter(msg => msg.id !== id);
  }
   public showSuccess(text: string, desc: string) {
    this.addMessage(text, MessageType.SUCCESS, desc)
  }
  public showInfo(text: string, desc: string) {
    this.addMessage(text, MessageType.INFO, desc )
  }

  public showWarn(text: string, desc: string) {
    this.addMessage(text, MessageType.WARN,desc)
  }
  public showError(text: string, desc: string) {
    this.addMessage(text, MessageType.ERROR,desc)

  }
}

