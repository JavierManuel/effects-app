import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuario } from '../../store/actions/usuario.actions';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario | undefined;

  constructor( private router: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('usuario').subscribe( ({ user, loading, error }) => {
      this.usuario = user;
    })

    this.router.params.subscribe( ({ id }) => {
      
      this.store.dispatch( cargarUsuario( { id }) );

    } )
  }

}
