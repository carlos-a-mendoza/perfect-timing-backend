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

const getUserGroupsImInvolvedIn = (req, res) => {
    const userId = req.params.id;
    knex("usergroups")
    .where({user_id: userId})
    .select(
        "group_name",
        "user_id",
    )
    .then((data)=>{
        return res.status(200).json(data);
    })
    .catch((error)=>{
        return res.status(400).send(`Error retrieving groups: ${error}`)
    });
};

const allGroups = (req, res) => {
    knex
    .select(
        "usergroups.group_name",
        "users.id",
        "users.user_first_name",
        "users.user_last_name",
        "users.user_image_url",
    )
    .from("usergroups")
    .join("users", "usergroups.user_id", "users.id")
    .then((data)=>{
        const groups = data.reduce((output, user)=>{
            const groupIndex = output.findIndex((group) => group.group_name === user.group_name);
            if(groupIndex === -1) {
                output.push({
                    group_name:user.group_name,
                    users:[
                        {
                            id: user.id,
                            user_first_name: user.user_first_name,
                            user_last_name: user.user_last_name,
                            user_image_url: user.user_image_url,
                        },
                    ],
                });
            }else {
                output[groupIndex].users.push({
                    id: user.id,
                    user_first_name: user.user_first_name,
                    user_last_name: user.user_last_name,
                    user_image_url: user.user_image_url,
                });
            }
            return output; 
        }, []);
        return res.status(200).json(groups);
    })
    .catch((error)=>{
        return res.status(400).send(`Error retrieving groups: ${error}`)
    });
};

const getUsersInGroup = (req, res) =>{
    const groupName = req.params.group_name;
    knex("usergroups")
    .where({group_name: groupName})
    .then((groupMembers)=>{
        const userIds = groupMembers.map((user)=>user.user_id);

        //Obtain Events for each user
        const memberEvents = userIds.map((userId)=>{
            return knex("events").where("user_id", userId)
        });

        Promise.all(memberEvents)
            .then((eventLists)=>{
                const usersWithEvents = userIds.map((userId, index) =>({
                    user_id: userId,
                    events: eventLists[index],
                }));
                return res.status(200).json(usersWithEvents);
            })
            .catch((error)=>{
                console.error(error);
                res.status(400).send(`Cannot obtain events from these users`)
            })
    })
    .catch((error)=>{
        return res.status(400).send(`Error retrieving users in this group: ${error}`)
    });
}

const addUserToGroup = (req, res) =>{
    const {group_name, user_id} = req.body;
    if(!group_name || !user_id) {
        return res.status(400).send(`Error: group name and user id are required `)
    }
    knex('usergroups')
    .insert({group_name, user_id})
    .then(()=>{
        res.status(201).send(`User has been added to the group`)
    })
    .catch((error)=>{
        res.status(400).send('Cannot add user to group')
    })
}

module.exports = {
    getEventListByUser, 
    getAllUsersInfo,
    getUserInfo,
    getUserGroupsImInvolvedIn,
    allGroups,
    getUsersInGroup, 
    addUserToGroup,
}