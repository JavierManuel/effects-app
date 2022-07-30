import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { of } from 'rxjs';
import { UsuarioService } from "../../services/usuario.service";
import * as usuariosActions from "../actions/usuarios.actions";
import { Usuario } from '../../models/usuario.model';


@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            //tap( data => console.log('effect tap ', data) ),
            switchMap(
                () => { return this.usuarioService.getUsers()
                .pipe(
                    tap( data => console.log('getUsers effect ', data)),
                    map( (users: Usuario[]) => {
                        console.log('entro: ', users);
                        return usuariosActions.cargarUsuariosSuccess( {usuarios: users})
                    }
                    ),
                    catchError( err =>  {
                        console.log('error: ', err);
                        return of(usuariosActions.cargarUsuariosError({payload: err}) ) 
                    })
                )
                }
            )
        )
    );

}