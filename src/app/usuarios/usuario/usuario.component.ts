import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit, OnDestroy {

  userSub!: Subscription;
  usuario: Usuario | null = null;
  loading: boolean = false;
  error: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.store.select('usuario').subscribe( response => {
      this.usuario = response.user;
      this.loading = response.loading;
      this.error = response.error;
    })
    this.activatedRoute.params.subscribe( ({id})=> {      
      this.store.dispatch(cargarUsuario({id}));
    })
  }

}
