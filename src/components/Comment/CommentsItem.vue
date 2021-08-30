<template>
  <article class="media">
    <figure class="media-left image">
      <img style="width: 46px; height: 46px" fit="fill" :src="url+comment.avatar">
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.username }}</strong>
          <small class="ml-2">{{ comment.createTime | date }}</small>
          <br />
          {{ comment.content }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>

export default {
  name: 'LvCommentsItem',
  data(){
    return{
      url:'',
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  created(){
        this.url = process.env.VUE_APP_SERVER_URL
  }
}
</script>


