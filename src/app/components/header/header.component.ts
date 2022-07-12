import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { availableLanguages } from 'src/app/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

languages:string[] = [];
actualUrl:string = '';
  constructor(public translate:TranslateService, private router: Router, private activatedRoute: ActivatedRoute) {
    translate.setDefaultLang('en');
         // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use(navigator.language.split('-')[0].toLocaleLowerCase() ?? 'en');
      this.languages = availableLanguages;
   }

  ngOnInit(): void {
  //   this.activatedRoute.fragment.subscribe((fragment: any) => {
  //     this.actualUrl = fragment
  //     console.log(fragment)
  // });
  }
  // ngAfterViewInit(){
  //   this.activatedRoute.url.subscribe((fragment: any) => {
  //     this.actualUrl = fragment
  //     console.log(fragment)
  // });
  // }
  changeLanguage(lan:string){
    this.translate.use(lan)
  }

}
