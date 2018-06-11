<template>
  <el-col>
    <el-menu
      default-active="0"
      class="el-menu-vertical"
      v-bind:router="true">
      <el-menu-item index="/order">
        <i class="el-icon-document"></i>
        <span slot="title">Order</span>
      </el-menu-item>
      <el-menu-item index="/trade">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">Trade</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: 'Aside'
}
</script>
