<script setup lang="ts">
import { ref, onMounted } from "vue";

import api from "@/helper/axios.ts";

const healthStatus = ref<string | null>(null);

const checkHealth = async () => {
    try {
        const response = await api.get(`/health`);
        if (response.status === 200) {
            healthStatus.value = "healthy";
        } else {
            healthStatus.value = "unhealthy";
        }
    } catch (_) {
        healthStatus.value = "unhealthy";
    }
};

onMounted(() => {
    checkHealth();
});
</script>

<template>
    <div
        v-if="healthStatus"
        :class="healthStatus === 'healthy' ? 'healthy' : 'unhealthy'"
        class="status-message"
    >
        <p>
            {{
                healthStatus === "healthy"
                    ? "Healthy server :)"
                    : "Non healthy server :("
            }}
        </p>
    </div>
</template>

<style scoped>
.status-message {
    padding: 10px;
    color: white;
    text-align: center;
    border-radius: 5px;
}

.healthy {
    background-color: green;
}

.unhealthy {
    background-color: red;
}
</style>
