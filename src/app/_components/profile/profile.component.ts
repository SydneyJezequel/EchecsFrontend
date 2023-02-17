import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../_services/storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * This Component gets current User
 * from Storage using StorageService and show information
 * (username, token, email, roles).
 */
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
