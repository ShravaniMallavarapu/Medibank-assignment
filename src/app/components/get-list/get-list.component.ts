import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.css']
})
export class GetListComponent implements OnInit {
  totalList: any[]
  petsList: any[]
  catsList: any[] = []
  maleCatsList: any[] = []
  femaleCatsList: any[] = []
  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json')
      .subscribe((response: any) => {
        this.totalList = response.json()
        this.petsList = this.totalList.filter(list => list.pets && list.pets.length > 0)
       
        this.petsList.map(list => {
           list.pets.map((pet: any) => {
            if (pet.type.toLowerCase() === 'cat' && !this.catsList.includes(list)) {
              if(list.gender.toLowerCase() === 'male') {
                this.maleCatsList.push(pet.name) // To  get male owner cats list
              } else {
                this.femaleCatsList.push(pet.name) // To  get female owner cats list
              }
              this.catsList.push(list) //Get the array of having only cats of both male and female (may be useful for any further requirement)
             }
           })
        })
        this.maleCatsList.sort(function(x,y) {
          if (x.name < y.name) return -1;
          if (x.name > y.name) return 1;
          return 0;
        })
        this.femaleCatsList.sort(function(x,y) { //Sorting alphabetically
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;
        })
       
      });
  }

}
