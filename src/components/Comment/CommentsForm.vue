<template>
  <article class="media">
    <div class="media-content">
      <el-row >
      <el-col align="center" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <span class="val"  @click="ShowSubForward">转发✔</span>
      </el-col>
      
      <el-col align="center" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <span class="val" @click="ShowSubComment">评论💬</span>
      </el-col>
      <el-col align="center"  :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
        <span class="val" id="yesStar"  style="display:block"  @click="change()">点赞🤍{{starNum}}</span>
        <span class="val" id="noStar" style="display:none"  @click="change()">点赞💛{{starNum}}</span>
      </el-col>
      </el-row>
      <form @submit.prevent="onSubmitForward">
        <hr id="ForwardHr" style="display:none" />
        <b-field id="Forward" style="display:none">
          
          <b-input
            v-model.lazy="ForwardText"
            type="textarea"
            maxlength="400"
            placeholder="Add a comment..."
            :disabled="isLoading"
          ></b-input>
        </b-field>
        <nav class="level">
          <div class="level-left">
            <b-button
              id="SubForward"
              style="display:none"
              type="is-primary"
              native-type="submit"
              class="level-item"
              :disabled="isLoading"
            >
              转发
            </b-button>
          </div>
        </nav>
      </form>
      <form @submit.prevent="onSubmit">
        <hr id="commentHr" style="display:none" />
        <b-field id="comment" style="display:none">
          <b-input
            v-model.lazy="commentText"
            type="textarea"
            maxlength="400"
            placeholder="Add a comment..."
            :disabled="isLoading"
          ></b-input>
        </b-field>
        <nav class="level">
          <div class="level-left">
            <b-button
              id="Subcomment"
              style="display:none"
              type="is-primary"
              native-type="submit"
              class="level-item"
              :disabled="isLoading"
            >
              评论
            </b-button>
          </div>
        </nav>
      </form>
    </div>
  </article>
</template>

<script>
import { pushComment } from '@/api/comment'
import { fetchStarByTopicId,saveStar,fetchForwardByTopicId,saveForward} from '@/api/comment'
import { mapGetters } from 'vuex'
export default {
  name: 'LvCommentsForm',
  data() {
    return {
      star:[],
      
      forwardNum:0,
      starNum:0,
      commentText: '',
      ForwardText: '',
      isLoading: false
    }
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  async mounted() {
    await this.fetchStars(this.slug)
    
    await this.fetchForwards(this.slug)
  },
  methods: {
    async fetchForwards(topic_id){
      fetchForwardByTopicId(topic_id,'blog').then(response => {
        const { data } = response
        this.forwardNum = data.length
        console.log(this.starNum)
      })
    },
    // 初始化
    async fetchStars(topic_id) {
      fetchStarByTopicId(topic_id,'blog').then(response => {
        const { data } = response
        this.star = response.data
        this.starNum = data.length
        console.log(this.starNum)
        for(let i=0;i<this.starNum;i++){
          console.log(this.user.id+'--')
          console.log(response)
          if(this.user.id==this.star[i].userId){
              const yesStar = document.querySelector('#yesStar')
              const noStar = document.querySelector('#noStar')
              yesStar.style.display = 'none'
              noStar.style.display = 'block'
          }
        }
       
      })
    },
    async change(){
        const yesStar = document.querySelector('#yesStar')
        const noStar = document.querySelector('#noStar')
        let postData = {}
        if( yesStar.style.display === 'block' ||  noStar.style.display === 'none'){
          this.$message({
            message: '点赞成功',
            type: 'success'
          });
          postData['objId'] = this.slug
          postData['userId'] = this.user.id
          postData['starStatus'] = 0
          postData['type'] = 'blog'
          await saveStar(postData)
          this.starNum++
          yesStar.style.display = 'none'
          noStar.style.display = 'block'

        }else{
          this.$message({
            message: '取消点赞',
            type: 'warning'
          });
          postData['objId'] = this.slug
          postData['userId'] = this.user.id
          postData['starStatus'] = 1
          postData['type'] = 'blog'
          await saveStar(postData)
          this.starNum--
          yesStar.style.display = 'block'
          noStar.style.display = 'none'
        }     
    },
    async ShowSubComment(){
        const comment = document.querySelector('#comment')
        const commentHr = document.querySelector('#commentHr')
        const Subcomment = document.querySelector('#Subcomment')
        if( comment.style.display == 'block'){
          comment.style.display = 'none'
          commentHr.style.display = 'none'
          Subcomment.style.display = 'none'
        }else{
          comment.style.display = 'block'
          commentHr.style.display = 'block'
          Subcomment.style.display = 'block'
        }     
    },
    async ShowSubForward(){
        const Forward = document.querySelector('#Forward')
        const ForwardHr = document.querySelector('#ForwardHr')
        const SubForward = document.querySelector('#SubForward')
        if( Forward.style.display == 'block'){
          Forward.style.display = 'none'
          ForwardHr.style.display = 'none'
          SubForward.style.display = 'none'
        }else{

          Forward.style.display = 'block'
          ForwardHr.style.display = 'block'
          SubForward.style.display = 'block'
        }     

    },
    async onSubmit() {
      this.isLoading = true
      try {
        let postData = {}
        console.log(this.commentText)
        postData['content'] = this.commentText
        postData['type'] = 'blog'
        postData['topic_id'] = this.slug
        await pushComment(postData)
        this.$emit('loadComments', this.slug)
        this.$message.success('评论成功')
        this.commentText=''
      } catch (e) {
        this.$buefy.toast.open({
          message: `Cannot comment this story. ${e}`,
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
      }
    },
    async onSubmitForward() {
      this.isLoading = true
      try {
        let postData = {}
        console.log(this.commentText)
        postData['objId'] = this.slug
        postData['userId'] = this.user.id
        postData['forwardStatus'] = 0
        postData['type'] = 'blog'
        postData['content'] = this.ForwardText 
        await saveForward(postData)
        this.$message.success('转发成功')
        this.forwardNum++
      } catch (e) {
        this.$buefy.toast.open({
          message: `Cannot comment this story. ${e}`,
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
