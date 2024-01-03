//@desc This class is resposible about operational errors(errors That i can predict)

class ApiError extends Error{
constructor(message,statusCode){
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? ' fail' : 'error';
    this.isOpretional = true;
}
}

module.exports = ApiError;