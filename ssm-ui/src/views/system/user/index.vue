<template>
    <iframe-temp :urlPath="urlPath"></iframe-temp>
</template>

<script>
import { mapGetters } from 'vuex'
import IframeTemp from '@/components/IframeTemp/IframeTemp.vue'

export default {
  name: 'dashboard',
  components: {IframeTemp},
  data() {
    return {
      urlPath: '/module/index.html#/system/dict'
    }
  },
  methods: {

  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
