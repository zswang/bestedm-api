import { RequestBase } from 'irequest'
import * as querystring from 'querystring'
import * as xml2js from 'xml2js'

const apiHost = `http://www.bestedm.org/mm-ms/apinew/`

export type FailType =
  | 'format_error'
  | 9
  | 'format_error'
  | 8
  | 'not_exist'
  | 1
  | 'over_quota'
  | 2
  | 'user_reject'
  | 3
  | 5
  | 'all'
  | -1

export interface IBaseEdmOptions {
  debug?: boolean
  user: string
  pass: string
}

export interface IResult {
  result: {
    status: string
    data: string
  }
}

export interface ICustomerInfo {
  customer: {
    id: string
    username: string
    company: string
    contact: string
    phone: string
    mobile: string
    email: string
    im: string
    address: string
  }
}

export interface IServiceInfo {
  service: {
    id: string
    /**
     * 用户群发服务状态，"enabled"为允许用户使用群发服务;"disabled"为禁止用户使用群发服务。
     */
    service_status: string
    /**
     * 群发服务类型，"all"为按群发总量进行发送，"day"为按每日发送量进行发送。
     */
    service_type: string
    /**
     * 群发发送方式，"remote"为客户使用自已的服务器与平台对接发送，"local"为使用平台服务器来进行发送。
     */
    send_type: string
    qty_available: string
    qty_buytotal: string
  }
}

export interface ITask {
  id: string
  sn: string
  acct_type: string
  acct_domain: string
  acct_address: string
  sender: string
  replyto: string
  sender_name: string
  templates: {
    template: {
      tpl_id: string
      tpl_name: string
    }[]
  }
  listes: {
    item: {
      list_id: string
      list_name: string
    }[]
  }
  list_id: string
  list_name: string
  send_qty: string
  send_qty_remak: string
  send_time: string
  time_start: string
  time_end: string
  send_count: string
  error_count: string
  send_status: string
  track_status: string
}

export interface ITaskInfo {
  task_id: string
  task_date: string
  task_ident: string
  totalsum: string
  total: string
  invalid: string
  failed: string
  success: string
  email_not_exist: string
  actual: string
  over_quota: string
  user_reject: string
  rubbish: string
}

export interface ITaskDetail {
  id: string
  sn: string
  sender: string
  replyto: string
  sender_name: string
  tpl_id: string
  tpl_name: string
  /**
   * "addr_type"字段为"0"表示为使用用户联系人分类中的邮件地址来进行发送，为"1"表示使用邮件订阅列表中的邮件地址来进行发送
   */
  addr_type: string
  list_id: string
  list_name: string
  /**
   * "send_qty"字段为用户设置的发送数量，如为"0"则表示使用指定联系人分类的所有地址来发送;此时"send_qty_remark"则显示添加此任务时指定联系人分类中的实际地址数量。
   */
  send_qty: string
  send_qty_remak: string
  send_time: string
  /**
   * "send_status"字段各值含义如下:"-1": 暂不发送;"1": 等待发送;"2": 正在发送;"3": 发送完成
   */
  send_status: string
  time_start: string
  time_end: string
  send_count: string
  error_count: string
  /**
   * "track_status"字段各值含义如下:"0": 不踊跃;"1": 跟踪邮件打开情况;"2": 跟踪邮件打开与链接点击情况。
   */
  track_status: string
}

export interface IStatistic {
  statistic: {
    date: string
    ws_qty: string
    ws_error: string
    ws_count: string
    invalid_addr: string
    format_error: string
    send_count: string
    deduc_count: string
    actual_send: string
    send_error: string
    actual_deduc: string
  }
}

export interface ITrack {
  track: {
    track_id: string
    task_id: string
    task_sn: string
    send_count: string
    real_send_count: string
    error_send_count: string
    open_unique: string
    open_total: string
    open_first: string
    open_last: string
    click_unique: string
    click_total: string
    click_first: string
    click_last: string
    open_ratio: string
    click_ratio: string
    link_statistic: string
  }
}

export interface IMailListBase {
  subject?: string
  description?: string
  status?: 'enabled' | 'disabled'
}

export interface IMailList extends IMailListBase {
  id: string
  count: string
}

export class BestEdm extends RequestBase {
  options: IBaseEdmOptions
  constructor(options: IBaseEdmOptions) {
    super(options.debug)
    this.options = options
  }

  /**
   * 查询用户信息
   */
  customerInfo(): Promise<ICustomerInfo> {
    return this.request(
      `${apiHost}account.php?do=customer-info`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }

  /**
   * 查询群发服务信息
   */
  serviceInfo(): Promise<IServiceInfo> {
    return this.request(
      `${apiHost}account.php?do=service-info`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }

  /**
   * 取得指定的群发任务或者指定发送日期的群发任务列表
   * @param params
   */
  listTask(params: {
    date?: string
    ident?: string
    id?: string
    state?: number
  }): Promise<{ task_list: { task: ITaskDetail[] } }> {
    return this.request(
      `${apiHost}task.php?do=list-task&${querystring.stringify(params)}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(
          text,
          { explicitArray: false, trim: true },
          (err, reply) => {
            if (err) {
              console.log(`^linenum parseString`, err)
              return
            }
            result = reply
          }
        )
        if (typeof result.task_list === 'string') {
          result.task_list = null
        }
        return result
      }
    )
  }

  /**
   * 获取指定群发任务的跟踪统计概览
   * @param date 所要获取的统计情况的日期
   */
  statistic(date: string): Promise<IStatistic> {
    return this.request(
      `${apiHost}statistic.php?date=${date}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }

  /**
   * 导出发送失败地址
   */
  failexport(params: { date: string; type: FailType }): Promise<string[]> {
    return this.request(
      `${apiHost}failexport.php?out_type=json&${querystring.stringify(params)}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      }
    )
  }

  /**
   * 导出发送失败地址
   */
  failexportall(params: {
    date: string
    type: FailType
  }): Promise<
    {
      email: string
      type: string
      task_id: string
    }[]
  > {
    return this.request(
      `${apiHost}failexportall.php?out_type=json&${querystring.stringify(
        params
      )}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      }
    )
  }

  /**
   * 指定日期或者指定邮件批次发送统计表信息
   * @param params
   */
  stask(params: {
    date?: string
    ident?: string
    id?: string
  }): Promise<{
    data: {
      task: ITaskInfo[]
    }
  }> {
    return this.request(
      `${apiHost}stask.php?${querystring.stringify(params)}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
          if (result.data && !(result.data.task instanceof Array)) {
            result.data.task = [result.data.task]
          }
        })
        return result
      }
    )
  }

  /**
   * 获取指定群发任务的跟踪统计概览
   * @param params
   */
  overview(params: {
    id?: string
    ident?: string
  }): Promise<{
    data: { task: ITaskInfo }
  }> {
    return this.request(
      `${apiHost}track.php?do=overview&${querystring.stringify(params)}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }

  /**
   * 获取指定群发任务邮件打开统计详情
   * @param params
   */
  openDetail(params: { id?: string; ident?: string }) {
    return this.request(
      `${apiHost}track.php?do=open-detail&${querystring.stringify(params)}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }

  /**
   * 导出指定群发任务跟踪统计邮箱信息
   * @param params
   */
  trackexport(params: {
    track_id?: string
    is_click?: string
    link_id?: string
    email_id?: string
  }) {
    return this.request(
      `${apiHost}trackexport.php?${querystring.stringify(params)}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }

  /**
   * 指定批次的邮件各链接的点击统计
   * @param params
   */
  linkStat(params: { id?: string; ident?: string; link_id?: string }) {
    return this.request(
      `${apiHost}track.php?do=link-stat&${querystring.stringify(params)}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }

  /**
   * 获取指定群发任务邮件打开统计详情
   * @param params
   */
  clickDetail(params: { id?: string; ident?: string; link_id?: string }) {
    return this.request(
      `${apiHost}track.php?do=click-detail&${querystring.stringify(params)}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }

  /**
   * 取得联系人分类列表
   */
  maillistList(): Promise<{
    maillist: { item: IMailList[] }
  }> {
    return this.request(
      `${apiHost}mloperate.php?do=maillist-list`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
          if (result.maillist && !(result.maillist.item instanceof Array)) {
            result.maillist.item = [result.maillist]
          }
        })
        return result
      }
    )
  }

  /**
   * 取得联系人分类详情
   */
  maillistDetail(
    id: string
  ): Promise<{
    maillist: IMailList
  }> {
    return this.request(
      `${apiHost}mloperate.php?do=maillist-detail&${querystring.stringify({
        id: id,
      })}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }
  /**
   * 添加联系人分类
   */
  maillistAdd(maillist: IMailListBase): Promise<IResult> {
    return this.request(
      `${apiHost}mloperate.php?do=maillist-add`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
        method: 'POST',
        form: maillist,
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }
  /**
   * 添加联系人分类
   */
  maillistEdit(id: string, maillist: IMailListBase): Promise<IResult> {
    return this.request(
      `${apiHost}mloperate.php?do=maillist-edit&id=${encodeURIComponent(id)}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
        method: 'POST',
        form: maillist,
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }
  /**
   * 删除联系人分类
   */
  maillistDel(id: string): Promise<IResult> {
    return this.request(
      `${apiHost}mloperate.php?do=maillist-del&${querystring.stringify({
        id,
      })}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(text, { explicitArray: false }, (err, reply) => {
          if (err) {
            console.log(`^linenum parseString`, err)
            return
          }
          result = reply
        })
        return result
      }
    )
  }
  /**
   * 导出联系人分类地址
   */
  subscriptionExport(id: string): Promise<{ email: string; name: string }[]> {
    return this.request(
      `${apiHost}mloperate.php?do=subscription-export&${querystring.stringify(
        id
      )}`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        return text
          .trim()
          .split(/\n/)
          .map(line => {
            const items = line.split(/\s+/)
            return {
              email: items[0],
              name: items[1],
            }
          })
      }
    )
  }
  /**
   * 获取用户群发任务列表
   */
  taskList(): Promise<{ task_list: { task: ITask[] } }> {
    return this.request(
      `${apiHost}task.php?do=task-list`,
      {
        headers: {
          Authorization: `Basic ${new Buffer(
            `${this.options.user}:${this.options.pass}`
          ).toString('base64')}`,
        },
      },
      text => {
        let result = null
        xml2js.parseString(
          text,
          { explicitArray: false, trim: true },
          (err, reply) => {
            if (err) {
              console.log(`^linenum parseString`, err)
              return
            }
            result = reply
            if (!result.task_list || !result.task_list.task) {
              return null
            }
            if (!(result.task_list.task instanceof Array)) {
              result.task_list.task = [result.task_list.task]
            }
            result.task_list.task.forEach(task => {
              if (!task.listes) {
                task.listes = null
              } else if (!(task.listes.item instanceof Array)) {
                task.listes.item = [task.listes.item]
              }
              if (!task.templates) {
                task.templates = null
              } else if (!(task.templates.template instanceof Array)) {
                task.templates.template = [task.templates.template]
              }
            })
          }
        )
        return result
      }
    )
  }
}
