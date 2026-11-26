import { Injectable } from '@angular/core';
import { IMessages } from '../../interfaces/IMessages';
import { MessageType } from '../../enums/Messege';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class MessageService {

  private readonly _messages$: BehaviorSubject<IMessages[]> =  new BehaviorSubject<IMessages[]>([]);
  private _nextId: number = 1;

  readonly messages$: Observable<IMessages[]> = this._messages$.asObservable();

  showSuccess(text: string, desc: string): void {
    this.addMessage(text, MessageType.SUCCESS, desc)
  }
  showInfo(text: string, desc: string): void {
    this.addMessage(text, MessageType.INFO, desc )
  }
  showWarn(text: string, desc: string): void {
    this.addMessage(text, MessageType.WARN,desc)
  }
  showError(text: string, desc: string): void {
    this.addMessage(text, MessageType.ERROR,desc)
  }

  closeMessage(id: number): void {
    
    const updated: IMessages[] = this._messages$.value.filter(
      (msg: IMessages): boolean => msg.id !== id
    );
    
    this._messages$.next(updated);
  }

  private addMessage(text: string, type: MessageType, desc: string): void {
    const newId: number = this._nextId++;
    
    const newMsg: IMessages = {
      id: newId,
      text: text,
      desc: desc,
      type: type,
      photo: 'photo-icon',
      icon: 'delete-icon',
    };

    this._messages$.next([...this._messages$.value, newMsg]);

    setTimeout((): void => {
      this.closeMessage(newId);
    }, 5000);
  }
}

