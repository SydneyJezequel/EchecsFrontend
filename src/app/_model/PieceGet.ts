import {Couleur} from "./Couleur";
import {Piece} from "./Piece";





/**
 * Cette classe définit les objets de type Pièces récupérés depuis la base de données.
 */
export class PieceGet implements Piece {





  /******************************* Attributs *******************************/

  no_piece!:number;
  type!:string;
  couleur!:Couleur;
  statut!:string;





}
