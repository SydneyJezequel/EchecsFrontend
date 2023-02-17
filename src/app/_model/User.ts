import {Role} from "./Role";


/**
 * Cette classe définit les objets users enregistrés en Base de données.
 */
export class User {




  /******************************* Attributs *******************************/

  username!:string;
  email!:string;
  password!:string;
  roles!:Role[];




  /******************************* Constructeur *******************************/

  constructor() {}




}

