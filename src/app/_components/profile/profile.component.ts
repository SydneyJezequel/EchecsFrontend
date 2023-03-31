import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';





/**
 * Ce composant récupère l'utilisateur actuel
 * à partir de la BDD à l'aide de StorageService et affiche ses informations :
 * username, e-mail, rôles, etc.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {





  /******************************* Attributs *******************************/

  currentUser: any;





  /******************************* Constructeur *******************************/

  /**
   * Constructeur
   */
  constructor(private storageService: StorageService) { }





  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }





}
