import axios from "axios"

const client = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 1000,
	headers: {
    Accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
  },
})

export default {
	async getUser(user_id) {
		try {
			const res = await client.get('users',{
				params: {
					user_id
				}
			})
			return res.data[0]
		} catch (err) {
			throw `fetching user: ${err.message}`
		}
	},
}