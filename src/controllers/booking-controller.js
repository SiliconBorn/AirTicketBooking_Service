const {BookingService} =require('../services/index')
const {StatusCodes} = require('http-status-codes')
const {createChannel,subscribeMessage,publishMessage} = require('../utils/messageQueue')
const {REMINDER_BINDING_KEY} = require('../config/severConfig')
const bookingService = new BookingService()


class BookingController{

    constructor(){
    
    }

    async sendMessageToQueue(req,res){
       const  channel = await createChannel()
       const data = {
        message:"success"
       }
       publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data))
       return res.status(200).json({
         message:"successfully published the event"
       })
    }
    async create(req,res){
       
        try {
            const response = await bookingService.createBooking(req.body);
    
            return res.status(StatusCodes.OK).json({
                data:response,
                message:"successfully completed booking",
                success:true,
                err:{}
            })
        } catch (error) {
            
            return res.status(error.statusCode).json({
                data:{},
                message:error.message,
                success:false,
                err:error.explanation
            })
        }
    
    }
  
}





module.exports=BookingController