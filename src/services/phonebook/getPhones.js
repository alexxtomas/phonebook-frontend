import axios from "axios"

export const getPhones = () => {
   return axios
        .get('/api/persons')
        .then(res => {
            const {data} = res
            return data
        })
}