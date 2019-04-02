import { 
    REQUEST_SESSION, 
    SESSION_HAS_ERROR, 
    SESSION, 
    CHANGE_USERNAME, 
    CHANGE_PASSWORD, 
    CHANGE_FAMILY_MEMBER
} from '../actions/loginActions';

import { TIMEOUT } from '../actions/userSessionTimeout';

export default function loginReducer(state = 
    {
        isFetching: false,
        hasError: false,
        sessionTimeout: false,
        Usuario: '',
        Password: '',
        Token: '',
        Student: {
            Cedula: '',
            Nombre: '',
            TipoMaestro: '',
            Ano: 0,
            Periodo: 0,
            IdColegio: 0,
            Colegio: '',
            Bloqueado: 0,
            Aviso: '',
            Periodo_pre: 0,
            Nivel: 0,
            GrupoUsuario: 0,
            Cambiarpass: 0,
            Idioma: 0,
            IdxMaestro: 0
        },
        FamilyMembers: [],
        FamilyOptions: [],
        CurrentFamilyMemberIndex: 0,
        IsFamilia: false,
        Contactos: []
    }, action) {
    switch (action.type) {
      case TIMEOUT:
        return Object.assign({}, state, {
           sessionTimeout: true
        })
      case REQUEST_SESSION:
        return Object.assign({}, state, {
            isFetching: true
        })
      case SESSION:
        return Object.assign({}, action.payload, {
            isFetching: false,
            hasError: false,
            CurrentFamilyMemberIndex: 0
        })
      case SESSION_HAS_ERROR:
        return Object.assign({}, state, {
            isFetching: false,
            hasError: true
        })
      case CHANGE_USERNAME: 
        return Object.assign({}, state, {
            username: action.payload
        })
      case CHANGE_PASSWORD:
        return Object.assign({}, state, {
            password: action.payload
        })
      case CHANGE_FAMILY_MEMBER:
        return Object.assign({}, state, {
            CurrentFamilyMemberIndex: action.payload
        })
      default:
        return state;
    }
}