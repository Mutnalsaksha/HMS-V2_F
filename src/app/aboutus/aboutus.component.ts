import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  showFullContent=false;
  toggleContent(){
    this.showFullContent=!this.showFullContent;
  }
}
