import {Injectable, NgModule} from '@angular/core';
import {ModalComponent} from "../_components/modal/modal.component";
import {EchecsserviceService} from "./echecsservice.service";
import {TransformationPion} from "../variables-globales/TransformationPion";



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
  constructor(private echecsservice:EchecsserviceService,
              private transformationPion:TransformationPion,
  ) { }



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
    this.changementTypeDuPion(nouvellePiece);
    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
   }



  /**
   * Méthode qui change le type du pion.
   * @param piece
   * @param caseDeDestination
   */
  public changementTypeDuPion(nouvellePiece:string)
  {
    console.log("changementTypeDuPion() déclenché");
    console.log(" variable globale : ");
    console.log(this.transformationPion.pieceATransformer.couleur.couleur);
    console.log("test");
    // Création de la nouvelle pièce par copie de la pièce :
    this.transformationPion.pieceTransforme = this.transformationPion.pieceATransformer;
    // Modification du type de la nouvelle pièce :
    if(this.transformationPion.pieceATransformer.couleur.couleur=="blanc")
    { console.log("pb couleur");
      switch(nouvellePiece) {
        case "dame": {
          this.transformationPion.pieceTransforme.type = "reine blanc";
          break;
        }
        case "tour": {
          this.transformationPion.pieceTransforme.type = "tour blanc";
          break;
        }
        case "fou": {
          this.transformationPion.pieceTransforme.type = "fou blanc";
          break;
        }
        case "cavalier": {
          this.transformationPion.pieceTransforme.type = "cavalier blanc";
          break;
        }
        default: {
          this.transformationPion.pieceTransforme.type = "pion blanc";
          break;
        }
      }
    }else
    {
      switch(nouvellePiece) {
        case "dame": {
          this.transformationPion.pieceTransforme.type = "reine noir";
          break;
        }
        case "tour": {
          this.transformationPion.pieceTransforme.type = "tour noir";
          break;
        }
        case "fou": {
          this.transformationPion.pieceTransforme.type = "fou noir";
          break;
        }
        case "cavalier": {
          this.transformationPion.pieceTransforme.type = "cavalier noir";
          break;
        }
        default: {
          this.transformationPion.pieceTransforme.type  = "pion noir";
          break;
        }
      }
    }
  }



}
