import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import {TabComponent} from './tab.component';
import {Observable} from 'rxjs';
import {TabsService} from '../service/tabs.service';
import {Tab} from '../model/tabs';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-tabs',
  template: `
    <ng-container *ngIf="(tabs$ | async) as tabs">

      <div class="tabs__titles">
        <div class="tabs__title"
             *ngFor="let tab of tabs; index as i"
             [ngClass]="{'tabs__title--active': i === contentIndex}"
             (click)="click(i)"
        >
          <ng-container *ngTemplateOutlet="tab.title"></ng-container>
        </div>
      </div>

      <div *ngIf="tabs[contentIndex] as current" class="tabs__content">
        <ng-container *ngTemplateOutlet="current.template; context: {tab: current.value}"></ng-container>
      </div>

    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent, {emitDistinctChangesOnly: true}) tabList: QueryList<TabComponent>;
  tabs$: Observable<Tab[]> | undefined;
  contentIndex = 0;

  constructor(private srv: TabsService) {
  }

  ngAfterContentInit(): void {
    this.tabs$ = this.srv.tabsFromQueryList(this.tabList).pipe(
      tap(this.resetSelected)
    );
  }

  click(index: number): void {
    this.contentIndex = index;
  }

  private resetSelected = (tabs: Tab[]): void => {
    if (tabs.length <= this.contentIndex) {
      this.contentIndex = 0;
    }
  }

}
