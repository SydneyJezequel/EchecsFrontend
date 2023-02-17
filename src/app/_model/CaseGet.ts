import {Case} from "./Case";
import {Piece} from "./Piece";
import {Couleur} from "./Couleur";


/**
 * Cette classe définit les objets Case récupéré depuis la base de données.
 */
export class CaseGet implements Case {




  /******************************* Attributs *******************************/

  no_case!:number;
  colonne!:string;
  ligne!:number;
  couleur!:Couleur;
  piece!:Piece;




  /******************************* Constructeur *******************************/

  constructor() {}




}
