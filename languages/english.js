const english = {
    signInScreen: {
        loggingIn: 'Logging in...',
        loginError: 'Sorry, we were unable to recognize your account name or password',
        rememberUsername: 'Remember Username',
        title: 'Welcome',
        user: 'Username',
        pass: 'Password',
        enter: 'Enter',
        actions: {
            signIn: 'Sign In'
        }
    },
    home: {
        title: 'Home',
        buttons: {
            alerts: 'Alerts',
            messages: 'Messages',
            coupons: 'Coupons',
            calendar: 'Calendar',
            cashflow: 'Payments',
            grades: 'Grades',
            documents: 'Documents',
            logout: 'Logout'
        }
    },  
    settings: {
        title: 'Settings',
        languages: {
            english: 'English',
            spanish: 'Spanish',
            portuguese: 'Portuguese',
            chinese: 'Chinese'
        },
        chooseLanguage: 'Change language'
    },
    grades: {
        title: 'Grades',
        headers: {
            class: 'Class',
            grade: 'Average'
        },
        isFetching: 'Searching for classes...',
        noClasses: 'Sorry, we could not find any classes for you.'
    },
    gradesDetail: {
        headers: {
            assignment: 'Assignment',
            grade: 'Grade'
        }
    },
    calendar: {
        title: 'Calendar',
        noEvents: 'There is nothing on the calendar for this day.',
    },
    calendarDetail: {
        title: 'This Week',
        professor: 'Professor:',
        added: 'Added on',
        dayNames: {
            sunday: 'Sunday',
            monday: 'Monday',
            tuesday: 'Tuesday',
            wednesday: 'Wednesday',
            thursday: 'Thursday',
            friday: 'Friday',
            saturday: 'Saturday'
        }
    },
    inbox: {
        title: 'Inbox',
        noMessages: 'You do not have new messages at the moment.',
    },
    sent: {
        title: 'Sent',
        noMessages: 'You have no sent messages.',
    },
    deleted: {
        title: 'Deleted',
        noMessages: 'There are no deleted messages',
    },
    documents: {
        title: 'Documents',
        noMessages: 'There are currently no documents for you to see here.',
    },
    message: {
        from: 'From: ',
        you: 'You',
        to: 'To: ',
        cc: 'CC: ',
        bcc: 'BCC: ',

        title: '',
        reply: 'Reply',
        replyall: 'Reply All',
        forward: 'Forward',
        cancel: 'Cancel',
        subject: 'Subject'
    },
    navigation: {
        homeTab: 'Home',
        settingsTab: 'Settings',
        messagesTab: 'Messages'
    },
    coupons: {
        title: 'Coupons',
        categories: {
            restaurants: 'Restaurants',
            travel: 'Travel',
            electronics: 'Electronics',
            entertainment: 'Entertainment'
        }
    },
    common: {
        currentLanguage: 'The current language is "{{lng}}"',
        hasError: 'Your session time has expired, please log back in.'
    }
};

export default english;