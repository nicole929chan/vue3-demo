<template>
	<div>
		<p>Album ID: <input type="text" v-model="searchInput" /></p>
		<p v-if="executor.loading.value">Loading: {{ executor.loading }}</p>
    <p>Results: {{ executor.results }}</p>
		<p>Error: {{ executor.error }}</p>
	</div>
</template>
<script>
import { ref, watch } from 'vue'
import usePromise from '../hooks/usePromise'
import client from '../api/albumApi'
export default {
	setup(props, context) {
		const searchInput = ref("")
    const executor = usePromise(async (args) => {
      return await client.getAlbum(...args)
    })

    watch(searchInput, (newValue) => {
      executor.createPromise({ id: newValue });
    })

		return {
			searchInput, executor
		}
	}
}
</script>