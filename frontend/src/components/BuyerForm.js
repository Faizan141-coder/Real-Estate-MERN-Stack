import { useState } from "react"

const BuyerForm = () => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const buyer = {name, location, phoneNo}

        const response = await fetch('/api/buyerinfo', {
            method: 'POST',
            body: JSON.stringify(buyer),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setName('')
            setLocation('')
            setPhoneNo('')
            setError(null)
            setEmptyFields([])
           
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add Buyer Information</h3>

            <label>Name:</label>
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)}
                value={name} 
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Location:</label>
            <input 
                type="text" 
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className={emptyFields.includes('location') ? 'error' : ''}
            />

            <label>Phone No:</label>
            <input 
                type="text" 
                onChange={(e) => setPhoneNo(e.target.value)}
                value={phoneNo} 
                className={emptyFields.includes('phoneNo') ? 'error' : ''}
            />

            <button>Add Buyer Details</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BuyerForm