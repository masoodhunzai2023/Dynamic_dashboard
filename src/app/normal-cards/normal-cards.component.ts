import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-normal-cards',
  templateUrl: './normal-cards.component.html',
  styleUrls: ['./normal-cards.component.css']
})
export class NormalCardsComponent implements OnInit {

  cardData: any= [];
  record: any= [];
  duplicate:any=false;
  iconOptions = [
    {label:'Select an icon'},
    { label: ' User ', value: 'pi-user' },
    { label: ' Camera ', value: 'pi-camera' },
    { label: ' Calendar ', value: 'pi-calendar' },
    { label: ' SMS ', value: 'pi-envelope' }
    ];

  showOptions = false;
  showForm = false;
  url1:any = 'http://localhost:3000/Cardconfiguration';
  menuItems = ['Normal Card', 'Graphical Card'];

   constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
  }
  
  toggleOptions() {
    this.showOptions = !this.showOptions;
    this.showForm=false;
  }

  handleOptionClick(event: any) {
    const selectedOption = event.target.textContent;
    if (selectedOption === 'Normal Card') {
      this.showForm = true;
      this.AddCard.reset();
      this.showOptions=false;
    } else {
      this.showForm = false;
    }
  } 
  AddCard = new FormGroup({
    id: new FormControl('',Validators.required),
    cardDescription: new FormControl('',Validators.required),
    url:new FormControl('',Validators.required),
    icon:new FormControl('',Validators.required)
  });
  get id()
  {
    return this.AddCard.get('id');
  }
  get cardDescription()
  {
    return this.AddCard.get('cardDescription');
  }
  get url()
  {
    return this.AddCard.get('url');
  }
  get icon()
  {
    return this.AddCard.get('icon');
  }
 getCardData()
 {
  return this.http.get('assets/cardData.json');
 }
  submitCard(): void {
    this.http.post(this.url1, this.AddCard.value).subscribe(
      response => {
        this.toastr.success('Success', 'Card Added!');
        
      },
    );
    this.AddCard.reset();
    
}
duplicateID($event:any)
{
const id=$event?.target.value;
this.http.get(this.url1).subscribe((response:any)=>{
  this.record = response && Array.isArray(response) ? response : [];
  this.record.forEach((rec:any)=>{
      if(rec.id==id)
      {
        this.duplicate=true;
        return;
      }
  });
})
this.duplicate=false;
}


}
