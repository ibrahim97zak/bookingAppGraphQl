const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Booking {
  id: ID!
  event :Event !
  user: User!
  createdAt:String!
  updatedAt :String!
    }

    type Event {
    _id:ID!
    title:String!
    description:String!
    price : Float!
    date: String!
    creator : User!
    }

    type User{
    _id:ID!
    email : String!
    password :String
    createdEvents :[Event!]
    }

    input EventInput { 
    title:String!
    description:String!
    price : Float!
    date: String!
    }

    input UserInput {
    email : String!
    password :String!
    }

    type RootQuery {
      events: [Event!]! # A list of non-null strings of events
      bookings :[Booking!]!
    }

    type RootMutation {
      createEvent(eventInput:EventInput): Event # Takes a non-null string and returns Event
      createUser(userInput:UserInput) : User
      createBooking(eventId:ID!): Booking
      canselBooking(bookingId :ID!):Event!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
      
  `)