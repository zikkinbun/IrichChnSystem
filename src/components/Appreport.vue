<style scoped>
</style>

<template>
<div class="page">
	<h1 class="pageTitle">Apps Report<Tag style="float: right" color="blue">Total Revenue : <strong>$ {{totalRevenue}}</strong></Tag></h1>
	<p class="totalTips">Total of <strong>{{total}}</strong> data were found</p>
	<Table stripe :columns="columns" :data="data"></Table>
</div>
</template>

<script>
export default {
	data() {
		return {
			columns: [{
					title: 'App ID',
					key: 'app_id'
				},
				{
					title: 'App Name',
					key: 'app_name'
				},
				{
					title: 'Install',
					key: 'post_install'
				},
				{
					title: 'Click',
					key: 'valid_click'
				},
				{
					title: 'Revenue($)',
					key: 'income',
					sortable: true
				}
			],
			data: [],
			total: 0,
			totalRevenue: 0
		}
	},
	computed: {},
	methods: {
		loadData() {
			this.$Loading.start();
			let self = this;
			this.$http.post("/Interface/getChnAppIncome", {}).then(function(res) {
				var data = res.data;
				switch (data.retcode) {
					case 0:
						self.data = data.retdata.detail;
						self.total = data.retdata.detail.length;
						let totalRevenue = 0;
						self.data.forEach((item)=>{
							totalRevenue += item.income;
						});
						this.totalRevenue = totalRevenue;
						this.$Loading.finish();
						break;
					default:
						self.$Message.error(data.retmsg);
						this.$Loading.error();
				}
			});
		}
	},
	mounted() {
		this.loadData();
	}
};
</script>
