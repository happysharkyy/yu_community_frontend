<template>
  <section>
    <div class="columns">
      <div class="column is-full">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span><i class="fa fa fa-book"> 主题 / 更新主题</i></span>
          </div>
          <div>
            <el-form :model="topic" ref="topic" class="demo-topic">
              <el-form-item prop="title">
                <el-input
                  v-model="topic.title"
                  placeholder="输入新的主题名称"
                ></el-input>
              </el-form-item>

              <!--Markdown-->
              <div id="vditor"></div>

              <b-taginput
                v-model="tags"
                class="my-3"
                maxlength="15"
                maxtags="3"
                ellipsis
                placeholder="请输入主题标签，限制为 15 个字符和 3 个标签"
              />
              <el-select v-model="series" placeholder="请选择合辑">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>

              <el-form-item class="mt-3">
                <el-button type="primary" @click="handleUpdate()"
                  >更新
                </el-button>
                <el-button @click="resetForm('topic')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </section>
</template>

<script>
import { getTopic, update } from "@/api/post";
import { save } from "@/api/tag";
import { findSeries,saveSeriesPost,findSeriesByPost} from '@/api/series'
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
  name: "TopicEdit",
  components: {},
  data() {
    return {
      url:'',
      series:'',
      options:[],
      topic: {},
      tags: [],
    };
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.fetchTopic();
    this.findSeriesList();
  },
  methods: {
    findSeriesList(){
      findSeries().then(res=>{
        this.options = res.data
      })
      findSeriesByPost(this.$route.params.id).then(res=>{
        console.log(res)
        this.series = res.data
      })
    },
    renderMarkdown(md) {
      let _this = this
    _this.findSeriesList()
    _this.contentEditor = new Vditor('vditor', {
      height: 500,
      placeholder: '此处为话题内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      editorName:'contentEditor',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      after: () => {
        this.contentEditor.setValue(md);
      },
      upload:{
          accept:'image/*',
          url:this.url+'/upload/fileupload',
          filename(name) {
            return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g)
          },
          linkToImgCallback() {
            console.log("api处理")
          },
          success(editor, msg) {
            console.log(msg);
            _this.contentEditor.insertValue('[![]('+process.env.VUE_APP_SERVER_URL+msg+')]('+process.env.VUE_APP_SERVER_URL+msg+')');
            return true
          },
          error(msg) {
            console.log(msg+"上传失败了")
          }
       },
      mode: 'sv'
    })


      
    },
    fetchTopic() {
      getTopic(this.$route.params.id).then((value) => {
        this.topic = value.data.topic;
        this.tags = value.data.tags.map(tag => tag.name);
        this.renderMarkdown(this.topic.content);
      });
    },
    handleUpdate: function () {
      console.log(this.contentEditor.getValue())
      this.topic.content = this.contentEditor.getValue();
      update(this.topic).then((response) => {
        const { data } = response;
        console.log(data);
        saveSeriesPost(this.topic.id,this.series);
        save(this.tags,this.topic.id);
          this.$router.push({
            name: "post-detail",
            params: { id: data.id },
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.contentEditor.setValue("");
      this.tags = "";
    },
  },
};
</script>

<style>
.vditor-reset pre > code {
  font-size: 100%;
}
</style>
