const BuyerInfo = require('../models/buyerInfoModel')
const mongoose = require('mongoose')

const getBuyerInfos = async (req ,res) => {
    const buyerinfos = await BuyerInfo.find({}).sort({createdAt: -1})

    res.status(200).json(buyerinfos)
}

const getBuyerInfo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such buyer info exist'})
    }

    const buyerinfo = await BuyerInfo.findById(id)

    if (!buyerinfo) {
        return res.status(404).json({error: 'No such buyer info exist'})
    }

    res.status(200).json(buyerinfo)
}

const createBuyerInfo = async (req, res) => {
    const {name, location, phoneNo} = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!location) {
        emptyFields.push('location')
    }
    if (!phoneNo) {
        emptyFields.push('phoneNo')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const buyerinfo = await BuyerInfo.create({
            name,
            location,
            phoneNo
        })
        res.status(200).json(buyerinfo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteBuyerInfo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such buyer info exist'})
    }

    const buyerinfo = await BuyerInfo.findOneAndDelete({_id: id})

    if (!buyerinfo) {
        return res.status(404).json({error: 'No such buyer info exist'})
    }

    res.status(200).json(buyerinfo)
}

const updateBuyerInfo = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such buyer info exist'})
    }

    const buyerinfo = await BuyerInfo.findOneAndUpdate({_id: id}, {
         ...req.body
    })

    if (!buyerinfo) {
        return res.status(404).json({error: 'No such buyer info exist'})
    }    

    res.status(200).json(buyerinfo)
}

module.exports = {
    getBuyerInfos,
    getBuyerInfo,
    createBuyerInfo,
    deleteBuyerInfo,
    updateBuyerInfo
}