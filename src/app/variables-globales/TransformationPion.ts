// variablesGlobales.ts
import { Injectable } from '@angular/core';
import {Piece} from "../_model/Piece";





@Injectable({
  providedIn: 'root'
})
export class TransformationPion{





  /******************************* Variables accessibles de partout dans l'application *******************************/
  transformationPion!:string;
  pieceTransforme!:Piece;





}
