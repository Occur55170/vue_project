<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import IconLogIn from '@/components/icons/IconLogIn.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconLock from '@/components/icons/IconLock.vue'

const router = useRouter();

const form = reactive({
    account: '',
    password: '',
    rememberMe: false
})

const handleLogin = async () => {
    try {
        console.log('提交的資料：', { ...form })

        alert('登入成功！')
        router.push('/dashboard')
    } catch (error) {
        console.error('登入失敗，請稍後再試')
    }
}
</script>
<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <div class="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
                        <IconLogIn class="w-8 h-8 text-white" />
                    </div>
                    <h1 class="text-gray-900 mb-2">歡迎回來</h1>
                    <p class="text-gray-600">請登入您的帳號以繼續</p>
                </div>
                <form class="space-y-6" @submit.prevent="handleLogin">
                    <div>
                        <label for="email" class="block text-gray-700 mb-2">電子郵件</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IconMail class="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="email" type="email" v-model="form.account"
                                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="your@email.com" required />
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-gray-700 mb-2">密碼</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IconLock class="h-5 w-5 text-gray-400" />
                            </div>
                            <input id="password" type="password" v-model="form.password"
                                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="••••••••" required />
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                            <input type="checkbox" v-model="form.rememberMe"
                                class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <span class="ml-2 text-gray-700">記住我
                            </span>
                        </label>
                        <a href="#" class="text-indigo-600 hover:text-indigo-700">忘記密碼？</a>
                    </div>
                    <button type="submit"
                        class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                        <IconLogIn class="w-5 h-5" />
                        登入
                    </button>
                </form>
                <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p class="text-blue-800 text-center">💡 提示：輸入任意電子郵件和密碼即可登入</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>