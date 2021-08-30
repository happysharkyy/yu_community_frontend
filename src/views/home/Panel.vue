<template>
  <div class="columns is-hidden-mobile is-multiline has-text-centered">
    <div class="column is-one-quarter">
      <router-link :to="{path:'/hot'}">
        <section class="box my-card hero is-success">
          <i class="fa fa-fire fa-4x"></i>
          <p class="subtitle mt-5">热门</p>
        </section>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{path:'/recommend'}">
        <section class="box my-card hero is-warning">
          <i class="fa  fa-superpowers fa-4x"></i>
          <p class="subtitle mt-5">推荐</p>
        </section>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{path:'/activity'}">
        <section class="box my-card hero is-info">
          <i class="el-icon-help fa-4x"></i>
          <p class="subtitle mt-5">活动</p>
        </section>
      </router-link>
    </div>

    <div class="column is-one-quarter">
      <router-link :to="{ path: '/columns' }">
        <section class="box my-card hero is-danger">
          <i class="fa fa-cube fa-4x"></i>
          <p class="subtitle mt-5">合辑</p>
        </section>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel'
}
</script>

<style scoped>
</style>
