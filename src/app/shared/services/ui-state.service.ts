import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ViewMode } from '../models/view-mode';

@Injectable({
  providedIn: 'root'
})
export class UIStateService {

  private readonly COMPACT_SCREEN_THRESHOLD = 800;

  screenSizeChanged$ = new BehaviorSubject<ViewMode>('FULL');

  isSmallScreen(width: number): boolean {
    return width <= this.COMPACT_SCREEN_THRESHOLD;
  }


}
