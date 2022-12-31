const axios = require('axios')
const {BookingRepository} = require("../repository/index")
const {FLIGHT_SERVICE_PATH} = require("../config/severConfig")
const {ServiceError} = require("../utils/errors")
class BookingService{


    constructor(){
        this.bookingRepository = new BookingRepository()
    }

    async createBooking(data){
      
        
        try {
            const flightId = data.flightId;
            let getFlightReqURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
            const response = await axios.get(getFlightReqURL)
            const flightData = response.data.data
            // return flight.data.data
            let priceOfTheFlight= flightData.price

            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError(
                    'Something went wrong in the booking process',
                    'Insufficient seats for the booking'
                )
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;

            const bookingPayload = {...data,totalCost}

            const booking = await this.bookingRepository.create(bookingPayload)
             
            const updateFlightReqURL =`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`
            
            await axios.patch(updateFlightReqURL,{
                totalSeats:flightData.totalSeats - booking.noOfSeats
            })
            
            return booking
            
        } catch (error) {
                 if(error.name==='RepositoryError' || error.name==='ValidationError'){
                    throw error
                 }            
            throw new ServiceError()
        }
    }

}


module.exports= BookingService
