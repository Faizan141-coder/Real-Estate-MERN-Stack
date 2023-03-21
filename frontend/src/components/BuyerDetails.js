import { useState } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import BuyerForm from './BuyerForm'

const BuyerDetails = ({ buyer }) => {

    const handleClick = async () => {
        const response = await fetch('/api/buyerinfo/' + buyer._id, {
            method: 'DELETE'
        })
        
    }

    const updateInfo = async() => {
        const name = prompt('Update Name')
        const location = prompt('Update Location')
        const phoneNo = prompt('Update Phone No')

        const Property = {
            name: name,
            location:location,
            phoneNo: phoneNo
        }

        const update = await fetch('/api/buyerinfo/' + buyer._id, {
            method: 'PUT',
            body: JSON.stringify(Property),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div className="buyer-details">
            <h4>{buyer.name}</h4>
            <p><strong>Location: </strong>{buyer.location}</p>
            <p><strong>Phone No: </strong>{buyer.phoneNo}</p>
            <p>{formatDistanceToNow(new Date(buyer.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            <h2 className="material-symbols-outlined" onClick={updateInfo}>update</h2>
        </div>
    )
}

export default BuyerDetails