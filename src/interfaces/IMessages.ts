import { MessageType } from "../enums/Messege";

export interface IMessages {
  id: number,
  text: string,
  type: MessageType,
  desc: string,
  icon: string;
  photo: string;
}