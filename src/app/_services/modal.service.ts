import {Injectable, NgModule} from '@angular/core';
import {ModalComponent} from "../_components/modal/modal.component";
import {EchecsserviceService} from "./echecsservice.service";
import {CaseGet} from "../_model/CaseGet";
import {TransformationPion} from "../variables-globales/TransformationPion";
import {CasesDeplacement} from "../variables-globales/CasesDeplacement";
import {Piece} from "../_model/Piece";
import {PieceGet} from "../_model/PieceGet";


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
    this.transformationPion.transformationPion = nouvellePiece;
    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
   }



  /**
   * Méthode qui change le type du pion.
   * @param piece
   * @param caseDeDestination
   */
  public changementTypeDuPion(piece:PieceGet, transformationPion:TransformationPion)
  {
    if(piece.couleur.couleur=="blanc")
    {
      switch(transformationPion.transformationPion) {
        case "dame": {
          piece.type = "reine blanc";
          break;
        }
        case "tour": {
          piece.type = "tour blanc";
          break;
        }
        case "fou": {
          piece.type = "fou blanc";
          break;
        }
        case "cavalier": {
          piece.type = "cavalier blanc";
          break;
        }
        default: {
          piece.type = "pion blanc";
          break;
        }
      }
    }else
    {
      switch(transformationPion.transformationPion) {
        case "dame": {
          piece.type = "reine noir";
          break;
        }
        case "tour": {
          piece.type = "tour noir";
          break;
        }
        case "fou": {
          piece.type = "fou noir";
          break;
        }
        case "cavalier": {
          piece.type = "cavalier noir";
          break;
        }
        default: {
          piece.type = "pion noir";
          break;
        }
      }
    }
  }



}
