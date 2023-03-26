import {Observable, Observer, Subject} from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {Piece} from "../_model/Piece";
import {TransformationPion} from "../variables-globales/TransformationPion";




@Injectable({
  providedIn: 'root'
})
export class MessageService {





  /******************************* Atributs *******************************/

  pieceATransformer!:Piece;
  pieceTransforme!:Piece;
  nouvellePiece!:string;




  /******************************* Observables *******************************/
  private subject = new Subject<string>();




  sendMessage(msg:string) {
    // it is used to publish data
    // ***************** TEST ****************
    console.log("sendMessage Type : " + msg);
    // ***************** TEST ****************
    return this.subject.next(msg);
  }





  accessMessage() {
    // asObservable helps us to prevent the
    // leaks of Observable from outside of the subject
    // ***************** TEST ****************
    /*
    console.log("accessMessage : " + this.subject.asObservable());
    console.log("accessMessage : " + (<Piece>(<unknown>this.subject.asObservable())).type
      +(<Piece>(<unknown>this.subject.asObservable())).couleur.couleur
      +(<Piece>(<unknown>this.subject.asObservable())).statut
    );
    */
    // ***************** TEST ****************
    this.subject.subscribe(
      (response:string) => {
        this.nouvellePiece = response;
        console.log("nouvelle pièce : "+this.nouvellePiece);
        console.log(typeof this.nouvellePiece);
      }
    );
    return this.nouvellePiece;
  }
  /******************************* Observables *******************************/






}
