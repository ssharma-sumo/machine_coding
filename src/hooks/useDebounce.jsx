import React from 'react';

export const useDebounce = (callback, delay) => {
    const timerRef = React.useRef(null);
    const callbackRef = React.useRef(callback);

    callbackRef.current = callback;

    React.useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [delay]);

    return React.useCallback((...args) => {
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            timerRef.current = null;
            callbackRef.current(...args);
        }, delay);
    }, [delay]);
};