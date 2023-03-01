import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CaseGet} from "../_model/CaseGet";
import {User} from "../_model/User";


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
    return this.http.get<CaseGet[]>(this.refresh+camp);
  }



  /**
   * Méthode qui déplace les pièces d'une case à l'autre
   * @param cases : tableau qui contient les cases de départ et de destination.
   */
  deplacerPiece(cases:CaseGet[]):Observable<CaseGet[]> {
    return this.http.put<CaseGet[]>(this.deplacer, cases);
  }




}
