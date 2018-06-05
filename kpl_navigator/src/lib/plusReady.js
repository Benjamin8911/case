export const plusReady = (fn) => {
    if (window.plus) {
        fn();
    } else {
        document.addEventListener('plusready', fn, false)
    }
}