import { Injectable } from '@angular/core';





const USER_KEY = 'auth-user';
/**
 * Ce service gère et stocke les informations des users :
 * (username, email, roles) dans la l'espace Session du navigateur.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {





  /******************************* Constructeur *******************************/

  constructor() { }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui appelle le backend pour se déconnecter.
   * Le contenu de la session (session storage) est supprimé.
   */
  clean(): void {
    window.sessionStorage.clear();
  }




  /**
   * Méthode qui appelle le backend pour enregistrer un user
   * au niveau de la session (session storage).
   * @param user
   */
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }




  /**
   * Méthode qui appelle le backend pour renvoyer le user connecté.
   * Cette méthode récupère également les informations de ce user.
   */
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }




  /**
   * Méthode qui appelle le backend pour contrôler si le user est connecté.
   */
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }





}
