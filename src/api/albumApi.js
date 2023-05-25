import axios from "axios"

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 1000,
	headers: {
    Accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
  },
})

export default {
	async getAlbum(paramsObj = {}) {
		try {
			let res = await client.get('albums', {
				params: paramsObj
			})
			return res.data
		} catch (err) {
			return err.message
		}
	}
}