import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { of } from 'rxjs';
import { UsuarioService } from "../../services/usuario.service";
import * as usuariosActions from "../actions";
import { Usuario } from '../../models/usuario.model';


@Injectable()
export class UsuarioEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuario ),
            //tap( data => console.log('effect tap ', data) ),
            switchMap(
                ( action ) => { return this.usuarioService.getUserById(action.id)
                .pipe(
                    tap( data => console.log('getUser effect ', data)),
                    map( (user: Usuario) => {
                        console.log('entro: ', user);
                        return usuariosActions.cargarUsuarioSuccess( {usuario: user})
                    }
                    ),
                    catchError( err =>  {
                        console.log('error: ', err);
                        return of(usuariosActions.cargarUsuarioError({payload: err}) ) 
                    })
                )
                }
            )
        )
    );

}