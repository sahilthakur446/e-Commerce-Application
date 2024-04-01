import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-response-modal',
  template: `
    <div class="fixed w-full z-50 bg-white p-4 rounded-lg flex justify-center ease-in-out duration-500"
         [ngClass]="{'-top-full': !show, 'top-0': show}">
      <h1 [ngClass]="responseClass">{{ message }}</h1>
    </div>
  `
})
export class ResponseModalComponent {
  @Input() show:boolean = false;
  @Input() responseClass:string = ''
  @Input() message:string =''
}
