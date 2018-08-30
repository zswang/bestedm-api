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
                    console.log(`bestedm-api/src/index.ts:253 parseString`, err);
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
                    console.log(`bestedm-api/src/index.ts:280 parseString`, err);
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
                    console.log(`bestedm-api/src/index.ts:316 parseString`, err);
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
                    console.log(`bestedm-api/src/index.ts:348 parseString`, err);
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
     * 指定日期或者指定邮件批次发送统计表信息
     * @param params
     */
    stask(params) {
        return this.request(`${apiHost}stask.php?${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:427 parseString`, err);
                    return;
                }
                result = reply;
                if (result.data && !(result.data.task instanceof Array)) {
                    result.data.task = [result.data.task];
                }
            });
            return result;
        });
    }
    /**
     * 获取指定群发任务的跟踪统计概览
     * @param params
     */
    overview(params) {
        return this.request(`${apiHost}track.php?do=overview&${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:463 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 获取指定群发任务邮件打开统计详情
     * @param params
     */
    openDetail(params) {
        return this.request(`${apiHost}track.php?do=open-detail&${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:491 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 导出指定群发任务跟踪统计邮箱信息
     * @param params
     */
    trackexport(params) {
        return this.request(`${apiHost}trackexport.php?${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:524 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 指定批次的邮件各链接的点击统计
     * @param params
     */
    linkStat(params) {
        return this.request(`${apiHost}track.php?do=link-stat&${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:552 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 获取指定群发任务邮件打开统计详情
     * @param params
     */
    clickDetail(params) {
        return this.request(`${apiHost}track.php?do=click-detail&${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:580 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 取得联系人分类列表
     */
    maillistList() {
        return this.request(`${apiHost}mloperate.php?do=maillist-list`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:609 parseString`, err);
                    return;
                }
                result = reply;
                if (result.maillist && !(result.maillist.item instanceof Array)) {
                    result.maillist.item = [result.maillist];
                }
            });
            return result;
        });
    }
    /**
     * 取得联系人分类详情
     */
    maillistDetail(id) {
        return this.request(`${apiHost}mloperate.php?do=maillist-detail&${querystring.stringify({
            id: id,
        })}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:645 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 添加联系人分类
     */
    maillistAdd(maillist) {
        return this.request(`${apiHost}mloperate.php?do=maillist-add`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
            method: 'POST',
            form: maillist,
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:673 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 添加联系人分类
     */
    maillistEdit(id, maillist) {
        return this.request(`${apiHost}mloperate.php?do=maillist-edit&id=${encodeURIComponent(id)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
            method: 'POST',
            form: maillist,
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:701 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 删除联系人分类
     */
    maillistDel(id) {
        return this.request(`${apiHost}mloperate.php?do=maillist-del&${querystring.stringify({
            id,
        })}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:729 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 导出联系人分类地址
     */
    subscriptionExport(id) {
        return this.request(`${apiHost}mloperate.php?do=subscription-export&${querystring.stringify({
            id,
        })}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            return text
                .trim()
                .split(/\n/)
                .map(line => {
                const items = line.split(/\s+/);
                return {
                    email: items[0],
                    name: items[1],
                };
            });
        });
    }
    /**
     * 获取联系人分类下的地址信息或者单个地址信息
     */
    mlAddrList(params) {
        return this.request(`${apiHost}mloperate.php?do=ml-addr-list&${querystring.stringify(params)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:792 parseString`, err);
                    return;
                }
                result = reply;
                if (result.data && !(result.data.addr instanceof Array)) {
                    result.data.addr = [result.data.addr];
                }
            });
            return result;
        });
    }
    /**
     * 获取联系人分类下的地址信息或者单个地址信息
     */
    mlAddrAdd(addr) {
        return this.request(`${apiHost}mloperate.php?do=ml-addr-add&${querystring.stringify(addr)}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:821 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
        });
    }
    /**
     * 批量增加联系人分类下的地址
     */
    mlAddrAdds(params) {
        return this.request(`${apiHost}mloperate.php?do=ml-addr-add&${querystring.stringify({
            list_id: params.list_id,
            addr_type: params.addr_type,
            separate: params.separate,
        })}`, {
            headers: {
                Authorization: `Basic ${new Buffer(`${this.options.user}:${this.options.pass}`).toString('base64')}`,
            },
            method: 'POST',
            form: {
                ml_addr: params.ml_addr,
            },
        }, text => {
            let result = null;
            xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
                if (err) {
                    console.log(`bestedm-api/src/index.ts:860 parseString`, err);
                    return;
                }
                result = reply;
            });
            return result;
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
                    console.log(`bestedm-api/src/index.ts:889 parseString`, err);
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
