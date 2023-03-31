import {Role} from "./Role";
import {User} from "./User";





/**
 * Cette classe définit les objets de type User récupérés depuis la Base de données.
 */
export class UserGet implements User {





  /******************************* Attributs *******************************/

  id!:number;
  username!:string;
  email!:string;
  password!:string;
  roles!:Role[];





  /******************************* Constructeur *******************************/

  constructor() {}





}

