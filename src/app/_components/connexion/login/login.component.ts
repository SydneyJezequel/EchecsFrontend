import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { StorageService } from '../../../_services/storage.service';





/**
 * Ce composant gère la connexion des utilisateurs.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {





  /******************************* Attributs *******************************/

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];





  /******************************* Constructeur *******************************/

  /**
   * Constructeur
   * @param authService
   * @param storageService
   */
  constructor(private authService: AuthService, private storageService: StorageService) { }





  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui soumet le formulaire de connexion.
   */
  onSubmit(): void {
    const { username, password } = this.form // On récupère les credentials du formulaire.
    this.authService.login(username, password).subscribe({
      next: data => {
        // On sauve les données du user dans sa session :
        this.storageService.saveUser(data);
        // On met à jour les booléens.
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // On récupère les rôles du user et on recharge la page :
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }




  /**
   * Méthode qui recharge la page en cours.
   */
  reloadPage(): void {
    window.location.reload();
  }





}
