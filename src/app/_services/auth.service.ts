import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";


// Début de l'url :
const AUTH_API = 'api/auth/';

// Option de configuration de l'entête :
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


/**
Ce service envoie des requêtes HTTP POST d'enregistrement, de connexion et de déconnexion au back-end.
* Il fournit les fonctions suivantes :
- login() : POST {nom d'utilisateur, mot de passe}
- s'inscrire() : POST {nom d'utilisateur, e-mail, mot de passe}
- logout() : demande de déconnexion POST
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {




  /******************************* Constructeur *******************************/

  constructor(private http: HttpClient) {}
  /**
   *
   * HttpClient : est utilisé pour authentifier les users.
   * HttpHeaders : represents the header configuration options for an HTTP request.
   * Observables : provide support for passing messages between parts of your application.
   */




  /******************************* Méthodes *******************************/

  /**
   * Méthode de connexion :
   */
  login(username: string, password: string): Observable<any> { // Les requêtes HTTP sont convertit sous la forme d'un observable.
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions // Les données de connexion sont envoyées sous la forme d'un objet JSON.
    );
  }



  /**
   * Méthode d'enregistrement :
   */
  register(username: string, email: string, password: string): Observable<any> { // Les requêtes HTTP sont convertit sous la forme d'un observable.
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions // Les données d'enregistrement sont envoyées sous la forme d'un objet JSON.
    );
  }



  /**
   * Méthode de déconnexion :
   */
  logout(): Observable<any> { // Les requêtes HTTP sont convertit sous la forme d'un observable.
    return this.http.post(
      AUTH_API + 'signout', { },
      httpOptions);
  }




}
