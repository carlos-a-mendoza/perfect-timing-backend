const knex = require('knex')(require('../knexfile'));

const getEventListByUser = (req, res) => {
    const userId = req.params.id;
    knex("users")
        .where({id: userId})
        .first()
        .then((user) =>{
            if(!user) {
                return res.status(404).json({message: "User not found"});
            }

            knex("events")
                .where("user_id", userId)
                .then((eventList) => {
                    res.status(200).json(eventList);
                })
                .catch((error)=> {
                    console.error(error);
                    res.status(500).json({message: "An error occurred while fetching events"})
                });
        })
        .catch((error)=>{
            console.error(error)
            res.status(500).json({message: `An error occurred while fetching user information`})
        });

};

module.exports = {
    getEventListByUser
}