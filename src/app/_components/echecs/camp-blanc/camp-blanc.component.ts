import { Component, OnInit } from '@angular/core';
import {CaseGet} from "../../../_model/CaseGet";
import {EchecsserviceService} from "../../../_services/echecsservice.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CasesDeplacement} from "../../../variables-globales/CasesDeplacement";
import {ModalService} from "../../../_services/modal.service";


/**
 * Ce composant gère l'échiquier dans le camp blanc.
 */
@Component({
  selector: 'app-camp-blanc',
  templateUrl: './camp-blanc.component.html',
  styleUrls: ['./camp-blanc.component.scss'],
  providers: [CasesDeplacement]
})
export class CampBlancComponent implements OnInit {




  /******************************* Attributs *******************************/

  public casesGet!: CaseGet[];
  public cases!: CaseGet[];
  public numbers = [8, 7, 6, 5, 4, 3, 2, 1];
  public blanc:String="blanc";




  /******************************* Constructeur *******************************/

  constructor(private echecsservice: EchecsserviceService,
              private caseDeplacement:CasesDeplacement,
              private modalService: ModalService) {
  }




  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {
    this.getEchecquierReInitialise();
  }




  /******************************* Méthodes *******************************/

  /**
   * Méthode qui ré-initialise l'échecquier pour commencer une nouvelle partie.
   */
  public getEchecquierReInitialise(): void {
    this.echecsservice.getEchequierReInitialise(this.blanc).subscribe(
      (response: CaseGet[]) => {
        // *************** TEST ***************
        console.log(response);
        // *************** TEST ***************
        this.casesGet = response;
        this.casesGet.sort(function compare(a, b) {
          if (a.no_case > b.no_case)
            return -1;
          if (a.no_case < b.no_case)
            return 1;
          return 0;
        });
        this.cases = this.casesGet.reverse();
        // Test :
        console.log(this.casesGet);
        console.log("Echiquier récupéré");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }



  /**
   * Méthode qui renvoie l'échiquier :
   */
  public getEchecquier(): void {
    this.echecsservice.getEchequier(this.blanc).subscribe(
      (response: CaseGet[]) => {
        this.cases = response;
        this.cases.sort(function compare(a, b) {
          if (a.no_case < b.no_case)
            return -1;
          if (a.no_case > b.no_case)
            return 1;
          return 0;
        });
        console.log(this.cases);
      },
      (error: HttpErrorResponse) => {
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
