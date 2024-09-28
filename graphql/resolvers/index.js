const bcrypt = require('bcryptjs');
const Event = require('../../model/event.model');
const User = require('../../model/user.model');
const Booking = require ('../../model/booking.model')

const events = async eventIds => {
    try {
        const events = await Event.findById({ _id: { $in: eventIds } })
        events.map(event => {
            return {
                ...event._doc
                , _id: event.id,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            };
        })
        return events
    } catch (error) {
        throw error
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error('User not found');
        }
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    } catch (error) {
        throw error
    }
}

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
                return events.map(event => {
                    return {
                        ...event._doc,
                        _id: event.id,
                        date: new Date(event._doc.date).toISOString(),
                        creator: user.bind(this, event._doc.creator)
                    }
                })
        } catch (error) {
            throw error
        }
        
            
    },
    bookings: async () => {
        try {
            const bookings = await Bookings.find()
            return bookings.map(booking => {
                return {...booking._doc,
                    _id: booking.id,
                    user: user.bind(this, booking._doc.user),
                    event: events.bind(this, booking._doc.event),
                    createdAt:new Date(booking._doc.createdAt).toISOString(),
                    updatedAt:new Date(booking._doc.updatedAt).toISOString()
                }
            })
        } catch (error) {
            throw error
        }
    },
    createEvent: async (args) => {

        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '66bb1688e01e9accd33f0de9'
        });
        let createdEvent;
        try {
            const result = await event
            .save()
                createdEvent = {
                    ...result._doc, _id: result._doc._id.toString(),
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, result._doc.creator),
                };
                const creator= await User.findById('66bb1688e01e9accd33f0de9')

                if (!creator) {
                    throw new Error('USER NOT FOUND')
                }
                creator.createdEvents.push(event)
                 await creator.save()

                return createdEvent

        } catch (error) {
            throw error
        }
    },
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })

            if (existingUser) {
                throw new Error('Email is already in use')
            }
            const hashedPassword= await bcrypt.hash(args.userInput.password, 12)

                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                })
                const result = await user.save()

                return { ...result._doc, password: null, _id: result._doc._id.toString() }

        } catch (error) {
            throw error
        }

    },
    bookinEvent: async (args) => {
        try {
            
        } catch (error) {
            
        }
    }
}