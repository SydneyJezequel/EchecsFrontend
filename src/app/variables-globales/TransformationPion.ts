// variablesGlobales.ts
import { Injectable } from '@angular/core';
import {PieceGet} from "../_model/PieceGet";
import {Piece} from "../_model/Piece";



@Injectable({
  providedIn: 'root'
})
export class TransformationPion{




  /******************************* Variables accessibles de partout dans l'application *******************************/
  transformationPion!:string;
  pieceATransformer!:Piece;
  pieceTransforme!:Piece;

}
