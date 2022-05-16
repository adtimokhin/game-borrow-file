class Response{
    
    /** 
     * 
     * @param {Number} code HTTP code of the response
     * @param {String} msg any message related to the response
     * @param {Object} data any relevant data passed
     */
    constructor(code, msg, data) {
        this.code = code
        this.msg = msg
        this.data = data
    }
}

module.exports = Response;