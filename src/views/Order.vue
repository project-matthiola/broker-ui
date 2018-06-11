<template>
  <el-table
    :data="orderData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column label="配送信息">
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column label="地址">
        <el-table-column
          prop="province"
          label="省份"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120">
        </el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      orderData: [
        {
          'trade_id': 'E271129A-D050-4D05-AFEA-5FB630CDF895',
          'broker': 'Morgan Stanley',
          'quantity': '50',
          'price': '30.12',
          'futures_id': 'GC_SEP18',
          'initiator': {
            'firm': 'A',
            'side': 'buy',
            'trader': 'John'
          },
          'completion': {
            'firm': 'B',
            'side': 'sell',
            'trader': 'Doe'
          },
          'trade_time': '2018-06-08 20:52:23 +0800 CST'
        }
      ],
      total: 0,
      page: 1,
      loading: false
    }
  },
}
</script>
