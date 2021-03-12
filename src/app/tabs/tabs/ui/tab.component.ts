import {AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, TemplateRef} from '@angular/core';
import {TabTitleComponent} from './tab-title.component';
import {TabContentComponent} from './tab-content.component';

@Component({
  selector: 'app-tab',
  template: `
    <ng-content select="app-tab-title"></ng-content>
    <ng-content select="app-tab-content"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements AfterViewInit {
  @ContentChild(TabTitleComponent, {static: false}) title: TabTitleComponent;
  @ContentChild(TabContentComponent, {static: false}) content: TabContentComponent;

  ngAfterViewInit(): void {
    console.log('TabComponent', this.title);
  }


}
