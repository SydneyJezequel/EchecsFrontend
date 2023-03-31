import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import {ModalService} from "../../_services/modal.service";





/**
 * Ce composant gère les modals : Les modals sont les pop-up de l'application.
 */
@Component({
  selector: 'jw-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {





  /******************************* Attributs *******************************/

  @Input() id?: string;
  isOpen = false;
  private element: any;





  /******************************* Constructeur *******************************/

  /**
   * Constructeur
   * @param modalService
   * @param el
   */
  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }





  /******************************* Initialisation de la page *******************************/

  ngOnInit() {
    // add self (this modal instance) to the modal service so it can be opened from any component
    this.modalService.add(this);
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);
    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    });
  }





  /******************************* Méthodes *******************************/

  /**
   * Méthode qui détruit un modal / pop-up.
   */
  ngOnDestroy() {
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }




  /**
   * Méthode qui ouvre un modal / pop-up.
   */
  open() {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
    this.isOpen = true;
  }




  /**
   * Méthode qui ferme un modal / pop-up.
   */
  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.isOpen = false;
  }





}
