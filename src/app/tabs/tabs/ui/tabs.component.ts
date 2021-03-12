import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList, TemplateRef,
} from '@angular/core';
import {TabComponent} from './tab.component';


@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs__titles">
      <div class="tabs__title"
           *ngFor="let tab of tabs; index as i"
           (click)="click(i)"
      >
        <ng-container *ngTemplateOutlet="tab"></ng-container>
      </div>

      <ng-container *ngTemplateOutlet="content"></ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterViewInit {
  @ContentChildren(TabComponent, {emitDistinctChangesOnly: true}) tabList: QueryList<TabComponent>;
  tabs: TemplateRef<any>[] = [];
  content: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.initTabs(this.tabList);
    this.content = this.tabList.get(0)?.content;
    this.tabList.changes.subscribe(this.initTabs);
  }

  initTabs = (list: QueryList<TabComponent>): void => {
    this.tabs = list.map((tab) => tab.title);

    this.cdr.detectChanges();
  };

  click(i: number): void {
    console.log('click', i);
    this.content = this.tabList.get(i)?.content;
    this.cdr.detectChanges();
  }
}
