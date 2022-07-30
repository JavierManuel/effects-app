import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from '../actions';

export interface UsuariosState {
    users: Usuario[],
    loaded: boolean,
    loading: boolean,
    error: any
}

export const usuariosInitialState: UsuariosState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
}

const _usuariosReducer = createReducer(usuariosInitialState,

    on(cargarUsuarios, (state: any) => ({ ...state, loading: true})),

    on(cargarUsuariosSuccess, (state, {usuarios}) => ( {
        ...state,
        loading: false,
        loaded: true,
        users: usuarios != undefined ? [ ...usuarios ] : []
    })),

    on(cargarUsuariosError, (state, {payload}) => ({
        ...state,
        loading: false,
        loaded: false,
        //users: [],
        error: {
            url: payload?.url,
            name: payload?.name,
            message: payload?.message
        }
    })),

);

export function usuariosReducer(state: UsuariosState | undefined, action: Action) {
    return _usuariosReducer(state, action);
}