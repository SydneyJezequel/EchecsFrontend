import { Component, OnInit } from '@angular/core';
import {User} from "../../../_model/User";
import {Role} from "../../../_model/Role";
import {ActivatedRoute} from "@angular/router";
import {UsersManagementService} from "../../../_services/users-management.service";
import {RolesManagementService} from "../../../_services/roles-management.service";
import { Router } from '@angular/router';
import {ModalService} from "../../../_services/modal.service";





/**
 * Ce composant gère l'ajout des Utilisateurs sur cette application.
 * Il est utilisé par le board Admin.
 */
@Component({
  selector: 'app-user-add-component',
  templateUrl: './user-add-component.component.html',
  styleUrls: ['./user-add-component.component.scss']
})
export class UserAddComponent implements OnInit {





  /******************************* Attributs *******************************/

  user = new User();
  roles?: Role[];
  role!: Role;
  AllRoles?: Role[];
  NewRoles: Role[]=[];
  chosenObj?: Role;





  /******************************* Constructeur *******************************/

  /**
   * Constructeur
   * @param route
   * @param usersManagementService
   * @param user_manager
   */
  constructor(private route:ActivatedRoute,
              usersManagementService:UsersManagementService,
              private user_manager: UsersManagementService,
              private role_service: RolesManagementService,
              private router:Router,
              private modalService:ModalService) { }





  /******************************* Initialisation de la page *******************************/

  ngOnInit(): void {
    this.role_service.getAllRoles().subscribe(
      (response:Role[]) =>
      {
        this.AllRoles = response;
      })
    this.role;
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode pour ajouter un User.
   */
  public addUser(){
    this.user;
    this.user_manager.addUser(this.user).subscribe(
      (response)=>  {}
    );
    this.modalService.open('modal-1');
  }




  /**
   * Méthode pour ajouter un Rôle à un user.
   * @param : user auquel le rôle est ajouté.
   */
  public AddRole(user : User)
  {
    if (this.chosenObj == null) {
      this.modalService.open('modal-3');
    } else {
      this.NewRoles?.push(this.chosenObj);
      user.roles = this.NewRoles;
    }
  }




  /**
   * Méthode pour supprimer un rôle.
   * @Param : role.
   */
  public DeleteRole(role:Role)
  {
    let index = this.user.roles.indexOf(this.role);
    this.user.roles.splice(index,1);
  }




  /**
   * Méthode pour retourner au Board Admin
   */
  gotoBoardAdmin() {
    this.router.navigate(['/admin']);
  }





}
