const axios = require('axios')
const Developer = require('../models/Developer')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage, su } = require('../websocket')

module.exports = {
    async store(req, res) {

        const { github_username, techs, latitude, longitude } = req.body
        
        let developer = await Developer.findOne({ github_username })

        if (!developer) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = apiResponse.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            developer = await Developer.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
            
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-developer', developer)

        }

        return res.json(developer)

    },

    async index(req, res) {
        developers = await Developer.find()

        return res.json(developers)
    },

    async update(req, res) {      
        
        //const { techs } = req.body

        //const techsArray = parseStringAsArray(techs)

        let developer = await Developer.findByIdAndUpdate(req.params.id, developer, { new : true})

        return res.json(developer)
        
    },

    async destroy(req, res) {        
        await Developer.findByIdAndRemove(req.params.id)

        return res.send();
    }

}