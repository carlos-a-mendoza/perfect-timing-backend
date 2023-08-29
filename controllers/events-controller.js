const knex = require('knex')(require('../knexfile'));

const getEventList = (req, res) => {
    knex("events")
    .select(
        "events.id",
        "event_name",
        "event_description",
        "event_date",
        "event_category",
        "user_id"
      )
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((error)=>{
        res.status(400).send(`Error retrieving Events: ${error}`)
    }); 
};

const getEventById = (req, res) => {
    const eventId = req.params.id;
    knex('events')
    .where({id: eventId})
    .first()
    .select(
        "events.id",
        "event_name",
        "event_description",
        "event_date",
        "event_category",
        "user_id"
    )
    .then((eventList) =>{
        if (!eventList){
            return res.status(400).json({
                message: 'List of Events not found'
            });
        }
        res.status(200).json(eventList);
    })
    .catch ((error) =>{
        res.status(500).json({message: 'An Error occurred while fetching data'});
    });
};

const createNewEvent = (req, res) =>{
    const newEvent = {
        event_name: req.body.event_name,
        event_description: req.body.event_description,
        event_date: req.body.event_date,
        event_category: req.body.event_category,
        user_id: req.body.user_id,
    };

    knex('events')
        .insert(newEvent)
        .then(() => {
            return knex('events').where({})
        })
        .then ((createdNewEvent)=>{
            return res.status(201).json(createdNewEvent[0]);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({message: `Unable to create new event`});
        });
};

module.exports ={
    getEventList,
    getEventById, 
    createNewEvent
};