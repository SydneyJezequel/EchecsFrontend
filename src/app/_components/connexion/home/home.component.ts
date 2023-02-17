import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../_services/user.service";


/**
 * Ce composant gère la page d'accueil du service.
 * Il utilise le UserService pour obtenir des ressources publiques du back-end.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {




  /******************************* Attributs *******************************/

  content?: string;
  displayContent1?: string;
  displayContent2?: string;




  /******************************* Constructeur *******************************/

  /**
   * Constructeur :
   * @param userService
   */
  constructor(private userService: UserService) { }




  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {
    // Chargement de la page d'accueil publique :
    this.userService.getAllUser().subscribe({
      next: data => {
        this.content = data;
        // @ts-ignore
        this.displayContent1 = this.content.substring(0,32);
        // @ts-ignore
        this.displayContent2 = this.content.substring(33,59);
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }




}
