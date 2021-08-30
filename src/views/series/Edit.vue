<template>
  <section>
    <div class="columns">
      <div class="column is-full">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span><i class="fa fa fa-book"> 合辑 / 更新合辑</i></span>
          </div>
          <div>
            <el-form :model="topic" ref="topic" class="demo-topic">
              <el-form-item prop="title">
                <el-input
                  v-model="topic.title"
                  placeholder="输入新的合辑名称"
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
                placeholder="请输入合辑标签，限制为 15 个字符和 3 个标签"
              />
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                accept="image/png,image/gif,image/jpg,image/jpeg"
                :before-upload="handleBeforeUpload">
                <img v-if="topic.img" :src="url+topic.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

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
import { update, viewSeries } from '@/api/series'
import { save } from "@/api/tag";
import {upload} from '@/api/upload'
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
  name: "TopicEdit",
  components: {},
  data() {
    return {
      url:'',
      topic: {},
      tags: [],
    };
  },
  created() {
    this.url = process.env.VUE_APP_SERVER_URL
    this.fetchTopic();
  },
  methods: {
     handleBeforeUpload (file) {
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if (size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
      let fd = new FormData();//通过form数据格式来传
      fd.append("picFile", file); //传文件
      upload(fd).then(res => {
          console.log(res)
          this.ruleForm.img = res.data
              this.$notify.success({
              title: 'Info',
              message: '封面上传成功!',
              duration: 3000
          });
      })
    },
    renderMarkdown(md) {
      this.contentEditor = new Vditor("vditor", {
        height: 460,
        placeholder: "输入要更新的内容",
        preview: {
          hljs: { style: "monokai" },
        },
        mode: "wysiwyg",
        after: () => {
          this.contentEditor.setValue(md);
        },
      });
    },
    fetchTopic() {
      viewSeries(this.$route.params.id).then((value) => {
        console.log(value)
        this.topic = value.data.topic;
        console.log( this.topic)
        this.tags = value.data.tags.map(tag => tag.name);
        this.renderMarkdown(this.topic.content);
      });
    },
    handleUpdate: function () {
      console.log(this.tags)
      this.topic.content = this.contentEditor.getValue();
      update(this.topic).then((response) => {
        const { data } = response;
        console.log(data);
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

 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
