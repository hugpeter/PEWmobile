const portuguese = {
    signInScreen: {
        loggingIn: 'Login...',
        loginError: 'Desculpe, não foi possível reconhecer o nome ou a senha da sua conta.',
        rememberUsername: 'Lembre de Mim',
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
            calendar: 'Calendário',
            cashflow: 'Pagamentos',
            grades: 'Notas',
            logout: 'Sair',
            coupons: 'Cupões',
            documents: 'Documentos'
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
        chooseLanguage: 'Mudar idioma',
        privacyPolicy: 'Política de Privacidade'
    },
    grades: {
        title: 'Notas',
        headers: {
            class: 'Classe',
            grade: 'Média',
            area: 'Área'
        },
        isFetching: 'Procurando por classes...',
        hasError: 'Lamentamos, houve um problema ao recuperar os dados. Por favor, tente novamente mais tarde.',
        noClasses: 'Desculpe, não conseguimos encontrar nenhuma aula para você.'
    },
    gradesDetail: {
        headers: {
            assignment: 'Tarefa',
            grade: 'Nota',
            materia: 'Importa'
        }
    },
    calendar: {
        title: 'Calendário',
        noEvents: 'Não há nada no calendário para este dia.'
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
    inbox: {
        title: 'Entrada',
        noMessages: 'Você não tem novas mensagens no momento.'
    },
    sent: {
        title: 'Enviado',
        noMessages: 'Você não tem mensagens enviadas.'
    },
    deleted: {
        title: 'Excluído',
        noMessages: 'Não há mensagens excluídas.'
    },
    documents: {
        title: 'Documentos',
        noMessages: 'Atualmente, não há documentos para você ver aqui.'
    },
    message: {
        from: 'De: ',
        you: 'Você',
        to: 'Para: ',
        cc: 'CC: ',
        bcc: 'CCO: ',

        title: '',
        reply: 'Responder',
        replyall: 'Responder todos',
        forward: 'Encaminhar',
        cancel: 'Cancelar',
        subject: 'Assunto'
    },
    coupons: {
        title: 'Cupões',
        categories: {
            restaurants: 'Restaurantes',
            travel: 'Viagem',
            electronics: 'Eletrônicos',
            entertainment: 'Entretenimento'
        }
    },
    navigation: {
        homeTab: 'Começar',
        settingsTab: 'Configurações',
        messagesTab: 'Mensagens'
    },
    common: {
        currentLanguage: 'A linguagem atual é "{{lng}}"',
        hasError: 'O seu tempo de sessão expirou, por favor, faça o login novamente.'
    }
};

export default portuguese;