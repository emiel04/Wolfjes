import { io, type Socket } from "socket.io-client";
import { ref, type Ref } from "vue";
import { defineStore } from "pinia";

interface SocketStore {
    socket: Ref<Socket | null>;
    isConnected: Ref<boolean>;
    connect: (url: string, accessToken: string, guest?: boolean) => Socket;
    disconnect: () => void;
}

export const useSocketStore = defineStore("socket", (): SocketStore => {
    const socket: Ref<Socket | null> = ref(null);
    const isConnected: Ref<boolean> = ref(false);

    const connect = (
        url: string,
        accessToken: string,
        guest = false,
    ): Socket => {
        if (socket.value) {
            socket.value.disconnect();
        }

        const query = guest
            ? { guestToken: accessToken }
            : { token: accessToken };

        socket.value = io(url, {
            autoConnect: true,
            withCredentials: true,
            query,
            reconnection: true,
        });

        socket.value.on("connect", () => {
            isConnected.value = true;
        });

        socket.value.on("disconnect", () => {
            isConnected.value = false;
        });

        return socket.value;
    };

    const disconnect = () => {
        if (socket.value) {
            socket.value.disconnect();
            socket.value = null;
            isConnected.value = false;
        }
    };

    return {
        socket,
        isConnected,
        connect,
        disconnect,
    };
});
