export default function useNotification(
    $q: {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        notify: any
    }) {
    function notifySuccess(message: string) {
        $q.notify({
            message,
            type: 'positive'
        });
    }

    function notifyError(message: string) {
        $q.notify({
            message,
            color: 'negative',
            icon: 'warning'
        });
    }

    return {
        notifySuccess, notifyError
    };
}
