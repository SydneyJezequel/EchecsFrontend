import {Piece} from "./Piece";
import {Couleur} from "./Couleur";





/**
 * Cette classe définit les objets de type Case.
 */
export interface Case {





  /******************************* Attributs *******************************/

  colonne:string;
  ligne:number;
  couleur:Couleur;
  piece:Piece;





}
