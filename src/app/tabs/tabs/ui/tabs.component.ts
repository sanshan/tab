import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList, TemplateRef,
} from '@angular/core';
import {TabComponent} from './tab.component';
import {Observable} from 'rxjs';
import {TabsService} from '../service/tabs.service';


@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs__titles">
      <div class="tabs__title"
           *ngFor="let titleRef of titles$ | async; index as i"
           (click)="click(i)"
      >
        <ng-container *ngTemplateOutlet="titleRef"></ng-container>
      </div>
    </div>

    <ng-container *ngTemplateOutlet="content$ | async"></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterViewInit {
  @ContentChildren(TabComponent, {emitDistinctChangesOnly: true}) tabList: QueryList<TabComponent>;
  titles$: Observable<TemplateRef<any>[]>;
  content$: Observable<TemplateRef<any>>;

  constructor(
    private cdr: ChangeDetectorRef,
    private srv: TabsService
  ) {
  }

  ngAfterViewInit(): void {
    this.titles$ = this.srv.getTitles(this.tabList);
    this.content$ = this.srv.getContent(this.tabList);

    this.cdr.detectChanges();
  }

  click(index: number): void {
    this.srv.setCurrentIndex(index);
  }

}
