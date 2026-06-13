<template>
    <div class="p-5">
        <h2 class="text-xl font-bold mb-3">產品列表</h2>
        <ul>
            <li v-for="item in products" :key="item.id" class="border-b py-2">
                {{ item.name }} - ${{ item.price }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])

onMounted(async () => {
    try {
        // 替換成你的 API 網址
        const response = await axios.get('https://api.example.com/products')
        products.value = response.data
    } catch (error) {
        console.error('資料載入失敗：', error)
    }
})
</script>