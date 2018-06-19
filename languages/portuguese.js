const portuguese = {
    signInScreen: {
        loggingIn: 'Login...',
        loginError: 'Desculpe, não foi possível reconhecer o nome ou a senha da sua conta.',
        rememberUsername: 'lembre de mim',
        title: 'Bem vinda',
        user: 'Username',
        pass: 'Senha',
        enter: 'Entrar',
        actions: {
            signIn: 'Assinar em'
        }
    },
    home: {
        title: 'Começar',
        buttons: {
            alerts: 'Alertas',
            messages: 'Mensagens',
            browse: 'Descobrir',
            calendar: 'Calendário',
            cashflow: 'Pagamentos',
            grades: 'Notas',
            print: 'Imprimir',
            logout: 'Sair'
        }
    },  
    settings: {
        title: 'Configurações',
        languages: {
            english: 'Inglês',
            spanish: 'Espanhol',
            portuguese: 'Português',
            chinese: 'Chinês'
        },
        chooseLanguage: 'Mudar idioma'
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
        title: 'Esta Semana',
        professor: 'Professor:',
        added: 'Adicionado em',
        dayNames: { 
            sunday: 'Domingo',
            monday: 'Segunda-feira',
            tuesday: 'Terça-feira',
            wednesday: 'Quarta-feira',
            thursday: 'Quinta-feira',
            friday: 'Sexta-feira',
            saturday: 'Sábado'
        }
    },
    navigation: {
        homeTab: 'Começar',
        settingsTab: 'Configurações',
    },
    common: {
        currentLanguage: 'A linguagem atual é "{{lng}}"'
    }
};

export default portuguese;