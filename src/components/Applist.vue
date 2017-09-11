<style>
.ctrlBox .item {
	display: inline-block;
	width: 400px;
}

.pageCount {
	margin-top: 20px;
	text-align: right;
}

.token .ivu-input[disabled] {
	color: #333;
	background-color: #d8dfe1;
}
</style>

<template>
<div class="page">
	<h1 class="pageTitle">APP LIST</h1>
	<div class="ctrlBox">
		<Button type="primary" icon="plus" size="large" @click="modalShow">CREATE AN APP</Button>
	</div>
	<p class="totalTips">Total of <strong>{{total}}</strong> data were found</p>
	<Table stripe border :columns="columns" :data="data"></Table>
	<div class="pageCount">
		<Page :total="total" :current="page" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,40,100]" show-sizer></Page>
	</div>
	<Modal v-model="modal_1" :loading="modalLoading_1" title="Create An App" width="50" ok-text="Submit" @on-ok="submit" @on-cancel="cancel('createAppForm')">
		<Form ref="createAppForm" :model="formItem_1" :rules="ruleValidate_1" :label-width="100">
			<Form-item label="Platform" prop="platform">
				<Radio-group v-model="formItem_1.platform">
					<Radio label="Android">Android</Radio>
					<Radio label="IOS">IOS</Radio>
				</Radio-group>
			</Form-item>
			<Form-item label="Category" prop="category">
				<Select v-model="formItem_1.category" placeholder="select one category">
                <Option value="[Game]Role Playing">[Game]Role Playing</Option>
                <Option value="[Game]Action">[Game]Action</Option>
                <Option value="[Game]Sports">[Game]Sports</Option>
				<Option value="[Game]Casino">[Game]Casino</Option>
				<Option value="[Game]Strategy">[Game]Strategy</Option>
				<Option value="[Game]Adventure Simulation">[Game]Adventure Simulation</Option>
				<Option value="[Game]Casual">[Game]Casual</Option>
				<Option value="[Game]Puzzle">[Game]Puzzle</Option>
				<Option value="[Application]Multimedia">[Application]Multimedia</Option>
				<Option value="[Application]System">[Application]System</Option>
				<Option value="[Application]Utility">[Application]Utility</Option>
				<Option value="[Application]Communication">[Application]Communication</Option>
				<Option value="[Application]Security">[Application]Security</Option>
				<Option value="[Application]Entertainment">[Application]Entertainment</Option>
				<Option value="[Application]Others">[Application]Others</Option>
            </Select>
			</Form-item>
			<Form-item label="URL Address" prop="url">
				<Input v-model="formItem_1.url"></Input>
			</Form-item>
			<Form-item label="App Name" prop="app_name">
				<Input v-model="formItem_1.app_name"></Input>
			</Form-item>
			<Form-item label="Package Name" prop="pkg_name">
				<Input v-model="formItem_1.pkg_name"></Input>
			</Form-item>
			<Form-item label="Description" prop="description">
				<Input v-model="formItem_1.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
			</Form-item>
		</Form>
	</Modal>
	<Modal v-model="modal_2" :loading="modalLoading_2" title="Server to server callbacks" width="40" :ok-text="formItem_2.isSet ? 'Ok' : 'Save'" @on-ok="save" @on-cancel="cancel('setCallbackForm')">
		<Form ref="setCallbackForm" :model="formItem_2" :rules="ruleValidate_2" label-position="top">
			<Form-item label="Callback URL" prop="callback_url">
				<Input v-model="formItem_2.callback_url" :disabled="formItem_2.isSet"></Input>
			</Form-item>
			<Form-item class="token" label="Callback Token" prop="callback_token">
				<Input v-model="formItem_2.callback_token" disabled></Input>
			</Form-item>
		</Form>
	</Modal>
</div>
</template>

<script>
export default {
	data() {
		return {
			page: 1,
			page_size: 10,
			total: 0,
			columns: [{
				title: 'Platform',
				key: 'platform',
				render: (h, params) => {
					let iconType = '';
					switch (params.row.platform.toLocaleLowerCase()) {
						case 'android':
							iconType = 'social-android';
							break;
						case 'ios':
							iconType = 'social-apple';
							break;
					}
					return h('div', [
						h('Icon', {
							props: {
								type: iconType,
								size: 16
							}
						}),
						h('strong', ' ' + params.row.platform)
					]);
				},
				sortable: true
			}, {
				title: 'App Name',
				key: 'app_name'
			}, {
				title: 'Package Name',
				key: 'pkg_name'
			}, {
				title: 'Status',
				key: 'status',
				render: (h, params) => {
					let text = '',
						type = '';
					switch (params.row.status) {
						case 1:
							text = 'Approved';
							type = 'green';
							break;
						case 0:
							text = 'Unfinished';
							type = 'yellow';
							break;
					}
					return h('div', [
						h('Tag', {
							props: {
								color: type
							}
						}, text)
					]);
				},
				sortable: true
			}, {
				title: 'Operation',
				key: 'action',
				render: (h, params) => {
					return h('div', [
						h('Button', {
							props: {
								type: 'primary',
								icon: 'ios-gear',
							},
							on: {
								click: () => {
									this.tokenModalShow(params.row.app_id);
									this.app_id = params.row.app_id;
								}
							}
						}, 'Settings')
					]);
				}
			}],
			data: [],
			modal_1: false,
			modalLoading_1: true,
			formItem_1: {
				app_name: '',
				pkg_name: '',
				category: '',
				platform: '',
				url: '',
				description: '',
			},
			ruleValidate_1: {
				app_name: [{
					required: true,
					message: 'This is madatory filed',
					trigger: 'blur'
				}],
				pkg_name: [{
					required: true,
					message: 'This is madatory filed',
					trigger: 'blur'
				}],
				category: [{
					required: true,
					message: 'This is madatory filed',
					trigger: 'blur'
				}],
				platform: [{
					required: true,
					message: 'This is madatory filed',
					trigger: 'blur'
				}],
				description: [{
					required: true,
					message: 'This is madatory filed',
					trigger: 'blur'
				}]
			},
			modal_2: false,
			modalLoading_2: true,
			app_id: null,
			formItem_2: {
				isSet: false,
				callback_url: '',
				callback_token: ''
			},
			ruleValidate_2: {
				callback_url: [{
					required: true,
					message: 'This is madatory filed',
					trigger: 'blur'
				}]
			}
		}
	},
	computed: {},
	methods: {
		loadData() {
			this.$Loading.start();
			let self = this,
				param = {
					page: self.page,
					page_size: self.page_size
				};
			if (this.ader_id !== null) {
				param.ader_id = this.ader_id;
			}
			this.$http.post("/Interface/getAppList", param).then(function(res) {
				var data = res.data;
				switch (data.retcode) {
					case 0:
						self.data = data.retdata;
						self.total = data.retdata.length;
						this.$Loading.finish();
						break;
					default:
						self.$Message.error(data.retmsg);
						this.$Loading.error();
				}
			});
		},
		search() {
			this.page = 1;
			this.page_size = 10;
			this.total = 0;
			this.loadData();
		},
		changePage(res) {
			this.page = res;
			this.loadData();
		},
		changePageSize(res) {
			this.page_size = res;
			this.loadData();
		},
		modalShow() {
			this['modal_1'] = true;
		},
		tokenModalShow(id) {
			let self = this;
			this.$http.post("/Interface/getTokenUrl", {
				app_id: id
			}).then(function(res) {
				var data = res.data;
				switch (data.retcode) {
					case 0:
						let retdata = data.retdata;
						if (retdata.callback_token == null && retdata.callback_url == null) {
							self.formItem_2.isSet = false;
						} else {
							self.formItem_2.callback_token = retdata.callback_token;
							self.formItem_2.callback_url = retdata.callback_url;
							self.formItem_2.isSet = true;
						}
						this['modal_2'] = true;
						break;
					default:
						self.$Message.error(data.retmsg);
						this.modalLoading_1 = false;
				}
			});
		},
		submit() {
			let self = this;
			this.$refs['createAppForm'].validate((valid) => {
				if (valid) {
					let urlArr = [];
					urlArr.push(self.formItem.url);

					let param = {
						app_name: self.formItem.app_name,
						pkg_name: self.formItem.pkg_name,
						category: self.formItem.category,
						platform: self.formItem.platform,
						url: urlArr,
						description: self.formItem.description
					};
					this.$http.post("/Interface/createApp", param).then(function(res) {
						var data = res.data;
						switch (data.retcode) {
							case 0:
								self.modal = false;
								self.$Message.success('The app(' + self.formItem.app_name + ') was created successfully!');
								setTimeout(function() {
									window.location.reload();
								}, 1500);
								break;
							default:
								self.$Message.error(data.retmsg);
								this.modalLoading_1 = false;
						}
					});
				} else {
					this.modalLoading_1 = false;
				}
			})
		},
		cancel(target) {
			this.$refs[target].resetFields();
		},
		save() {
			let self = this;
			if (this.formItem_2.isSet) {
				this.modalLoading_2 = false;
				this.modal_2 = false;
				this.$refs['setCallbackForm'].resetFields();
			} else {
				this.$refs['setCallbackForm'].validate((valid) => {
					if (valid) {
						this.$http.post("/Interface/setAppCallBack", {
							app_id: self.app_id,
							callback_url: self.formItem_2.callback_url
						}).then(function(res) {
							var data = res.data;
							switch (data.retcode) {
								case 0:
									console.log(data);
									break;
								default:
									self.$Message.error(data.retmsg);
									this.modalLoading_2 = false;
							}
						});
					} else {
						this.modalLoading_2 = false;
					}
				})
			}
		}
	},
	mounted() {
		this.loadData();
	}
};
</script>
