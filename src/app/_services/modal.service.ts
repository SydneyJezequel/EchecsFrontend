import {Injectable, NgModule} from '@angular/core';
import {ModalComponent} from "../_components/modal/modal.component";
import {EchecsserviceService} from "./echecsservice.service";
import {TransformationPion} from "../variables-globales/TransformationPion";
import {MessageService} from "./message.service";
import {Observable, Subscription} from "rxjs";
import {CampBlancComponent} from "../_components/echecs/camp-blanc/camp-blanc.component";
import {Piece} from "../_model/Piece";




/**
 * Ce service gère les modal / pop-up.
 * Ils seront instanciés dans le composant Modal.
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {




  /******************************* Attributs *******************************/

  private modals: ModalComponent[] = [];
  public subscription!:Subscription;
  public pieceTransforme!:Piece;




  /******************************* Constructeur *******************************/

  constructor(private echecsservice:EchecsserviceService,
              private transformationPion:TransformationPion,
              private messageService:MessageService) { }




  /******************************* Méthodes *******************************/

  /**
   * Méthode qui instancie un modal / une pop-up.
   * @param modal
   */
  public add(modal: ModalComponent) {
    // ensure component has a unique id attribute
    if (!modal.id || this.modals.find(x => x.id === modal.id)) {
      throw new Error('modal must have a unique id attribute');
    }
    // add modal to array of active modals
    this.modals.push(modal);
  }



  /**
   * Méthode qui supprime un modal / une pop-up.
   * @param modal
   */
  public remove(modal: ModalComponent) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x === modal);
  }



  /**
   * Méthode qui ouvre un modal / une pop-up.
   * @param modal
   */
  public open(id: string) {
    // open modal specified by id
    const modal = this.modals.find(x => x.id === id);

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.open();
  }



  /**
   * Méthode qui ferme un modal / une pop-up.
   * @param modal
   */
  public close() {
    // close the modal that is currently open
    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
  }



  /**
   * Méthode qui transforme un pion arrivé au bout de l'échiquier en nouvelle pièce.
   */
   public nouvellePiece(nouvellePiece:string){
    this.messageService.sendMessage(nouvellePiece);
    // this.messageService.nouvellePiece = nouvellePiece;
    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
   }




  // **************** SERVICE SIMPLE ****************
  // VERSION DE LA METHODE QUI UTILISE UN SERVICE MAIS PAS D'OBSERVABLE :
  /**
   * Méthode qui change le type du pion.
   * @param nouvellePiece : type de pièce choisi.
   */
  /*
  public changementTypeDuPion(nouvellePiece:String)
  {

    this.messageService.pieceTransforme = this.messageService.pieceATransformer;
    // **************** TEST ****************
    console.log( "messageService.pieceTransforme : "+
      this.messageService.pieceTransforme.type +
      this.messageService.pieceTransforme.couleur.couleur +
      this.messageService.pieceTransforme.statut
    );
    // **************** TEST ****************
    this.messageService.accessMessage();

    // Modification du type de la nouvelle pièce :
    if(this.messageService.pieceATransformer.couleur.couleur=="blanc")
    {
      switch(nouvellePiece) {
        case "dame": {
          this.messageService.pieceTransforme.type = "reine blanc";
          // **************** TEST ****************
          console.log("type nouvelle pièce"+this.messageService.pieceTransforme.type);
          // **************** TEST ****************
          break;
        }
        case "tour": {
          this.messageService.pieceTransforme.type = "tour blanc";
          break;
        }
        case "fou": {
          this.messageService.pieceTransforme.type = "fou blanc";
          break;
        }
        case "cavalier": {
          this.messageService.pieceTransforme.type = "cavalier blanc";
          break;
        }
        default: {
          this.messageService.pieceTransforme.type = "pion blanc";
          break;
        }
      }
    }else
    {
      switch(nouvellePiece) {
        case "dame": {
          this.messageService.pieceTransforme.type = "reine noir";
          break;
        }
        case "tour": {
          this.messageService.pieceTransforme.type = "tour noir";
          break;
        }
        case "fou": {
          this.messageService.pieceTransforme.type = "fou noir";
          break;
        }
        case "cavalier": {
          this.messageService.pieceTransforme.type = "cavalier noir";
          break;
        }
        default: {
          this.messageService.pieceTransforme.type  = "pion noir";
          break;
        }
      }
    }
  }
  */
  // **************** SERVICE SIMPLE ****************



}
