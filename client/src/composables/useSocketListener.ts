import type { Socket } from "socket.io-client";
import { onBeforeUnmount, ref, watch, type Ref } from "vue";

export function useSocketListener<T>(
    socket: Ref<Socket | null>,
    event: string,
    handler: (data: T) => void,
) {
    const currentHandler = ref(handler);
    watch(
        () => handler,
        (newHandler) => {
            currentHandler.value = newHandler;
        },
    );

    let attachedListener: ((data: T) => void) | null = null;

    const stopWatch = watch(
        socket,
        (newSocket, oldSocket) => {
            if (oldSocket && attachedListener) {
                oldSocket.off(event, attachedListener);
                attachedListener = null;
            }
            if (newSocket) {
                attachedListener = (data: T) => currentHandler.value(data);
                newSocket.on(event, attachedListener);
            }
        },
        { immediate: true },
    );

    onBeforeUnmount(() => {
        stopWatch();
        if (socket.value && attachedListener) {
            socket.value.off(event, attachedListener);
        }
    });
}
