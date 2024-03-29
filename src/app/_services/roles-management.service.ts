import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../_model/Role";





/**
 * Ce service gère les rôles disponible sur cette application.
 */
@Injectable({
  providedIn: 'root'
})
export class RolesManagementService {





  /******************************* Attributs *******************************/

  private all:string="api/role/all";





  /******************************* Constructeur *******************************/

  /**
   * Constructeur
   * @param http
   */
  constructor(private http: HttpClient) {}





  /******************************* Méthodes *******************************/

  /**
   * La méthode qui appelle le backend pour renvoyer
   * tous les rôles disponibles sur l'application.
   */
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.all);
  }





}
