import axios from "axios"

const clientGet = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 1000,
	headers: {
    Accept: 'application/json',
    'content-type': 'application/x-www-form-urlencoded',
  },
})

const clientPost = axios.create({
  baseURL: 'http://localhost:3004',
  timeout: 1000,
	// headers: {
  //   Accept: 'application/json',
  //   'content-type': 'multipart/form-data',
  // },
})

const formData = (data = {}) => {
  const form = new FormData()
  for (const property in data) {
    console.log('property...', property, data[property])
    form.append(property, data[property])
  }
  return form
}

export default {
	async getEvents() {
		try {
			const res = await clientGet.get('events')
			return res.data
		} catch (err) {
			throw `fetching events: ${err.message}`
		}
	},
	async getGifts(args = {}) {
		try {
			const res = await clientGet.get('gifts', {
        params: args
      })
			return res.data
		} catch (err) {
			throw `fetching gifts: ${err.message}`
		}
	},
  async getEarnedPoints(args = {}) {
    try {
      const res = await clientGet.get('points', {
        params: args
      })
      return res.data
    } catch (err) {
      console.log(err)
    }
  },
  async getPrizes(args = {}) {
    try {
      const res = await clientGet.get('prizes', {
        params: args
      })
      return res.data
    } catch (err) {
      console.log(err)
    }
  },
  async getCollection(args = {}) {
    try {
      const res = await clientGet.get('collection', {
        params: args
      })
      return res.data
    } catch (err) {
      console.log(err)
    }
  },
  async accumulate(args = {}) {
    try {
      const res = await clientPost.post('points', args)
      // await clientPost.post(`collection/points?user_id=${args.user_id}&event_id=${args.event_id}`, args)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }
}