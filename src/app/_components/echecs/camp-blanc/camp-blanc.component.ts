import { Component, OnInit } from '@angular/core';
import {CaseGet} from "../../../_model/CaseGet";
import {EchecsserviceService} from "../../../_services/echecsservice.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CasesDeplacement} from "../../../variables-globales/CasesDeplacement";
import {ModalService} from "../../../_services/modal.service";
import {Piece} from "../../../_model/Piece";
import {TransformationPion} from "../../../variables-globales/TransformationPion";
import {Observable, Subject, Subscription} from 'rxjs';
import {MessageService} from "../../../_services/message.service";





/**
 * Ce composant gère l'échiquier dans le camp blanc.
 */
@Component({
  selector: 'app-camp-blanc',
  templateUrl: './camp-blanc.component.html',
  styleUrls: ['./camp-blanc.component.scss'],
  providers: [CasesDeplacement, TransformationPion]
})
export class CampBlancComponent implements OnInit {





  /******************************* Attributs *******************************/

  public casesGet!: CaseGet[];
  public cases!: CaseGet[];
  public numbers = [8, 7, 6, 5, 4, 3, 2, 1];
  public blanc:String="blanc";
  public subscription!:Subscription;
  public pieceTransforme!:Piece;
  public nouvellePiece!:string;
  public subject = new Subject<string>();
  public roiEnEchec!:boolean;
  public couleurCamp!:boolean;
  public campQuiDoiJouer!:string;





  /******************************* Constructeur *******************************/

  constructor(private echecsservice: EchecsserviceService,
              private caseDeplacement:CasesDeplacement,
              private modalService: ModalService,
              private transformationPion:TransformationPion,
              private messageService:MessageService) {
  }





  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {
    this.getEchecquierReInitialise();
    this.recuperationCampQuiJoue();

    /***************** Observables *****************/
    /*
    this.subscription = this.messageService.accessMessage().subscribe(
      (response) => {
       this.pieceTransforme = (<Piece>response);
      }
    );
    */
    /***************** Observables *****************/

  }


  /***************** Observables *****************/
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /***************** Observables *****************/











  /******************************* Méthodes *******************************/

  /**
   * Méthode qui ré-initialise l'échecquier pour commencer une nouvelle partie.
   */
  public getEchecquierReInitialise(): void
  {
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
      (error: HttpErrorResponse) =>
      {
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
      // ******* TEST *******
      console.log(i);
      // ******* TEST *******
    } else {
      this.selectCaseDestination(i);
      // ******* TEST *******
      console.log(i);
      // ******* TEST *******
        this.echecsservice.deplacerPiece(this.caseDeplacement.casesDeplacement).subscribe({
          next: response => {
            this.cases = response;
            // Tri des cases :
            this.cases.sort(function compare(a, b) {
              if (a.no_case < b.no_case)
                return -1;
              if (a.no_case > b.no_case)
                return 1;
              return 0;
            });
          }, error:err => {
            alert(err.message);
          }});
        // 4- Déclenchement de la pop-up échec au roi :
        this.echecAuRoi(this.caseDeplacement.casesDeplacement);
        this.caseDeplacement.casesDeplacement = [];
        setTimeout(() =>{
          this.recuperationCampQuiJoue()
        },1000);
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
    let couleurPieceDeplace;
    console.log("test camp qui joue : "+this.campQuiJoue());

    // 2- Contrôles préalable au déplacement :
    // Est-ce qu'une pièce a été sélectionnée ?
    if (!pieceADeplacer){
      this.modalService.open('modal-6');
    }
    // Est-ce que la pièce déplacée appartient au camp qui doit jouer ?
    else
    {
      couleurPieceDeplace = pieceADeplacer.couleur.couleur;
      console.log("pièce déplacée : " + couleurPieceDeplace);
      if(this.campQuiJoue() != couleurPieceDeplace)
      {
        console.log("BLOCAGE DECLENCHE");
        this.modalService.open('modal-12');
      }
    else
    {
      this.caseDeplacement.casesDeplacement.push(this.selectCase(i));
      this.modalService.open('modal-7');
      // 3- Sélectionner la case de destination et déplacer la pièce :
      return this.caseDeplacement.casesDeplacement;
    }
    }
    return null;
  }




  // NOUVELLE VERSION DE LA METHODE :
  /**
   * Méthode qui récupère la case de destination
   * @param i : case de destination sélectionnée.
   */
  public async selectCaseDestination(i: CaseGet) {
    // 1- Sélectionner la case de destination et déplacer la pièce :
    let caseDeDestination = this.selectCase(i);
    let piece = this.caseDeplacement.casesDeplacement[0].piece;
    let typePiece: string = this.caseDeplacement.casesDeplacement[0].piece.type;
    let test;

    if (this.pionBoutEchiquier(typePiece, caseDeDestination)) {
      // **************** SERVICE SIMPLE ****************
      /*
      // chargement de la pièce dans le service :
      this.messageService.pieceATransformer = piece;
      // Pop-up du choix du pion :
      this.modalService.open('modal-9');
      // Modification du pion :
      console.log(this.messageService.nouvellePiece);
      this.changementTypeDuPion(this.messageService.nouvellePiece);
      // Ajout de la pièce dans la caseDeDestination :
      console.log(caseDeDestination.piece);
      caseDeDestination.piece = this.messageService.pieceTransforme;
      // Ajout de la caseDeDestination dans l'array CaseDeplacement.
      this.caseDeplacement.casesDeplacement.push(caseDeDestination);
      return this.caseDeplacement.casesDeplacement;
      */
      // **************** SERVICE SIMPLE ****************


      // **************** OBSERVABLE ****************

      // ANCIENNE VERSION DE L'OBSERVABLE :
      /*
      // Pop-up du choix du pion :
      this.modalService.open('modal-9');
      // Récupération du choix de pièce :
      let nouvellePiece = this.messageService.accessMessage();
      console.log(nouvellePiece);
      // Changement de la pièce :
      this.changementTypeDuPion(nouvellePiece);
      // Ajout de la pièce transformée dans la case de destination :
      caseDeDestination.piece = this.pieceTransforme;
      console.log(caseDeDestination.piece);
      // Ajout da la case de destination dans l'Array caseDeplacement :
      this.caseDeplacement.casesDeplacement.push(caseDeDestination);
      console.log(this.caseDeplacement);
      return this.caseDeplacement.casesDeplacement;
      */

      // NOUVELLE VERSION DE L'OBSERVABLE :
      // Pop-up du choix du pion :
      this.modalService.open('modal-9');
      console.log(this.loadComponents());
      test = await this.loadComponents();
      console.log(test);
      this.changementTypeDuPion(test);
      caseDeDestination.piece = this.pieceTransforme;
      this.caseDeplacement.casesDeplacement.push(caseDeDestination);
      console.log(this.caseDeplacement);
      return this.caseDeplacement.casesDeplacement;
      // Renvoie de l'Array caseDeplacement :
      return this.caseDeplacement.casesDeplacement;
      // **************** OBSERVABLE ****************
    } else {
      this.caseDeplacement.casesDeplacement.push(caseDeDestination);
      return this.caseDeplacement.casesDeplacement;
    }
  }




  // METHODE ASYNCHRONE :
  loadComponents() {
    return new Promise<string>((resolve) => {
      resolve(this.messageService.accessMessage());
    });
  }
    /*
    let nouvellePiece = Promise.resolve(this.messageService.accessMessage());
    console.log(nouvellePiece);
    this.changementTypeDuPion(await nouvellePiece);
    caseDeDestination.piece = this.pieceTransforme;
    this.caseDeplacement.casesDeplacement.push(caseDeDestination);
    console.log(this.caseDeplacement);
    return this.caseDeplacement.casesDeplacement;
    */





  /**
   * Méthode qui change le type du pion.
   * @param nouvellePiece : type de pièce choisi.
   */
  public changementTypeDuPion(nouvellePiece:string)
  {
    // Modification du type de la nouvelle pièce :
    if(this.pieceTransforme.couleur.couleur=="blanc")
    {
      switch(nouvellePiece) {
        case "dame": {
          this.pieceTransforme.type = "reine blanc";
          console.log("type nouvelle pièce"+this.pieceTransforme.type);
          break;
        }
        case "tour": {
          this.pieceTransforme.type = "tour blanc";
          // this.messageService.sendMessage(this.pieceTransforme);
          break;
        }
        case "fou": {
          this.pieceTransforme.type = "fou blanc";
          // this.messageService.sendMessage(this.pieceTransforme);
          break;
        }
        case "cavalier": {
          this.pieceTransforme.type = "cavalier blanc";
          // this.messageService.sendMessage(this.pieceTransforme);
          break;
        }
        default: {
          this.pieceTransforme.type = "pion blanc";
          // this.messageService.sendMessage(this.pieceTransforme);
          break;
        }
      }
    }else
    {
      switch(nouvellePiece) {
        case "dame": {
          this.pieceTransforme.type = "reine noir";
          // this.messageService.sendMessage(this.pieceTransforme);
          break;
        }
        case "tour": {
          this.pieceTransforme.type = "tour noir";
          // this.messageService.sendMessage(this.pieceTransforme);
          break;
        }
        case "fou": {
          this.pieceTransforme.type = "fou noir";
          // this.messageService.sendMessage(this.pieceTransforme);
          break;
        }
        case "cavalier": {
          this.pieceTransforme.type = "cavalier noir";
          // this.messageService.sendMessage(this.pieceTransforme);
          break;
        }
        default: {
          this.pieceTransforme.type  = "pion noir";
          // this.messageService.sendMessage(this.pieceTransforme);
          break;
        }
      }
    }
  }
  // ANCIENNE VERSION DE LA METHODE :
  /*
    public selectCaseDestination(i: CaseGet) {
      // 1- Sélectionner la case de destination et déplacer la pièce :
      let caseDeDestination = this.selectCase(i);
      this.caseDeplacement.casesDeplacement.push(caseDeDestination);
      return this.caseDeplacement.casesDeplacement;
  }
  */




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



  /**
   * Méthode qui identifie si un pion est arrivé au bout de l'échiquier.
   * @param piece
   * @param caseDeDestination
   */
  public pionBoutEchiquier(typePiece:string, caseDeDestination:CaseGet)
  {
    // Règles de contrôle pour transformer un pion
    if(typePiece=="pion noir"
      && (caseDeDestination.no_case == 8
      || caseDeDestination.no_case == 16
      || caseDeDestination.no_case == 24
      || caseDeDestination.no_case == 32
      || caseDeDestination.no_case == 40
      || caseDeDestination.no_case == 48
      || caseDeDestination.no_case == 56
      || caseDeDestination.no_case == 64)
    )
    {
      return true;
    }else if (typePiece=="pion blanc"
        && (caseDeDestination.no_case == 1
        || caseDeDestination.no_case == 9
        || caseDeDestination.no_case == 17
        || caseDeDestination.no_case == 25
        || caseDeDestination.no_case == 33
        || caseDeDestination.no_case == 41
        || caseDeDestination.no_case == 49
        || caseDeDestination.no_case == 57)
      )
      {
        return true;
      }
      else
      {
        return false;
      }
  }

  /*
    public pionBoutEchiquier(typePiece:string, caseDeDestination:CaseGet)
  {
    // Règles de contrôle pour transformer un pion
    if(typePiece=="pion noir") {
      if (caseDeDestination.no_case == 8
        || caseDeDestination.no_case == 16
        || caseDeDestination.no_case == 24
        || caseDeDestination.no_case == 32
        || caseDeDestination.no_case == 40
        || caseDeDestination.no_case == 48
        || caseDeDestination.no_case == 56
        || caseDeDestination.no_case == 64) {
        console.log("pion noir en bout de ligne validé");
        return true;
      }else
      {
        return false;
      }
    }
      else if (typePiece=="pion blanc") {
      if (caseDeDestination.no_case == 1
        || caseDeDestination.no_case == 9
        || caseDeDestination.no_case == 17
        || caseDeDestination.no_case == 25
        || caseDeDestination.no_case == 33
        || caseDeDestination.no_case == 41
        || caseDeDestination.no_case == 49
        || caseDeDestination.no_case == 57) {
        return true;
      }
      else
      {
        return false;
      }
    }
      else
      {
        return false;
      }
  }
   */




  /**
   * Méthode qui change le type du pion.
   * @param piece
   * @param caseDeDestination
   */
  /*
  public changementTypeDuPion(piece:Piece, transformationPion:TransformationPion)
  {
    if(piece.couleur.couleur=="blanc")
    {
      switch(transformationPion.transformationPion) {
        case "dame": {
          piece.type = "reine blanc";
          break;
        }
        case "tour": {
          piece.type = "tour blanc";
          break;
        }
        case "fou": {
          piece.type = "fou blanc";
          break;
        }
        case "cavalier": {
          piece.type = "cavalier blanc";
          break;
        }
        default: {
          piece.type = "pion blanc";
          break;
        }
      }
    }else
    {
      switch(transformationPion.transformationPion) {
        case "dame": {
          piece.type = "reine noir";
          break;
        }
        case "tour": {
          piece.type = "tour noir";
          break;
        }
        case "fou": {
          piece.type = "fou noir";
          break;
        }
        case "cavalier": {
          piece.type = "cavalier noir";
          break;
        }
        default: {
          piece.type = "pion noir";
          break;
        }
      }
    }
  }
  */




  /**
   * Méthode qui déclenche la pop-up Echec au Roi.
   */
  public echecAuRoi(casesDeplacement:CaseGet[])
  {
    this.echecsservice.controleEchecAuRoi(casesDeplacement).subscribe(
      (response: boolean) => {
        this.roiEnEchec = response;
        // TEST :
        console.log("Roi en échec : "+this.roiEnEchec);
        // TEST :
        if(this.roiEnEchec) {
          console.log("modal-10 déclenché.");
          this.modalService.open('modal-10');
        }
    });
  }




  /**
   * Méthode qui récupère le camp qui joue.
   */
  public recuperationCampQuiJoue():void
  {
    this.echecsservice.controleCampQuiJoue().subscribe({
      next:response => {
        this.couleurCamp = response;
        console.log("check booléen : "+response);
      },
      error:err => {
        console.log(err);
      },
      complete:()=>{
    this.campQuiJoue();
    }
    });
  }




  /**
   * Méthode qui renvoie un String.
   */
  campQuiJoue():string
  {
    return this.couleurCamp?"blanc":"noir";
    /*
    if(this.couleurCamp)
    {
      this.campQuiDoiJouer = "blanc";
    }
    else
    {
      this.campQuiDoiJouer = "noir";
    }
    */
    // console.log("couleur renvoyée"+this.campQuiDoiJouer);
    // return this.campQuiDoiJouer;
  }
  /*
    public recuperationCampQuiJoue():void
  {
    this.echecsservice.controleCampQuiJoue().subscribe({
      next:response => {
        this.couleurCamp = response;
        console.log("booléen récupéré"+response);
      },
      error:err => {
        console.log(err);
      },
      complete:()=>{
    this.campQuiJoue();
    }
    });
  }
  */





}
