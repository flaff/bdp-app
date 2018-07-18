const
    createEmit = (dispatch) => (type, payload) => dispatch({
        type: type,
        payload
    }),

    createEmitProxy = (emit) => (type, payload) => (value) =>
        emit(type, payload !== undefined ? payload : value) || value,

    createEmitProxyError = (emit) => (type, payload) => (error) => {
        emit(type, payload || error && error.message || error);
        throw error;
    };

module.exports = {
    createEmit,
    createEmitProxy,
    createEmitProxyError
};
