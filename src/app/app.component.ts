import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { ModalService } from "./_services/modal.service";
import {CaseGet} from "./_model/CaseGet";
import {HttpErrorResponse} from "@angular/common/http";
import {EchecsserviceService} from "./_services/echecsservice.service";



/**
 * Ce composant :
 * - Gère l'accès au site.
 * - Définit la barre de navigation.
 * - Gère les pop-up appelées par le modale.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {




  /******************************* Attributs *******************************/

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  camp!:string;
  dame!:string;
  tour!:string;
  fou!:string;
  cavalier!:string;
  caseDestination!:CaseGet;



  /******************************* Constructeur *******************************/

  /**
   * Constructeur :
   * @param storageService
   * @param authService
   */
  constructor(private storageService: StorageService,
              private authService: AuthService,
              public modalService: ModalService,
              private echecsservice:EchecsserviceService) { }




  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {

    // On vérifie si le user est connecté :
    this.isLoggedIn = this.storageService.isLoggedIn();

    // S'il est connecté, on charge ces données (username, rôles, etc.)
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      // On renvoie un booléen selon le rôle dont dispose le user :
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      // On récupère le nom du user :
      this.username = user.username;
    }
  }




  /******************************* Méthodes *******************************/


  /**
   * Déconnexion :
   */
  logout(): void {
    // Appel du service déconnexion.
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        // Nettoyage de la session :
        this.storageService.clean();
        // Rechargement de la page :
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }



  /**
   * Méthode qui ré-initialise l'échecquier pour commencer une nouvelle partie.
   */
  public getEchecquierReInitialise(camp:String)
  {
    this.echecsservice.getEchequierReInitialise(this.camp).subscribe(
      (response: CaseGet[]) =>
      {
          this.modalService.open('modal-5');
      },
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
    )
  }




}
