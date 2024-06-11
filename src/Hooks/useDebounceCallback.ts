import { useRef, useCallback, useEffect } from "react";

const useDebouncedCallback = (
    callback: Function,
    delay: number,
    dependencies?: any[]
) => {
    const timeout: any = useRef<NodeJS.Timeout>();

    const comboDeps = dependencies
        ? [callback, delay, ...dependencies]
        : [callback, delay];

    const debouncedCallback = useCallback((...args: any) => {
        if (timeout.current != null) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            callback(...args);
        }, delay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, comboDeps);

    // Tạo hàm cancel để clear timeout
    const cancel = useCallback(() => {
        if (timeout.current != null) {
            clearTimeout(timeout.current);
            timeout.current = null;
        }
    }, []);

    // useEffect để clear timeout khi component unmount hoặc dependencies thay đổi
    useEffect(() => {
        return () => {
            cancel();
        };
    }, [cancel]);

    return [debouncedCallback, cancel];
};

export default useDebouncedCallback;
