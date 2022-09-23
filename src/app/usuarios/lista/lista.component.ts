import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;
  usuariosSuccessSubs!: Subscription;
  usuariosErrorSubs!: Subscription;

  constructor(
    // private usuarioService: UsuarioService
    private store: Store<AppState>
  ) { }

  ngOnDestroy(): void {
    this.usuariosSuccessSubs.unsubscribe();
  }

  ngOnInit(): void {
    // this.usuarioService.getUsers().subscribe((users) => {
    //   this.usuarios = users;
    // })
    this.usuariosSuccessSubs = this.store.select('usuarios').subscribe( response => {
      this.usuarios = response.users
      this.loading = response.loading;
      this.error = response.error;
    });
    this.store.dispatch(cargarUsuarios());
  }

}
