import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
isModelOpen:boolean = false
isModelOpenn:boolean = false

openModal(){
  this.isModelOpenn = true;
}
closeModal(){
  this.isModelOpenn = false;
}
}
