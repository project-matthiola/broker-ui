<template>
  <el-container>
    <el-header>
      <el-cascader
        placeholder="Futures ID"
        expand-trigger="hover"
        :options="futuresOptions"
        v-model="selectedFutures"
        clearable>
      </el-cascader>
      <el-select
        v-model="selectedFirm"
        placeholder="Firm Name"
        clearable
        style="margin-left: 20px;">
        <el-option
          v-for="firm in firmOptions"
          :key="firm.firm_id"
          :label="firm.firm_name"
          :value="firm.firm_id">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px;"
        icon="el-icon-search"
        @click="filter"
        circle/>
    </el-header>
    <el-main>
        <el-table
          :data="tradeData"
          style="width: 100%"
          size="small"
          max-height="500"
          v-loading="loading">
          <el-table-column
            prop="trade_id"
            label="Trade ID"
            width="150"
            show-overflow-tooltip
            fixed>
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="Quantity"
            width="100">
          </el-table-column>
          <el-table-column
            prop="price"
            label="Price"
            width="100">
          </el-table-column>
          <el-table-column
            prop="futures_id"
            label="Futures ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="trade_time"
            label="Trade Time"
            width="150">
          </el-table-column>
          <el-table-column label="Initiator">
            <el-table-column
              prop="initiator.trader"
              label="Trader"
              width="120">
            </el-table-column>
            <el-table-column
              prop="initiator.side"
              label="Side"
              width="120">
            </el-table-column>
            <el-table-column
              prop="initiator.firm"
              label="Firm"
              width="120">
            </el-table-column>
          </el-table-column>
          <el-table-column label="Completion">
            <el-table-column
              prop="completion.trader"
              label="Trader"
              width="120">
            </el-table-column>
            <el-table-column
              prop="completion.side"
              label="Side"
              width="120">
            </el-table-column>
            <el-table-column
              prop="completion.firm"
              label="Firm"
              width="120">
            </el-table-column>
          </el-table-column>
        </el-table>
    </el-main>
    <el-footer>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
import api from '@/api'

export default {
  name: 'Trade',
  data () {
    return {
      loading: false,
      tradeData: [],
      total: 0,
      page: 1,
      firmOptions: [],
      selectedFirm: null,
      futuresOptions: [],
      selectedFutures: []
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
    api.TradeList(params)
      .then(response => {
        this.tradeData = response.data.data
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
      api.TradeList(params)
        .then(response => {
          this.tradeData = response.data.data
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
        'firm_id': this.selectedFirm === '' ? null : this.selectedFirm
      }
      api.TradeList(params)
        .then(response => {
          this.tradeData = response.data.data
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
