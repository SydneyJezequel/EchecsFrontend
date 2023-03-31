import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../_model/User";
import {UserGet} from "../_model/UserGets";





// Début de l'url :
const USER_API = 'api/user/';
// Option de configuration de l'entête :
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
/**
 * Ce service gère les users (ajouter, modifier, supprimer, etc.).
 */
@Injectable({
  providedIn: 'root'
})
export class UsersManagementService {





  /******************************* Attributs *******************************/

  private all:string="api/user/all";
  private update:string="api/user/update/";
  private delete:string="api/user/delete/";
  private find:string = "api/user/find/";
  private add:string = "api/user/add";





  /******************************* Constructeur *******************************/

  /**
   * Constructeur
   */
  constructor(private http:HttpClient) { }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui appelle le bakend pour récupèrer tous les users.
   */
  getUsers():Observable<UserGet[]>
  {
    return this.http.get<UserGet[]>(this.all);
  }




  /**
   * Méthode qui appelle le bakend pour récupèrer un user via son id.
   * @param id du user.
   */
  getUser(id: number):Observable<UserGet>
  {
    console.log(this.find + id);
    return this.http.get<UserGet>(this.find + id);
  }




  /**
   * Méthode qui modifie un user.
   * @param id du user
   * @param user nouvelle version du user
   */
  editUser(id:number, user: User):Observable<User>{
    return this.http.put<User>(this.update + id, user);
  }




  /**
   * Méthode qui supprime un user.
   * @param id du user supprimé.
   */
  deleteUser(id: number):Observable<void>
  {
    return this.http.delete<void>( this.delete + id);
  }




  /**
   * Méthode qui ajoute un user.
   * @param user ajouté.
   */
  addUser(user : User):Observable<User>
  {
      return this.http.post<User>(this.add, user);
  }





}
