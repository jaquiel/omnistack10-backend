const Developer = require('../models/Developer')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req, res) {
        const { latitude, longitude, techs } = req.query

        const techsArray = parseStringAsArray(techs)

        const developers = await Developer.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [ longitude, latitude ],
                    },
                    $maxDistance: 100000000
                }
            }
        })

        console.log(developers)

        return res.json({ developers })
    }
}