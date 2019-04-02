const spanish = {
    signInScreen: {
        loggingIn: 'iniciar sesión...',
        loginError: 'Lo sentimos, no hemos podido reconocer su nombre de cuenta o contraseña.',
        rememberUsername: 'Recordar Usuario',
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
        chooseLanguage: 'Cambiar idioma',
        privacyPolicy: 'Política de Privacidad'
    },
    grades: {
        title: 'Notas',
        headers: {
            class: 'Materia',
            grade: 'Promedio',
            area: 'Area'
        },
        isFetching: 'Buscando materias...',
        hasError: 'Lo sentimos, hubo un problema al recuperar los datos. Por favor, inténtelo de nuevo más tarde.',
        noClasses: 'Lo sentimos, no pudimos encontrar ninguna clase para ti.'
    },
    gradesDetail: {
        headers: {
            assignment: 'Tarea',
            grade: 'Nota',
            materia: 'Materia'
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
        noMessages: 'No tienes mensajes nuevos en este momento.'
    },
    sent: {
        title: 'Expedido',
        noMessages: 'No tienes mensajes enviados.'
    },
    deleted: {
        title: 'Eliminado',
        noMessages: 'No hay mensajes eliminados.'
    },
    documents: {
        title: 'Documentos',
        noMessages: 'Actualmente no hay documentos para que veas aquí.'
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
        hasError: 'Parece que algo salió mal con el acceso a estos datos. ¡Por favor contáctenos y lo arreglaremos para usted!',
        timeout: 'Su tiempo de sesión ha expirado, por favor vuelva a iniciar sesión.'
    }
};

export default spanish;