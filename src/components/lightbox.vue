<script lang="ts" setup>
import { reactive, watch, computed } from 'vue';
import IconX from '@/components/icons/IconX.vue';
import { RoleLevel, AccountStatus } from '@/types/base';
import type { CreateAccountType, EditAccountType } from '@/types/base';

const props = defineProps<{
    modelValue: boolean;
    initialData?: Partial<EditAccountType> | null;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'submit', data: CreateAccountType): void;
    (e: 'update-account', data: EditAccountType): void;
}>();

const isEditing = computed(() => !!props.initialData?.id);

const formData = reactive<CreateAccountType>({
    name: '',
    email: '',
    roleLevel: RoleLevel.ADMIN,
    status: AccountStatus.ON
});

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            formData.name = props.initialData?.name || '';
            formData.email = props.initialData?.email || '';
            formData.roleLevel = props.initialData?.roleLevel || RoleLevel.ADMIN;
            formData.status = props.initialData?.status || AccountStatus.ON;
        } else {
            formData.name = '';
            formData.email = '';
            formData.roleLevel = RoleLevel.ADMIN;
            formData.status = AccountStatus.ON;
        }
    }
);

const close = () => {
    emit('update:modelValue', false);
};

const handleSubmit = () => {
    if (isEditing.value && props.initialData?.id) {
        emit('update-account', { id: props.initialData.id, ...formData });
    } else {
        emit('submit', formData);
    }
};
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="modelValue"
                class="fixed inset-0 bg-black backdrop-blur-sm flex items-center justify-center p-4 z-50"
                @click="close">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" @click.stop>
                    <div
                        class="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                        <h2 class="text-xl font-bold text-gray-900">{{ isEditing ? '編輯帳號' : '新增帳號' }}</h2>
                        <button type="button" @click="close"
                            class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                            <IconX class="w-5 h-5" />
                        </button>
                    </div>
                    <form class="p-6" @submit.prevent="handleSubmit">
                        <div class="space-y-5">
                            <div>
                                <label for="name" class="block text-gray-700 font-medium mb-2">
                                    姓名
                                    <span class="text-red-500">*</span>
                                </label>
                                <input id="name" name="name" type="text" v-model="formData.name"
                                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="請輸入姓名" required />
                            </div>
                            <div>
                                <label for="email" class="block text-gray-700 font-medium mb-2">
                                    電子郵件
                                    <span class="text-red-500">*</span>
                                </label>
                                <input id="email" name="email" type="email" v-model="formData.email"
                                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="email@example.com" required />
                            </div>
                            <div>
                                <label for="role" class="block text-gray-700 font-medium mb-2">
                                    角色
                                    <span class="text-red-500">*</span>
                                </label>
                                <select id="role" name="role" v-model="formData.roleLevel"
                                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    required>
                                    <option :value="RoleLevel.ADMIN">管理員</option>
                                    <option :value="RoleLevel.EDITOR">編輯</option>
                                    <option :value="RoleLevel.USER">用戶</option>
                                    <option :value="RoleLevel.CLIENT">客戶</option>
                                </select>
                            </div>

                            <div>
                                <label for="status" class="block text-gray-700 font-medium mb-2">
                                    狀態
                                    <span class="text-red-500">*</span>
                                </label>
                                <select id="status" name="status" v-model="formData.status"
                                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    required>
                                    <option :value="AccountStatus.ON">啟用</option>
                                    <option :value="AccountStatus.OFF">停用</option>
                                </select>
                            </div>
                        </div>
                        <div class="flex gap-3 mt-8">
                            <button type="button" @click="close"
                                class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition duration-200">
                                取消
                            </button>
                            <button type="submit"
                                class="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 shadow-sm hover:shadow">
                                {{ isEditing ? '儲存變更' : '新增帳號' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped></style>