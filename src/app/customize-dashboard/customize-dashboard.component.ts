import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customize-dashboard',
  templateUrl: './customize-dashboard.component.html',
  styleUrls: ['./customize-dashboard.component.css']
})
export class CustomizeDashboardComponent implements OnInit {
  rows: any;
  cardDrag:any;
  popupIndex:any;
  droppedCards: any[] = [];
  cardData: any[] = [];
  url:any = 'http://localhost:3000/Cardconfiguration';
  url2:any='http://localhost:3000/Dashboardconfiguration';
  sidebarCards:any= [];
  sidebarDashboards:any= [];
  rowdata: any[] = [];
  rowWidth: string='';
  DashboardData:any[]=[];
  cardValueDescription: any;
  cardValue: any;
  card:any;
  isPopupVisible: boolean=false;
  icon:any;
  selectedItem:any;
  partWidth:any;
  showDashboardInterface:boolean=false;
  rowPartWidths: { rowID: string, partWidth: string }[] = [];
  constructor(private http: HttpClient,private toaster:ToastrService) { }

  ngOnInit() {
    this.retrieveCardData();
    this.retrieveDashboardData();
    this.http.get('assets/gridConfiguration.json').subscribe(response => {
      this.rows = response;
      this.rowdata = (response as any).rowdata;
      
    });
  }
  AddDashboard=new FormGroup({
    DashboardID:new FormControl('',Validators.required),
    DashboardDescription:new FormControl('',Validators.required)
  });

  get DashboardID()
  {
    return this.AddDashboard.get('DashboardID');
  }
  get DashboardDescription()
  {
    return this.AddDashboard.get('DashboardDescription');
  }

////cards
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
//dashboards
retrieveDashboardData(): void {
  this.http.get(this.url2).subscribe(
    (response: any) => {
      this.DashboardData = response ? response : [];
      this.populateSidebarDashboards();
    },
    error => {
      console.error('Failed to retrieve card data:', error);
    }
  );
}

populateSidebarDashboards(): void {
  this.DashboardData.forEach((dashboard:any)=>{
    this.sidebarDashboards.push(dashboard);
  });
}



calculatePartWidth(row: any): string {
  const parts = parseInt(row.parts, 10);
  const partWidth = (100 / parts) + '%';
  this.rowPartWidths.push({ rowID: row.rowID, partWidth: partWidth });
  return partWidth;
}
  getParts(row: any): number[] {
    const parts = parseInt(row.parts, 10);
    return Array(parts).fill(0).map((_, index) => index+1 );
  }
  dragStart(item:any)
  {
    this.cardDrag=item;
  }
  onDrop(event: any, row: any, part: number) {
    if (this.cardDrag) {
      const rowPart = this.rowPartWidths.find(rp => rp.rowID === row);
      const partWidth = rowPart?.partWidth;
      const droppedCardIndex = this.droppedCards.findIndex(card => card.row === row && card.part === part);
  
      if (droppedCardIndex !== -1) {
        this.droppedCards[droppedCardIndex] = { ...this.cardDrag, row, part, partWidth };
      } else {
        this.droppedCards.push({ ...this.cardDrag, row, part, partWidth });
      }
  
      this.cardDrag = null;
    }
  }
  
  isCardDropped(row: any, part: number): boolean {
    return this.droppedCards.some(card => card.row === row && card.part === part);
  }
  
  getDroppedCards(row: any, part: number): any[] {
    return this.droppedCards.filter(card => card.row === row && card.part === part);
  }
  submitDashboard() {
    const dashboardID = this.AddDashboard.value.DashboardID;
    const isDuplicateID = this.DashboardData.some(dashboard => dashboard.DashboardID === dashboardID);
  
    if (isDuplicateID) {
      this.toaster.error("Dashboard ID already exists. Please enter a unique ID.");
      return;
    }
    const data = { ...this.AddDashboard.value, droppedCards: this.droppedCards };
  
    this.http.post(this.url2, data).subscribe( response => {
        this.toaster.success("Dashboard added successfully");
      },
      error => {
        console.error("Failed to save dashboard data:", error);
        this.toaster.error("Failed to save dashboard data");
      }
    );
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

  showInterface(item:any)
  {
     this.selectedItem=item;
     this.showDashboardInterface=true;
  }
  rowExist(row: any): boolean {
    const cards = this.selectedItem.droppedCards;
    return cards.some((card: any) => card.row === row.rowID);
  }

    partExist(row: any, part: any): boolean {
      const cards = this.selectedItem.droppedCards;
      const matchingCard = cards.find((card: any) => card.row === row.rowID && card.part === part);
      
      if (matchingCard && matchingCard.partWidth) {
        this.partWidth = matchingCard.partWidth;
        return true;
      }
      
      return false;
    }
}