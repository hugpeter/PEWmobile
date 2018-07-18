const chinese = { 
    signInScreen: {
        loggingIn: '在登录',
        loginError: '抱歉，我们无法识别您的帐户名称或密码。',
        rememberUsername: '记住我',
        title: '欢迎',
        user: '用户',
        pass: '密码',
        enter: '输入',
        actions: {
            signIn: '签到'
        }
    },
    home: {
        title: '家',
        buttons: {
            alerts: '警报',
            messages: '讯息',
            browse: '浏览',
            calendar: '日历',
            cashflow: '支付',
            grades: '级别',
            print: '印刷',
            logout: '登出',
            coupons: '优惠券',
            documents: '文件'
        }
    },  
    settings: {
        title: '组态',
        languages: {
            english: '英语',
            spanish: '西班牙人',
            portuguese: '葡萄牙语',
            chinese: '中文'
        },
        chooseLanguage: '改变语言'
    },
    grades: {
        title: '等级',
        headers: {
            class: '课时',
            grade: '平均'
        },
        isFetching: '寻找课程',
        hasError: '很抱歉，检索数据时出现问题。 请稍后再试。',
        noClasses: '对不起，我们找不到任何课程给你。'
    },
    gradesDetail: {
        headers: {
            assignment: '任务',
            grade: '平均'
        }
    },
    calendar: {
        title: '日历',
        noEvents: '今天的日历上没有任何东西。'
    },
    calendarDetail: {
        title: '本星期',
        professor: '教授:',
        added: '添加',
        dayNames: { 
            sunday: '星期日',
            monday: '星期一',
            tuesday: '星期二',
            wednesday: '星期三',
            thursday: '星期四',
            friday: '星期五',
            saturday: '星期六'
        }
    },
    inbox: {
        title: '收件箱',
    },
    message: {
        from: '从: ',
        to: '对于: ',
        title: ''
    },
    coupons: {
        title: '优惠券',
        categories: {
            restaurants: '餐馆',
            travel: '旅行',
            electronics: '电子产品',
            entertainment: '娱乐'
        }
    },
    navigation: {
        homeTab: '家',
        settingsTab: '组态',
        messagesTab: '消息'
    },
    common: {
        currentLanguage: '目前的语言是 "{{lng}}"'
    }
};

export default chinese;