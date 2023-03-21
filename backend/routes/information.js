const express = require('express')
const {
    createBuyerInfo,
    getBuyerInfos,
    getBuyerInfo,
    deleteBuyerInfo,
    updateBuyerInfo
} = require('../controllers/buyerInfoController')

const router = express.Router()

router.get('/', getBuyerInfos)

router.get('/:id', getBuyerInfo)
 
router.post('/', createBuyerInfo)

router.delete('/:id', deleteBuyerInfo)

router.put('/:id', updateBuyerInfo)

module.exports = router