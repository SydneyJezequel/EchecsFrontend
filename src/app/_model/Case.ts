import {Piece} from "./Piece";
import {Couleur} from "./Couleur";


/**
 * Cette classe définit les objets Case enregistrés en base de données.
 */
export interface Case {




  /******************************* Attributs *******************************/

  colonne:string;
  ligne:number;
  couleur:Couleur;
  piece:Piece;




}
