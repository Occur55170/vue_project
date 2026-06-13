<script setup lang="ts">
import IconUser from '@/components/icons/IconUser.vue';
import IconMail from '@/components/icons/IconMail.vue';
import IconCalendar from '@/components/icons/IconCalendar.vue';
import IconSquarePen from '@/components/icons/IconSquarePen.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import { AccountStatus } from '@/types/base';
import type { AccountType } from '@/types/base';

defineProps<{
    item: AccountType;
}>();

defineEmits<{
    (e: 'edit', id: string): void;
    (e: 'delete', name: string, id: string): void;
}>();
</script>

<template>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    <IconUser class="w-6 h-6" />
                </div>
                <div>
                    <h3 class="text-gray-900">{{ item.name }}</h3>
                    <span class="inline-block px-2 py-1 rounded-full text-white mt-1"
                        :class="item.status === AccountStatus.ON ? 'bg-green-500' : 'bg-red-500'">
                        {{ item.status === AccountStatus.ON ? '啟用' : '停用' }}
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
            <button @click="$emit('edit', item.id)"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition">
                <IconSquarePen class="w-4 h-4" />
                編輯
            </button>
            <button @click="$emit('delete', item.name, item.id)"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition">
                <IconTrash class="w-4 h-4" />
                刪除
            </button>
        </div>
    </div>
</template>
