import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../_services/auth.service";





/**
 * Ce composant gère l'enregistrement des utilisateurs.
 * Il lie les données du formulaire (nom d'utilisateur, email, mot de passe)
 * du modèle à la méthode AuthService.register() qui renvoie
 * un objet observable.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {





  /******************************* Attributs *******************************/

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';





  /******************************* Constructeur *******************************/

  /**
   * Constructeur
   * @param authService
   */
  constructor(private authService: AuthService) { }





  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {}





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui soumet le formulaire d'inscription.
   */
  onSubmit(): void {
    const { username, email, password } = this.form;
    // Appelle du service. On passe en paramètre les crédential et on renvoie un booléen si la connexion est ok ou non.
    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }





}
