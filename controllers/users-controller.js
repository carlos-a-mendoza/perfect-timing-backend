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

const getAllUsersInfo = (req, res) => {
    knex("users")
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((error)=>{
        res.status(400).send(`Error retrieving User Information: ${error}`)
    }); 
};


const getUserInfo = (req, res) => {
    const userId = req.params.id;
    knex("users")
    .where({id: userId})
    .first()
    .select(
        "user_first_name",
        "user_last_name",
        "user_birthday",
        "user_city",
        "user_interests",
        "user_groups",
        "user_description",
      )

    .then((data)=>{
        if(data.length === 0){
            return res.status(404).send(`User with an Id of ${userId} cannot be found`)
        }
        res.status(200).json(data);
    })
    .catch((error)=>{
        res.status(400).send(`Error retrieving User Information: ${error}`)
    }); 
};

module.exports = {
    getEventListByUser, 
    getAllUsersInfo,
    getUserInfo
}