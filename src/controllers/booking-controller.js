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
       const payload = {
        data:{
            subject:'This is a notification from queue',
            content:'Some queue will subscribe to this',
            recepientEmail:'just11hiro@gmail.com',
            notificationTime:'2023-01-08 11:30:00'
        },
        service:'CREATE_TICKET'
       }
       publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload))
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