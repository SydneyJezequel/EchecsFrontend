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
   * La méthode suivante renvoie tous les rôles disponibles sur cette application.
   */
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.all);
  }




}
