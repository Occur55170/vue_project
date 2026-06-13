<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import axios from 'axios';
import IconUsers from '@/components/icons/IconUsers.vue';
import IconLogOut from '@/components/icons/IconLogOut.vue';
import IconSearch from '@/components/icons/IconSearch.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconUser from '@/components/icons/IconUser.vue';
import IconMail from '@/components/icons/IconMail.vue';
import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconSquarePen from '@/components/icons/IconSquarePen.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import Lightbox from '@/components/lightbox.vue';
import type { AccountType, CreateAccountType, EditAccountType } from '@/types/base';

const isLightboxOpen = ref(false);
const editingAccount = ref<AccountType | null>(null);
const accounts = ref<AccountType[]>([]);
const enabledAccount = computed<AccountType[]>(() => {
    return accounts.value.filter(account => account.status === 'ON')
})
const disabledAccount = computed<AccountType[]>(() => {
    return accounts.value.filter(account => account.status === 'OFF')
})

async function getAccounts() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/accounts`, {
            headers: { 'interviewerName': import.meta.env.VITE_API_TOKEN }
        });
        accounts.value = response.data;
    } catch (error) {
        console.error('error:', error);
    }
}

function onCheckDeleteAccount(name: string = '使用者', id: string) {
    const ok = window.confirm(`確定要刪除帳號「${name}」嗎？`)
    if (ok) {
        deleteAccount(id)
    }
}

async function onEditAccount(id: string) {
    const a = await getAccount(id);
    if (a) {
        editingAccount.value = a;
        isLightboxOpen.value = true;
    }
}

async function deleteAccount(id: string) {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-account/${id}`, {
            headers: { 'interviewerName': import.meta.env.VITE_API_TOKEN }
        });
        if (response.status) {
            alert(response.data.message)
        }
    } catch (error) {
        console.error('error', error)
    } finally {
        await getAccounts()
    }
}

function openLightbox() {
    editingAccount.value = null;
    isLightboxOpen.value = true;
}

async function createAccount(data: CreateAccountType) {
    let result = ref(null)
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/create-account`, data, {
            headers: { 'interviewerName': import.meta.env.VITE_API_TOKEN }
        });
        if (response.status) {
            result.value = response.data
        }
    } catch (error) {
        console.error('error', error)
    } finally {
        isLightboxOpen.value = false;
    }
    return result
}

async function updateAccount(data: EditAccountType) {
    try {
        const { id, ...body } = data;
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/update-account/${id}`, body, {
            headers: { 'interviewerName': import.meta.env.VITE_API_TOKEN }
        });
        if (response.status) {
            alert(response.data.message || '更新成功')
            await getAccounts()
        }
    } catch (error) {
        console.error('error', error)
    } finally {
        isLightboxOpen.value = false;
    }
}

async function getAccount(id: string) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/account/${id}`, {
            headers: { 'interviewerName': import.meta.env.VITE_API_TOKEN }
        });
        return response.data;
    } catch (error) {
        console.error('error:', error);
    }
}

onMounted(async () => {
    await getAccounts()
})
</script>

<template>
    <div>
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <IconUsers class="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 class="text-gray-900 text-2xl font-bold">帳號管理系統</h1>
                            <p class="text-gray-600">管理您的所有帳號</p>
                        </div>
                    </div>
                    <RouterLink to="/" class="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
                        <IconLogOut class="w-5 h-5" />
                        登出
                    </RouterLink>
                </div>
            </div>
        </header>
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Nav>
                <div class="mb-6 flex flex-col sm:flex-row gap-4">
                    <div class="flex-1 relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IconSearch class="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" placeholder="搜尋帳號（姓名、郵件、角色）..."
                            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            value="" />
                    </div>
                    <button @click="openLightbox"
                        class="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 whitespace-nowrap">
                        <IconPlus class="w-5 h-5" />
                        新增帳號
                    </button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <p class="text-gray-600 mb-1">總帳號數</p>
                        <p class="text-gray-900">{{ accounts.length }}</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <p class="text-gray-600 mb-1">啟用中</p>
                        <p class="text-gray-900">{{ enabledAccount.length }}</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <p class="text-gray-600 mb-1">已停用</p>
                        <p class="text-gray-900">{{ disabledAccount.length }}</p>
                    </div>
                </div>
            </Nav>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(item, key) in accounts" :key="item.id"
                    class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                                <IconUser class="w-6 h-6" />
                            </div>
                            <div>
                                <h3 class="text-gray-900">{{ item.name }}</h3><span
                                    class="inline-block px-2 py-1 rounded-full text-white mt-1"
                                    :class="item.status === 'ON' ? 'bg-green-500' : 'bg-red-500'">
                                    {{ item.status === 'ON' ? '啟用' : '停用' }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center gap-2 text-gray-600">
                            <IconMail class="w-4 h-4" />
                            <span class="break-all">{{ item.email }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-gray-600">
                            <IconUser class="w-4 h-4" />
                            <span>{{ item.roleLevel }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-gray-600">
                            <IconCalendar class="w-4 h-4" />
                            <span>{{ item.createdAt }}</span>
                        </div>
                    </div>
                    <div class="flex gap-2 pt-4 border-t border-gray-200">
                        <button @click="onEditAccount(item.id)"
                            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition">
                            <IconSquarePen class="w-4 h-4" />
                            編輯
                        </button>
                        <button @click="onCheckDeleteAccount(item.name, item.id)"
                            class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition">
                            <IconTrash class="w-4 h-4" />
                            刪除
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <Lightbox v-if="isLightboxOpen" v-model="isLightboxOpen" :initial-data="editingAccount" @submit="createAccount"
            @update-account="updateAccount" />
    </div>
</template>

<style scoped></style>
