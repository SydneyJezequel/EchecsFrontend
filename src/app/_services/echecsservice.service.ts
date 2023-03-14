import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
  private refresh:string="api/echiquier/"
  private deplacer:string="api/deplacer"
  private echecAuRoi:string="api/echec_au_roi"
  private transformer:string="api/transformer"



  /******************************* Constructeur *******************************/
  constructor(private http:HttpClient) { }




  /******************************* Méthodes *******************************/

  /**
   * Méthode qui ré-initialise l'échiquier.
   */
  public getEchequierReInitialise(camp:String):Observable<CaseGet[]>
  {
    return this.http.get<CaseGet[]>(this.reinitialize+camp);
  }



  /**
   * Méthode qui affiche l'échiquier.
   */
  public getEchequier(camp:String):Observable<CaseGet[]>
  {
    console.log(this.http.get<CaseGet[]>(this.refresh+camp));
    return this.http.get<CaseGet[]>(this.refresh+camp);
  }



  /**
   * Méthode qui déplace les pièces d'une case à l'autre
   * @param cases : tableau qui contient les cases de départ et de destination.
   */
  deplacerPiece(cases:CaseGet[]):Observable<CaseGet[]> {
    return this.http.put<CaseGet[]>(this.deplacer, cases);
  }



  /**
   * Méthode qui contrôle si le roi et en échec (échec au roi ou échec et mat).
   */
  controleEchecAuRoi():Observable<number> {
    return this.http.get<number>(this.echecAuRoi);
  }



  /**
   * Méthode qui transforme un pion en pièce.
   * @param cases : string qui contient le nom de la pièce dans laquelle sera transformé le pion.
   */
  /*
  transformerPion(caseDestination:CaseGet):Observable<CaseGet> {
    return this.http.put<CaseGet>(this.transformer, caseDestination);
  }
  */





}
