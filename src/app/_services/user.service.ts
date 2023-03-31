import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';





const API_URL = 'api/test/';
/**
 * Ce service renvoie vers les différentes pages du site (accessibles ou non au public)
 * en fonction des rôles.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {





  /******************************* Constructeur *******************************/

  constructor(private http: HttpClient) {}





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui re-dirige tous les utilisateurs vers la page de connexion.
   */
  getAllUser(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }




  /**
   * Méthode qui re-dirige les utilisateurs du site vers le board Users.
   */
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }




  /**
   * Méthode qui re-dirige les modérateurs vers le board Moderator.
   */
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }




  /**
   * Méthode qui re-dirige les administrateurs vers le board Admin.
   */
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }





}
