import { Component, OnInit } from '@angular/core';
import {CaseGet} from "../../../_model/CaseGet";
import {HttpErrorResponse} from "@angular/common/http";
import {Case} from "../../../_model/Case";
import {Subject, Subscription} from "rxjs";
import {Piece} from "../../../_model/Piece";
import {EchecsserviceService} from "../../../_services/echecsservice.service";





/**
 * Ce composant gère l'ajout des Utilisateurs sur ce site.
 * Il est utilisé par le board Admin.
 */
@Component({
  selector: 'app-echiquier',
  templateUrl: './echiquier.component.html',
  styleUrls: ['./echiquier.component.scss']
})
export class EchiquierComponent implements OnInit {





  /******************************* Attributs *******************************/
  public casesGet!:CaseGet[];
  public cases!:CaseGet[];
  public numbers = [1,2,3,4,5,6,7,8];
  public case!:Case;
  public noir:String="noir";
  public blanc:String="blanc";
  public subscription!:Subscription;
  public pieceTransforme!:Piece;
  public nouvellePiece!:string;
  public subject = new Subject<string>();
  public roiEnEchec!:boolean;
  public couleurCamp!:boolean;
  public campQuiDoiJouer!:string;





  /******************************* Constructeur *******************************/

  constructor(private echecsservice: EchecsserviceService) { }





  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {}





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui ré-initialise l'échecquier pour commencer une nouvelle partie.
   */
  public getEchequierReInitialise() :void
  {
    // 1- Récupération des données :
    console.log("test1");
    this.echecsservice.getEchequierReInitialise2().subscribe(
      (response: CaseGet[]) => {
        this.casesGet = response;
        // Test :
        console.log(this.casesGet);
        // Test :
        this.casesGet.sort(function compare(a, b) {
          if (a.no_case > b.no_case)
            return -1;
          if (a.no_case < b.no_case)
            return 1;
          return 0;
        });
    })
  }





}
