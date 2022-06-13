import axios from "axios"

export const createPhones = ({name}, {number}) => {
    return axios.post('/api/persons', {name, number})
                .catch(err => console.log(err))
            
} 