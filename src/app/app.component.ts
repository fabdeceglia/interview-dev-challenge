import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ViewMode } from './shared/models/view-mode';
import { UIStateService } from './shared/services/ui-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  // @ts-ignore
  resizeObserver: ResizeObserver;
  private viewMode: ViewMode = 'FULL'

  // @ts-ignore
  @ViewChild('mainContainer') mainContainer: ElementRef;

  constructor(
    private readonly uiBreakpointService: UIStateService
  ) {
  }

  ngAfterViewInit(): void {
    this.observePageResize();
  }

  private observePageResize(): void {
    this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        const entry = entries[0];
        const borderBoxSize = entry.borderBoxSize[0];
        const containerWidth = borderBoxSize.inlineSize;
        this.setViewMode(containerWidth);
      }
    );
    this.resizeObserver.observe(this.mainContainer.nativeElement);
  }

  private setViewMode(width: number): void {
    if (this.uiBreakpointService.isSmallScreen(width)) {
      this.viewMode = 'COMPACT'
    } else {
      this.viewMode = 'FULL';
    }
    this.uiBreakpointService.screenSizeChanged$.next(this.viewMode);
  }

}
