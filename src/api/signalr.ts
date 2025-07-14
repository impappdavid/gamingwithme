import * as signalR from "@microsoft/signalr";

const URL = "https://localhost:7091/chatHub"; // Your backend URL

class SignalRService {
    private connection: signalR.HubConnection | null;

    constructor() {
        this.connection = null;
    }

    startConnection = (): Promise<void> => {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL, {
                withCredentials: true,
            })
            .withAutomaticReconnect()
            .build();

        return this.connection.start()
            .then(() => console.log("SignalR Connection Started!"))
            .catch((err: unknown) => console.error("SignalR Connection Error: ", err));
    }

    stopConnection = (): void => {
        if (this.connection) {
            this.connection.stop();
            this.connection = null;
        }
    }

    onReceiveMessage = (callback: (message: any) => void): void => {
        this.connection?.on("ReceiveMessage", (message: any) => {
            callback(message);
        });
    }

    sendMessage = (recipientId: string, content: string): void => {
        this.connection?.invoke("SendMessage", recipientId, content)
            .catch((err: unknown) => console.error((err as Error).toString()));
    }
}

const signalRService = new SignalRService();
export default signalRService;