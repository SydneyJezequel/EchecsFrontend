import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CaseGet} from "../_model/CaseGet";





/**
 * Ce service gère l'échiquier (initialisation, déplacement des pièces, etc.).
 */
@Injectable({
  providedIn: 'root'
})
export class EchecsserviceService {





  /******************************* Attributs *******************************/

  private reinitialize:string="api/nouvelle_partie/"
  private reinitialize2:string="api/nouvelle_partie"
  private refresh:string="api/echiquier/"
  private refresh2:string="api/echiquier"
  private deplacer:string="api/deplacer"
  private echecAuRoi:string="api/echec_au_roi"
  private campQuiJoueUrl:string="api/camp_qui_joue"
  private transformer:string="api/transformer"
  private echecAuroi!:boolean;
  private campQuiJoue!:string;





  /******************************* Constructeur *******************************/

  constructor(private http:HttpClient) { }





  /******************************* Méthodes *******************************/

  /**
   * Méthode appelle le backend pour ré-initialiser l'échiquier.
   * @param camp : string qui indique la façon d'afficher l'échiquier en fonction du camp.
   */
  public getEchequierReInitialise(camp:String):Observable<CaseGet[]>
  {
    return this.http.get<CaseGet[]>(this.reinitialize+camp);
  }




  /**
   *  Méthode qui appelle le backend pour récupérer l'échiquier.
   *  @param camp : string qui indique la façon d'afficher l'échiquier en fonction du camp.
   */
  public getEchequier(camp:String):Observable<CaseGet[]>
  {
    console.log(this.http.get<CaseGet[]>(this.refresh+camp));
    return this.http.get<CaseGet[]>(this.refresh+camp);
  }




  /**
   * Méthode qui appelle le backend pour déplacer les pièces.
   * @param cases : tableau qui contient les cases de départ et de destination.
   */
  deplacerPiece(cases:CaseGet[]):Observable<CaseGet[]> {
    // TEST :
    console.log(cases);
    // TEST :
    return this.http.put<CaseGet[]>(this.deplacer, cases);
  }




  /**
   * Méthode qui appelle le backend pour contrôler si le roi
   * est en échec.
   */
  controleEchecAuRoi(cases:CaseGet[]):Observable<boolean>
  {
    console.log(cases);
    return this.http.put<boolean>(this.echecAuRoi, cases);
  }




  /**
   * Méthode qui appelle le backend pour récupèrer le camp qui joue.
   */
  controleCampQuiJoue():Observable<boolean> {
    return this.http.get<boolean>(this.campQuiJoueUrl);
  }







  /******************************* NOUVEAU FLUX D'AFFICHAGE *******************************/



  /**
   * Méthode appelle le backend pour ré-initialiser l'échiquier.
   * Cette ré-initialisation est exécutée sans indiquer de camp.
   *
   */
  public getEchequierReInitialise2():Observable<CaseGet[]>
  {
    console.log("test1");
    return this.http.get<CaseGet[]>(this.reinitialize2);
  }




  /**
   *  Méthode qui appelle le backend pour récupérer l'échiquier.
   *  @param camp : string qui indique la façon d'afficher l'échiquier en fonction du camp.
   */
  public getEchequier2():Observable<CaseGet[]>
  {
    return this.http.get<CaseGet[]>(this.refresh2);
  }





}
