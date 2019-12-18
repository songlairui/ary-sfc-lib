<script>
import { ArySample } from '@/entry';
export default {
    name:  'AryLibDev', // vue library dev component
    components: {
        ArySample,
    },
}
</script>

<template>
    <div class="ary-lib-dev">
        <ary-sample></ary-sample>
    </div>
</template>

<style scoped>
    .ary-lib-dev {
        display: block;
        width: 400px;
        margin: 25px auto;
    }
</style>
