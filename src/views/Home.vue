<template>
  <div>
    <div class="box">🔔 {{ billboard.content }}</div>
     <!--面板-->
    <Panel />
    <div class="columns">
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from '@/views/home/Panel'
import { getBillboard } from "@/api/billboard";
import CardBar from "@/views/card/CardBar"
import PostList from '@/views/post/Index'


export default {
  name: "Home",
  components: {CardBar, TopicList: PostList,Panel},
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      });
    },
  },
};
</script>
