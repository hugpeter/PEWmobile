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
            browse: 'Vistazo',
            calendar: 'Calendario',
            cashflow: 'Pagos',
            grades: 'Notas',
            print: 'Imprimir',
            logout: 'Cerrar Sesión'
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
    navigation: {
        homeTab: 'Inicio',
        settingsTab: 'Ajustes',
    },
    common: {
        currentLanguage: 'El idioma actual es "{{lng}}"',
        actions: {
          toggleToSpanish: 'Español',
          toggleToEnglish: 'Inglés'
        }
    }
};

export default spanish;