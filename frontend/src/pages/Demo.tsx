import { useState,useEffect } from "react"


export const Demo = () => {
    const [name, setName] = useState('')

    useEffect(() => {
        console.log('initial load', name)
    }, [])

    useEffect(() => {
        console.log('name', name)
    }, [name])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <div>
            <h1>demo page</h1>
            <input className="border-2 border-gray-300 rounded-md p-2 mt-10" type="text" value={name} onChange={handleChange} />
        </div>
    )
}