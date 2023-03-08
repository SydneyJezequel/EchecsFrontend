import { Injectable } from '@angular/core';
import {ModalComponent} from "../_components/modal/modal.component";
import {EchecsserviceService} from "./echecsservice.service";
import {CaseGet} from "../_model/CaseGet";


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
  constructor(private echecsservice:EchecsserviceService) { }



  /******************************* Méthodes *******************************/

  /**
   * Méthode qui instancie un modal / une pop-up.
   * @param modal
   */
  add(modal: ModalComponent) {
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
  remove(modal: ModalComponent) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x === modal);
  }



  /**
   * Méthode qui ouvre un modal / une pop-up.
   * @param modal
   */
  open(id: string) {
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
  close() {
    // close the modal that is currently open
    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
  }

  /**
   * Méthode qui transforme un pion arrivé au bout de l'échiquier en nouvelle pièce.
   */
   nouvellePiece(caseDestination:CaseGet, nouvellePiece:string){
     caseDestination.piece.type = nouvellePiece;
     this.echecsservice.transformerPion(caseDestination);
   }


}
