<template>
  <el-container>
    <el-header>
      <el-cascader placeholder="Futures ID" expand-trigger="hover" :options="futuresOptions" v-model="selectedFutures" clearable/>
      <el-select v-model="selectedFirm" placeholder="Firm Name" style="margin-left: 20px;" clearable>
        <el-option v-for="firm in firmOptions" :key="firm.firm_id" :label="firm.firm_name" :value="firm.firm_id"/>
      </el-select>
      <el-select v-model="selectedStatus" placeholder="Status" style="margin-left: 20px;" clearable>
        <el-option v-for="status in statusOptions" :key="status.value" :label="status.label" :value="status.value"/>
      </el-select>
      <el-button style="margin-left: 20px;" icon="el-icon-search" @click="filter" circle/>
    </el-header>
    <el-main>
        <el-table :data="orderData" style="width: 100%" size="small" max-height="500" v-loading="loading">
          <el-table-column prop="order_id" label="Order ID" width="150" show-overflow-tooltip fixed/>
          <el-table-column prop="order_type" label="Order Type"/>
          <el-table-column prop="side" label="Side"/>
          <el-table-column prop="futures_id" label="Futures ID"/>
          <el-table-column prop="firm" label="Firm" width="100"/>
          <el-table-column prop="trader_name" label="Trader Name"/>
          <el-table-column prop="quantity" label="Quantity"/>
          <el-table-column prop="open_quantity" label="Open Quantity"/>
          <el-table-column prop="price" label="Price"/>
          <el-table-column prop="stop_price" label="Stop Price"/>
          <el-table-column prop="status" label="Status"/>
          <el-table-column prop="created_at" label="Created At" width="150" sortable/>
          <el-table-column prop="updated_at" label="Updated At" width="150" sortable/>
        </el-table>
    </el-main>
    <el-footer>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="10" layout="total, prev, pager, next" :total="total"/>
    </el-footer>
  </el-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'Order',
  data () {
    return {
      loading: false,
      orderData: [],
      total: 0,
      page: 1,
      firmOptions: [],
      selectedFirm: null,
      futuresOptions: [],
      selectedFutures: [],
      statusOptions: [{
        value: '0',
        label: 'NEW'
      }, {
        value: '1',
        label: 'PARTIALLY_FILLED'
      }, {
        value: '2',
        label: 'FILLED'
      }, {
        value: '4',
        label: 'CANCELED'
      }, {
        value: '8',
        label: 'REJECTED'
      }, {
        value: 'A',
        label: 'PENDING_NEW'
      }],
      selectedStatus: null
    }
  },
  mounted () {
    this.loading = true

    api.FuturesList()
      .then(response => {
        this.futuresOptions = response.data.data
      })
      .catch(error => {
        console.log(error)
      })

    api.FirmList()
      .then(response => {
        this.firmOptions = response.data.data
      })
      .catch(error => {
        console.log(error)
      })

    let params = {
      'page': this.page
    }
    api.OrderList(params)
      .then(response => {
        this.orderData = response.data.data
        this.total = response.data.total
      })
      .catch(error => {
        console.log(error)
      })
    this.loading = false
  },
  methods: {
    handleCurrentChange (val) {
      this.loading = true
      let params = {
        'page': val
      }
      api.OrderList(params)
        .then(response => {
          this.orderData = response.data.data
          this.total = response.data.total
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    filter () {
      let params = {
        'page': 1,
        'futures_id': this.selectedFutures[1],
        'firm_id': this.selectedFirm === '' ? null : this.selectedFirm,
        'status': this.selectedStatus === '' ? null : this.selectedStatus
      }
      api.OrderList(params)
        .then(response => {
          this.orderData = response.data.data
          this.total = response.data.total
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
