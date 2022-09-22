import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://reqres.in/api'

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get<Usuario>(`${this.url}/users?per_page=6`)
    .pipe(
      map( (response: any) => {
        return response.data;
      })
    );
  }
}
