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
            browse: 'Browse',
            calendar: 'Calendar',
            cashflow: 'Payments',
            grades: 'Grades',
            print: 'Print',
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
        hasError: 'We\'re sorry, there was an issue retrieving the data. Please try again later.',
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
        noEvents: 'There is nothing on the calendar for this day.'
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
    },
    navigation: {
        homeTab: 'Home',
        settingsTab: 'Settings',
        messagesTab: 'Messages'
    },
    common: {
        currentLanguage: 'The current language is "{{lng}}"'
    }
};

export default english;