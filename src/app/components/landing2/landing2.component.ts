import { AfterViewInit, Component, NgZone  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {DomSanitizer} from '@angular/platform-browser';
import PlayerApi from 'ibm-video-streaming-web-player-api';
@Component({
  selector: 'app-root',
  templateUrl: './landing2.component.html',
  styleUrls: ['./landing2.component.scss']
})
export class Landing2Component implements AfterViewInit {
  player:any|undefined;
  origin:string = window.location.origin
  isLive:boolean = false;
  constructor(public zone: NgZone, public translate:TranslateService, public sanitazer: DomSanitizer){
  }




  scrollTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  title = 'iveco-landing';
  toggleLive(){
    this.isLive = !this.isLive;
  }
  showCookie(){
    
  }
  ngAfterViewInit(){

    var ivecoLiveFrame = document.getElementById("24112144");
    if (!ivecoLiveFrame) { 
      this.isLive = false;  
      return; 
    }
    this.player = PlayerApi('24112144');
    this.player.callMethod('volume', 50);
    this.player.callMethod('webkitEnterFullscreen');
    this.player.addListener('live', (live:string) =>{
      this.isLive = true;
    } );
    this.player.addListener('offline', (live:string) => {
      this.zone.run(() => this.isLive = false)
    });
  }
  programData:any[] = [
    {
      id:"primo",
      idHeading:'primoHeading',
      time: [true, false],
      speakersData: [
        {
          keynoteSpeechs: [
            '../../../assets/images/guido-saracco.png',
            '../../../assets/images/anthea-greco.jpg',
            '../../../assets/images/bernardo-bertoldi.png',
            '../../../assets/images/massimo-cavazzini.jpg'
          ],
          duets: [
            {
              img1: '../../../assets/images/luca-sra.png',
              img2: '../../../assets/images/giulia-genuardi.jpg'
            },
            {
              img1: '../../../assets/images/domenico-nucera.png',
              img2: '../../../assets/images/mohamed-mezghani.jpg'
            },
            {
              img1: '../../../assets/images/simone-olivati.png',
              img2: '../../../assets/images/nothacker-david.jpg'
            },
            {
              img1: '../../../assets/images/annalisa-stupenengo.png',
              img2: '../../../assets/images/david-avino.jpg'
            }
          ]
        }
      ]
    },
    {
      id:"secondo",
      idHeading:'secondoHeading',
      time: [false],
      speakersData: [
        {
          keynoteSpeechs: [
            '../../../assets/images/guido-saracco.png',
            '../../../assets/images/anthea-greco.jpg',
            '../../../assets/images/bernardo-bertoldi.png'
          ],
          roundtables: [new Array(5), new Array(7)]
        }
      ]
    },
    {
      id:"terzo",
      idHeading:'terzoHeading',
      time: [true, true, true, false],
      speakersData: [
        {
          keynoteSpeechs: [
            '../../../assets/images/guido-saracco.png'
          ],
          roundtables: [new Array(5),new Array(6),new Array(5), new Array(6), new Array(6)],
          duets: [
            {
              img1: '../../../assets/images/luca-sra.png',
              img2: '../../../assets/images/giulia-genuardi.jpg'
            }
          ]
        }
      ]
    }
  ]

}
