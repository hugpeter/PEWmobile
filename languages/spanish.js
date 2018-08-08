const spanish = {
    signInScreen: {
        loggingIn: 'iniciar sesión...',
        loginError: 'Lo sentimos, no hemos podido reconocer su nombre de cuenta o contraseña.',
        rememberUsername: 'Activar reconocimiento digital',
        title: 'Bienvenido',
        user: 'Usuario',
        pass: 'Contraseña',
        enter: 'Ingresar',
        actions: {
            signIn: 'Registrarse'
        }
    },
    home: {
        title: 'Inicio',
        buttons: {
            alerts: 'Alertas',
            messages: 'Mensajes',
            calendar: 'Calendario',
            cashflow: 'Pagos',
            grades: 'Notas',
            logout: 'Cerrar Sesión',
            coupons: 'Cupones',
            documents: 'Documentos'
        }
    },  
    settings: {
        title: 'Ajustes',
        languages: {
            english: 'Inglés',
            spanish: 'Español',
            portuguese: 'Portugués',
            chinese: 'Chino'
        },
        chooseLanguage: 'Cambiar idioma'
    },
    grades: {
        title: 'Notas',
        headers: {
            class: 'Materia',
            grade: 'Promedio'
        },
        isFetching: 'Buscando materias...',
        hasError: 'Lo sentimos, hubo un problema al recuperar los datos. Por favor, inténtelo de nuevo más tarde.',
        noClasses: 'Lo sentimos, no pudimos encontrar ninguna clase para ti.'
    },
    gradesDetail: {
        headers: {
            assignment: 'Tarea',
            grade: 'Nota'
        }
    },
    calendar: {
        title: 'Calendario',
        noEvents: 'No hay nada en el calendario para este día.'
    },
    calendarDetail: {
        title: 'Esta Semana',
        professor: 'Profesor:',
        added: 'Agregado el',
        dayNames: {
            sunday: 'Domingo',
            monday: 'Lunes',
            tuesday: 'Martes',
            wednesday: 'Miércoles',
            thursday: 'Jueves',
            friday: 'Viernes',
            saturday: 'Sábado'
        }
    },
    inbox: {
        title: 'Entrada',
        noMessages: 'No tienes mensajes nuevos en este momento.',
        hasError: '¡Ups! Parece que algo salió mal. Inténtalo de nuevo más tarde.'
    },
    sent: {
        title: 'Expedido',
        noMessages: 'No tienes mensajes enviados.',
        hasError: '¡Ups! Parece que algo salió mal. Inténtalo de nuevo más tarde.'
    },
    deleted: {
        title: 'Eliminado',
        noMessages: 'No hay mensajes eliminados.',
        hasError: '¡Ups! Parece que algo salió mal. Inténtalo de nuevo más tarde.'
    },
    documents: {
        title: 'Documentos'
    },
    message: {
        from: 'De: ',
        you: 'Tú',
        to: 'Para: ',
        cc: 'CC:',
        bcc: 'CCO:',
        title: '',
        reply: 'Respuesta',
        replyall: 'Responder a todos',
        forward: 'Reenviar',
        cancel: 'Cancelar',
        subject: 'Asunto'
    },
    navigation: {
        homeTab: 'Inicio',
        settingsTab: 'Ajustes',
        messagesTab: 'Mensajes'
    },
    coupons: {
        title: 'Cupones',
        categories: {
            restaurants: 'Restaurantes',
            travel: 'Viajes',
            electronics: 'Electrónica',
            entertainment: 'Entretenimiento'
        }
    },
    common: {
        currentLanguage: 'El idioma actual es "{{lng}}"',
    }
};

export default spanish;