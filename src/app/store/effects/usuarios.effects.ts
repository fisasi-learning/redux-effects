import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from "../actions";
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuariosEffects {

  constructor(
    private actions$: Actions,
    private usuariosService: UsuarioService
  ) {}

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType(cargarUsuarios),
      mergeMap(
        () => this.usuariosService.getUsers().pipe(
          map( users => cargarUsuariosSuccess({usuarios: users})),
          catchError( error => of(cargarUsuariosError({payload: error})))
        )
      )
    )
  );
}