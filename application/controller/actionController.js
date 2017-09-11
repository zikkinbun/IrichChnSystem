const BaseController = require("../baseController.js"),
	config = require("../../global/config"),
	http = require("../../global/http"),
	mkdirp = require("mkdirp"),
	fs = require("fs"),
	path = require("path"),
	moment = require("moment"),
	ctrl = {};

// 登录
ctrl.login = function(req) {
	this.validEmpty([
		"username", "password"
	]);
	return this.request(req, "/v1/chn/login", {
		username: req.body.username,
		passwd: req.body.password
	}).then(result => {
		req.session.user = result;
		return {
			data: result,
			str: "登陆"
		};
	});
};

// 登出
ctrl.logout = function(req) {
	req.session.user = null;
	return {
		data: null,
		str: "登出"
	};
};

// 获取所有APP详情
ctrl.getAppList = function(req) {
	return this.request(req, "/v1/app/list", {
		chn_id: req.session.user.chn_id
	}).then(result => {
		return {
			data: result,
			str: "获取当前下游的所有APP详情"
		};
	});
};

// 提交创建 APP
ctrl.createApp = function(req) {
	this.validEmpty([
		"app_name", "pkg_name", "category", "platform", "url", "description"
	]);
	return this.request(req, "/v1/app/create", {
		chn_id: req.session.user.chn_id,
		app_name: req.body.app_name,
		pkg_name: req.body.pkg_name,
		category: req.body.category,
		platform: req.body.platform,
		url: req.body.url,
		description: req.body.description
	}).then(result => {
		return {
			data: result,
			str: "提交创建 APP"
		};
	});
};

// 下游录入callback_url后自动获取 token
ctrl.setAppCallBack = function(req) {
	this.validEmpty(["callback_url", "app_id"]);
	return this.request(req, "/v1/app/setting", {
		chn_id: req.session.user.chn_id,
		app_id: req.body.app_id,
		callback_url: req.body.callback_url
	}).then(result => {
		return {
			data: result,
			str: "获取token"
		};
	});
};

// 获取当前APP的Token和callback_url
ctrl.getTokenUrl = function(req) {
	this.validEmpty(["app_id"]);
	return this.request(req, "/v1/app/getTokenUrl", {
		chn_id: req.session.user.chn_id,
		app_id: req.body.app_id
	}).then(result => {
		return {
			data: result,
			str: "获取当前APP的Token和callback_url"
		};
	});
};

// 统计下游的收入
ctrl.getChnAppIncome = function(req) {
	return this.request(req, "/v1/count/getChnAppIncome", {
		chn_id: req.session.user.chn_id
	}).then(result => {
		return {
			data: result,
			str: "统计下游的收入"
		};
	});
};

module.exports = new BaseController(ctrl);
