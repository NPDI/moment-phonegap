import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

export const postUser = (user) => api.post('api/users/create', user)

const apis = {
    postUser
}

export default apis