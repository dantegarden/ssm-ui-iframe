<template>
  <div class="vue-iframe">
    <iframe ref="iframeEl" marginheight="0" marginwidth="0" class="ifa" frameborder="0" scrolling="no"
            @load="load()"
            :src="urlPath" :height="iframeHeight+'px'"></iframe>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: "IframeTemp",
    props: {
      urlPath: {
        type: String,
        default: function(){
          return ''
        }
      }
    },
    components: {
    },
    data(){
      return {
        iframeEl: null,
        iframeHeight: 0
      }
    },
    methods:{
      initIframe() {
        this.iframeEl = this.$refs.iframeEl;
        this.iframeEl.setAttribute('crossorigin', 'anonymous');
        this.iframeEl.setAttribute('target', '_parent');

        window.addEventListener("message", (e)=>{
          console.log('iframe height changed ');
          console.log(e)
          this.changeFrameHeight(e.data)
        });
      },
      changeFrameHeight(height){
          console.log('Func changeFrame be called')
          if(typeof height === "number"){
            console.log('use ' + height)
            this.iframeHeight = Math.max(document.querySelector('#app').offsetHeight, height)
          }else{
            let iframeEl = document.getElementsByTagName("iframe")[0] //this.$refs.iframeEl;
            var iframeDoc = iframeEl.contentWindow.document;
            var bHeight = 0;
            var dHeight = 0;
            if(iframeDoc.body){
              bHeight = iframeDoc.body.scrollHeight
            }
            if(iframeDoc.documentElement){
              dHeight = iframeDoc.documentElement.scrollHeight;
            }
            this.iframeHeight = Math.max(bHeight, dHeight);
            console.log('use ' + bHeight + ' ' + dHeight)
          }
      },
      load(){
        // var appContainer = document.getElementsByTagName("iframe")[0].contentDocument.querySelector('.app-container')
        // if(appContainer){
        //   appContainer.className = ''
        // }
        this.changeFrameHeight()
      }
    },
    watch: {
      urlPath(_from, _to) {
        console.log(_from)
        console.log(_to)
        this.initIframe(this);
      }
    },
    mounted(){
      this.initIframe();
    }
  }
</script>

<style lang="scss" scoped>
  .ifa{
    width:100%;
  }

</style>
