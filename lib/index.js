"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const irequest_1 = require("irequest");
const querystring = require("querystring");
const xml2js = require("xml2js");
const apiHost = `http://www.bestedm.org/mm-ms/apinew/`;
class BestEdm extends irequest_1.RequestBase {
    constructor(options) {
        super(options.debug);
        this.options = options;
    }
    /**
     * 查询用户信息
     */
    customerInfo() {
        return this.request(`${apiHost}account.php?do=customer-info`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:170 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 查询群发服务信息
     */
    serviceInfo() {
        return this.request(`${apiHost}account.php?do=service-info`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:197 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 取得指定的群发任务或者指定发送日期的群发任务列表
     * @param params
     */
    listTask(params) {
        return this.request(`${apiHost}task.php?do=list-task&${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false, trim: true }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:233 parseString`, err);
                    return;
                }
                result = reply;
            });
            if (typeof result.task_list === 'string') {
                result.task_list = null;
            }
            return result;
        });
    }
    /**
     * 获取指定群发任务的跟踪统计概览
     * @param date 所要获取的统计情况的日期
     */
    statistic(date) {
        return this.request(`${apiHost}statistic.php?date=${date}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:265 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 导出发送失败地址
     */
    failexport(params) {
        return this.request(`${apiHost}failexport.php?out_type=json&${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        });
    }
    /**
     * 导出发送失败地址
     */
    failexportall(params) {
        return this.request(`${apiHost}failexportall.php?out_type=json&${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        });
    }
    /**
     * 获取用户群发任务列表
     */
    taskList() {
        return this.request(`${apiHost}task.php?do=task-list`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false, trim: true }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:338 parseString`, err);
                    return;
                }
                result = reply;
                if (!result.task_list || !result.task_list.task) {
                    return null;
                }
                if (!(result.task_list.task instanceof Array)) {
                    result.task_list.task = [result.task_list.task];
                }
                result.task_list.task.forEach(task => {
                    if (!task.listes) {
                        task.listes = null;
                    }
                    else if (!(task.listes.item instanceof Array)) {
                        task.listes.item = [task.listes.item];
                    }
                    if (!task.templates) {
                        task.templates = null;
                    }
                    else if (!(task.templates.template instanceof Array)) {
                        task.templates.template = [task.templates.template];
                    }
                });
            });
            return result;
        });
    }
}
exports.BestEdm = BestEdm;
