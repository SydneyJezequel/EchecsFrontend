import { Component, OnInit } from '@angular/core';
import {EchecsserviceService} from "../../../_services/echecsservice.service";
import {CaseGet} from "../../../_model/CaseGet";
import {HttpErrorResponse} from "@angular/common/http";
import {Case} from "../../../_model/Case";
import {CasesDeplacement} from "../../../variables-globales/CasesDeplacement";
import {ModalService} from "../../../_services/modal.service";


/**
 * Ce composant gère l'échiquier dans le camp noir.
 */
@Component({
  selector: 'app-camp-noir',
  templateUrl: './camp-noir.component.html',
  styleUrls: ['./camp-noir.component.scss'],
  providers: [CasesDeplacement]
})
export class CampNoirComponent implements OnInit {




  /******************************* Attributs *******************************/

  public cases!:CaseGet[];
  public numbers = [1,2,3,4,5,6,7,8];
  public case!:Case;
  public noir:String="noir";




  /******************************* Constructeur *******************************/

  constructor(private echecsservice:EchecsserviceService,
              private caseDeplacement:CasesDeplacement,
              private modalService: ModalService) { }




  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {
    this.getEchecquierReInitialise();
  }




  /******************************* Méthodes *******************************/

  /**
   * Méthode qui ré-initialise l'échecquier pour commencer une nouvelle partie.
   */
  public getEchecquierReInitialise( ):void
  {
    this.echecsservice.getEchequierReInitialise(this.noir).subscribe(
      (response: CaseGet[]) =>
      {
        this.cases = response;
        // *************** TEST ***************
        console.log(this.cases)
        // *************** TEST ***************
        this.cases.sort(function compare(a, b) {
          if (a.no_case < b.no_case)
            return -1;
          if (a.no_case > b.no_case)
            return 1;
          return 0;
        });
        console.log(this.cases);
      },
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
    )
  }



  /**
   * Méthode qui renvoie l'échequier.
   */
  public getEchecquier():void
  {
    this.echecsservice.getEchequier(this.noir).subscribe(
      (response: CaseGet[]) =>
      {
        this.cases = response;
        this.cases.sort(function compare(a, b) {
          if (a.no_case < b.no_case)
            return -1;
          if (a.no_case > b.no_case)
            return 1;
          return 0;
        });
      },
      (error:HttpErrorResponse) =>
      {
        alert(error.message);
      }
    )
  }



  /**
   * Méthode qui permet de déplacer une pièce
   * @param i : case sélectionnée.
   */
  public deplacement(i: CaseGet) {
    // 1 - Sélection de la case de Départ et de la case d'arrivée :
    if (!this.caseDeplacement.casesDeplacement.length) {
      this.selectCaseDepart(i);
      // TEST :
      console.log(i);
      // TEST :
    } else {
      this.selectCaseDestination(i);
      // TEST :
      console.log(i);
      // TEST :
      this.echecsservice.deplacerPiece(this.caseDeplacement.casesDeplacement).subscribe(
        (response: CaseGet[]) => {
          this.cases = response;
        },(error:HttpErrorResponse) =>
      {
        alert(error.message);
      });
      // TEST :
      console.log(this.cases);
      // TEST :
      this.caseDeplacement.casesDeplacement = [];
    }
  }



  /**
   * Méthode qui récupère la case de départ
   * @param i : case de départ sélectionnée.
   */
  public selectCaseDepart(i: CaseGet) {
      // 1- Sélectionner la pièce :
      let caseDeDepart = this.selectCase(i);
      let pieceADeplacer = this.selectPiece(i);
      if (pieceADeplacer == null){
        this.modalService.open('modal-6');
      } else {
        this.caseDeplacement.casesDeplacement.push(this.selectCase(i));
        this.modalService.open('modal-7');
        // 2- Sélectionner la case de destination et déplacer la pièce :
        return this.caseDeplacement.casesDeplacement;
      }
      return null;
  }



  /**
   * Méthode qui récupère la case de destination
   * @param i : case de destination sélectionnée.
   */
  public selectCaseDestination(i: CaseGet) {
    // 1- Sélectionner la case de destination et déplacer la pièce :
    let caseDeDestination = this.selectCase(i);
    this.caseDeplacement.casesDeplacement.push(caseDeDestination);
    return this.caseDeplacement.casesDeplacement;
  }



  /**
   * Méthode qui sélectionne une pièce à partir de sa case.
   * @param i : case sélectionnée
   */
  public selectPiece(i: CaseGet)
  {
    return i.piece;
  }



  /**
   * Méthode qui sélectionne et renvoie une case.
   * @param i
   */
  public selectCase(i: CaseGet)
  {
    return i;
  }




}




