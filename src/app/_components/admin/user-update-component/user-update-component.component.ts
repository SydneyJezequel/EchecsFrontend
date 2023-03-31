import { Component, OnInit } from '@angular/core';
import {UsersManagementService} from "../../../_services/users-management.service";
import {User} from "../../../_model/User";
import {ActivatedRoute} from "@angular/router";
import {Role} from "../../../_model/Role";
import {RolesManagementService} from "../../../_services/roles-management.service";
import {UserGet} from "../../../_model/UserGets";
import { Router } from '@angular/router';
import {ModalService} from "../../../_services/modal.service";





/**
 * Ce composant gère la modification des Utilisateurs sur cette application.
 * Il est utilisé par le board Admin.
 */
@Component({
  selector: 'app-user-update-component',
  templateUrl: './user-update-component.component.html',
  styleUrls: ['./user-update-component.component.scss']
})
export class UserUpdateComponent implements OnInit {





  /******************************* Attributs *******************************/

  user = new UserGet();
  roles?: Role[];
  role!: Role;
  AllRoles?: Role[];
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
    let id = this.route.snapshot.paramMap.get('id');
    let idNumber = id as unknown as number;
    this.user_manager.getUser(idNumber).subscribe(
      (response:UserGet) =>
      {
        this.user = response;
        this.roles = this.user.roles;
      })
    this.role_service.getAllRoles().subscribe(
      (response:Role[]) =>
      {
        this.AllRoles = response;
      })
    this.role;
  }





  /******************************* Méthodes *******************************/

  public trackByFn(index: any, item: any) {
    return index;
  }




  /**
   * Méthode pour modifier un User.
   * @param user correspond au nouveau user.
   * @param id du user modifié
   */
  public editUser(id:number, user: User){
    this.user_manager.editUser(id, user).subscribe(
      (response)=>
      {

      }
    );
    this.modalService.open('modal-2')
  }




  /**
   * Méthode pour ajouter un Rôle.
   */
  public AddRole()
    {
      console.log(this.chosenObj);
      if (this.chosenObj == null) {
        this.modalService.open('modal-3');
      } else {
        if(this.user.roles.find(item => item.name === this.chosenObj?.name))
        {
          this.modalService.open('modal-4');
        } else
        {
          this.user.roles.push(this.chosenObj);
        }
    }
  }




  /**
   * Méthode pour supprimer un Rôle.
   * @param item de type Role.
   */
  public DeleteRole(item: Role)
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
