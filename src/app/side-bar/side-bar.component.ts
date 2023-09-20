import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  sidebarCards:any= [];
  popupIndex:any;
  sidebarVisible = false;
  showOptions = false;
  showForm = false;
  cardValueDescription:any;
  cardValue:any;
  icon:any;
  isPopupVisible = false;
  cardData: any[] = [];
   url:any = 'http://localhost:3000/Cardconfiguration';
  menuItems = ['Normal Card', 'Graphical Card'];
 
  constructor( private http: HttpClient,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.retrieveCardData();
  }
  isSideBarPath(): boolean {
    return this.route.snapshot.url[0].path === 'side-bar';
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  retrieveCardData(): void {
    this.http.get(this.url).subscribe(
      (response: any) => {
        this.cardData = response ? response : [];
        this.populateSidebarCards();
      },
      error => {
        console.error('Failed to retrieve card data:', error);
      }
    );
  }

  populateSidebarCards(): void {
    this.cardData.forEach((card:any)=>{
      this.sidebarCards.push(card)
    });
  }
  showDetails(item: any,index:number) {
    this.icon=item.icon;
    this.http.get(`/${item.url}`).subscribe(
      (data: any) => {
        console.log('Response data:', data);
        this.cardValueDescription=data.valueDescription;
        this.cardValue=data.value;
      }
    );
   
    this.popupIndex = index;
    this.isPopupVisible = true;
  }
  

  hideDetails() {
    this.isPopupVisible = false;
  }
}
