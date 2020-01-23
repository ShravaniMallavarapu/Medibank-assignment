import { Component, OnInit } from '@angular/core'
import {Http} from '@angular/http'

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
  transGenderCatsList: any
  constructor(private http: Http) { }

  ngOnInit() {
    try{
       this.http.get('https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json')
        .subscribe((response: any) => {
          this.totalList = response.json()
          this.petsList = this.totalList.filter(list => list.pets && list.pets.length > 0)
        
          this.petsList.map(list => {
            list.pets.map((pet: any) => {
              if (pet.type.toLowerCase() === 'cat') {
                if(list.gender.toLowerCase() === 'male') {
                  this.maleCatsList.push(pet.name) // To  get male cats list
                } else if(list.gender.toLowerCase() === 'female') {
                  this.femaleCatsList.push(pet.name) // To  get female cats list
                } else {
                  this.transGenderCatsList = 'transgender'
                }
                this.catsList.push(list) //Get the array of having only cats of both male and female (may be useful for any further requirement)
              }
            })
          })
          this.maleCatsList.sort(function(cat1,cat2) { //Sorting alphabetically
            if (cat1 < cat2) return -1;
            if (cat1 > cat2) return 1;
            return 0;
          })
          this.femaleCatsList.sort(function(cat1,cat2) { //Sorting alphabetically
            if (cat1 < cat2) return -1;
            if (cat1 > cat2) return 1;
            return 0;
          })
      }, error => {
        console.log(error)
      })
    } catch(error) {
      console.log(error)
    }
  }

}
