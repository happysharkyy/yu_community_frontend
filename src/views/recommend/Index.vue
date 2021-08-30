<!-- 知识贴 -->
<template>
        <div class="columns">
            <div class="column is-three-quarters">
                <!-- 文章列表 -->
                <Reco />
            </div>
            <div class="column">
                <PromotionCard />
            </div>
        </div>
</template>

<script>
import PromotionCard from '@/views/card/Promotion'
import CardBar from "@/views/card/CardBar"
import Reco from '@/views/recommend/Reco'
export default {
    name: 'RecoList',
    components: {Reco,PromotionCard,CardBar},
}

</script>
<style lang='scss' scoped>
</style>