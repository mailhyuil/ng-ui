import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'mh-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  standalone: true,
  imports: [NgOptimizedImage],
})
export class ImageComponent {
  src = input<string | undefined>('');
  alt = input<string | undefined>('');
}
