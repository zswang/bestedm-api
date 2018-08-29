import { RequestBase } from 'irequest';
export declare type FailType = 'format_error' | 9 | 'format_error' | 8 | 'not_exist' | 1 | 'over_quota' | 2 | 'user_reject' | 3 | 5 | 'all' | -1;
export interface IBaseEdmOptions {
    debug?: boolean;
    user: string;
    pass: string;
}
export interface ICustomerInfo {
    customer: {
        id: string;
        username: string;
        company: string;
        contact: string;
        phone: string;
        mobile: string;
        email: string;
        im: string;
        address: string;
    };
}
export interface IServiceInfo {
    service: {
        id: string;
        /**
         * 用户群发服务状态，"enabled"为允许用户使用群发服务;"disabled"为禁止用户使用群发服务。
         */
        service_status: string;
        /**
         * 群发服务类型，"all"为按群发总量进行发送，"day"为按每日发送量进行发送。
         */
        service_type: string;
        /**
         * 群发发送方式，"remote"为客户使用自已的服务器与平台对接发送，"local"为使用平台服务器来进行发送。
         */
        send_type: string;
        qty_available: string;
        qty_buytotal: string;
    };
}
export interface ITask {
    id: string;
    sn: string;
    acct_type: string;
    acct_domain: string;
    acct_address: string;
    sender: string;
    replyto: string;
    sender_name: string;
    templates: {
        template: {
            tpl_id: string;
            tpl_name: string;
        }[];
    };
    listes: {
        item: {
            list_id: string;
            list_name: string;
        }[];
    };
    list_id: string;
    list_name: string;
    send_qty: string;
    send_qty_remak: string;
    send_time: string;
    time_start: string;
    time_end: string;
    send_count: string;
    error_count: string;
    send_status: string;
    track_status: string;
}
export interface ITaskDetail {
    id: string;
    sn: string;
    sender: string;
    replyto: string;
    sender_name: string;
    tpl_id: string;
    tpl_name: string;
    /**
     * "addr_type"字段为"0"表示为使用用户联系人分类中的邮件地址来进行发送，为"1"表示使用邮件订阅列表中的邮件地址来进行发送
     */
    addr_type: string;
    list_id: string;
    list_name: string;
    /**
     * "send_qty"字段为用户设置的发送数量，如为"0"则表示使用指定联系人分类的所有地址来发送;此时"send_qty_remark"则显示添加此任务时指定联系人分类中的实际地址数量。
     */
    send_qty: string;
    send_qty_remak: string;
    send_time: string;
    /**
     * "send_status"字段各值含义如下:"-1": 暂不发送;"1": 等待发送;"2": 正在发送;"3": 发送完成
     */
    send_status: string;
    time_start: string;
    time_end: string;
    send_count: string;
    error_count: string;
    /**
     * "track_status"字段各值含义如下:"0": 不踊跃;"1": 跟踪邮件打开情况;"2": 跟踪邮件打开与链接点击情况。
     */
    track_status: string;
}
export interface IStatistic {
    statistic: {
        date: string;
        ws_qty: string;
        ws_error: string;
        ws_count: string;
        invalid_addr: string;
        format_error: string;
        send_count: string;
        deduc_count: string;
        actual_send: string;
        send_error: string;
        actual_deduc: string;
    };
}
export declare class BestEdm extends RequestBase {
    options: IBaseEdmOptions;
    constructor(options: IBaseEdmOptions);
    /**
     * 查询用户信息
     */
    customerInfo(): Promise<ICustomerInfo>;
    /**
     * 查询群发服务信息
     */
    serviceInfo(): Promise<IServiceInfo>;
    /**
     * 取得指定的群发任务或者指定发送日期的群发任务列表
     * @param params
     */
    listTask(params: {
        date?: string;
        ident?: string;
        id?: string;
        state?: number;
    }): Promise<{
        task_list: {
            task: ITaskDetail[];
        };
    }>;
    /**
     * 获取指定群发任务的跟踪统计概览
     * @param date 所要获取的统计情况的日期
     */
    statistic(date: string): Promise<IStatistic>;
    /**
     * 导出发送失败地址
     */
    failexport(params: {
        date: string;
        type: FailType;
    }): Promise<string[]>;
    /**
     * 导出发送失败地址
     */
    failexportall(params: {
        date: string;
        type: FailType;
    }): Promise<{
        email: string;
        type: string;
        task_id: string;
    }[]>;
    /**
     * 获取用户群发任务列表
     */
    taskList(): Promise<{
        task_list: {
            task: ITask[];
        };
    }>;
}
//# sourceMappingURL=index.d.ts.map