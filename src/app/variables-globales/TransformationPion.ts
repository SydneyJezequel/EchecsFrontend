// variablesGlobales.ts
import { Injectable } from '@angular/core';
import {PieceGet} from "../_model/PieceGet";
import {Piece} from "../_model/Piece";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class TransformationPion{




  /******************************* Variables accessibles de partout dans l'application *******************************/
  transformationPion!:string;
  pieceTransforme!:Piece;

}
