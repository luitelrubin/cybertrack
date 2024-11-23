import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective
} from '@coreui/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselCaptionComponent, CarouselControlComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      id: 0,
      src: './assets/image1.jpg',
      title: 'First slide',
      subtitle: 'this is the first image'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/image2.jpg',
      title: 'Second slide',
      subtitle: 'this is the second image'
    };
    this.slides[2] = {
      id: 2,
      src: './assets/image3.jpg',
      title: 'Third slide',
      subtitle: 'this is the third image'
    };
    this.slides[3] = {
      id: 3,
      src: './assets/image4.jpg',
      title: 'Fourth slide',
      subtitle: 'this is the fourth image'
    };
    
  }
}
