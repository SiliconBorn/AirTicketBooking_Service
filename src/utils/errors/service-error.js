const {StatusCodes} = require('http-status-codes')



class ServiceError extends Error{

    constructor(messag='Something went wrong',explanation='Service layer error',statusCode=StatusCodes.INTERNAL_SERVER_ERROR){
        super()
  this.message = message;
  this.explanation = explanation;
  this.statusCode= statusCode;
  this.name = 'ServiceError'


    }
}



module.exports=ServiceError