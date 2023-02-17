import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import {Observable} from "rxjs";
import {User} from "../../../_model/User";
import {UsersManagementService} from "../../../_services/users-management.service";
import {UserGet} from "../../../_model/UserGets";
import { Router } from '@angular/router';


@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {




  /******************************* Attributs *******************************/

  content?: string;
  users_list?:UserGet[];
  displayContent1?: string;
  displayContent2?: string;
  user = new User();




  /******************************* Constructeur *******************************/

  /**
   * Constructeur :
   * @param userService
   */
  constructor(private userService: UserService,
              private user_manager: UsersManagementService,
              private router:Router) { }




  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {
    // On appelle le board admin :
    this.userService.getAdminBoard().subscribe({
      next: data => {
        this.content = data;
        // @ts-ignore
        this.displayContent1 = this.content.substring(0,28);
        // @ts-ignore
        this.displayContent2 = this.content.substring(29,93);
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
    this.getUsers().subscribe({
      next: data => {
        this.users_list = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }




  /******************************* Méthodes *******************************/

  /**
   * Méthode qui renvoie les users.
   */
  public getUsers():Observable<UserGet[]>
  {
    return this.user_manager.getUsers();
  }



  /**
   * Méthode qui supprime les users.
   */
  public deleteUser(id: number)
  {
    this.user_manager.deleteUser(id).subscribe(
      (response) => {
          console.log(response);
          window.location.reload();
      })
  }



  /**
   * Méthode qui ajoute un User.
   * @param user
   */
  public addUser(){
      this.router.navigate(['/admin/add']);
  }




}
