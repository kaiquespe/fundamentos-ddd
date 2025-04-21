export interface AlertProps {
  productId: string;
  message: string;
  type: "email" | "in-app";
  date: Date;
}

export class Alert {
  private props: AlertProps;

  constructor(props: AlertProps) {
    if (!props.message.trim())
      throw new Error("Mensagem de alerta nao pode ser vazia");
    this.props = props;
  }

  get productId(): string {
    return this.props.productId;
  }

  get message(): string {
    return this.props.message;
  }

  set message(newMessage: string) {
    if (!newMessage.trim())
      throw new Error("Mensagem de alerta nao pode ser vazia");
    this.props.message = newMessage;
  }

  get type(): "email" | "in-app" {
    return this.props.type;
  }

  get date(): Date {
    return this.props.date;
  }

  set date(newDate: Date) {
    if (!(newDate instanceof Date) || isNaN(newDate.getTime())) {
      throw new Error("Data invalida para alerta");
    }
    this.props.date = newDate;
  }
}
