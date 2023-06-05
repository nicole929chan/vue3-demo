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
	async getEvents() {
		try {
			const res = await client.get('events')
			return res.data
		} catch (err) {
			throw err.message
		}
	},
}