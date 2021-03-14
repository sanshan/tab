import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import {TabComponent} from './tab.component';
import {Observable} from 'rxjs';
import {TabsService, View} from '../service/tabs.service';


@Component({
  selector: 'app-tabs',
  template: `
    <ng-container *ngIf="(model$ | async) as view">
      <div class="tabs__titles">
        <div class="tabs__title"
             [ngClass]="{'tabs__title--active': i === view.index}"
             *ngFor="let tab of view.tabs; index as i"
             (click)="click(i)"
        >
          <ng-container *ngTemplateOutlet="tab.title"></ng-container>
        </div>
      </div>

      <div class="tabs__content">
        <ng-container *ngTemplateOutlet="view.content"></ng-container>
      </div>
    </ng-container>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterViewInit {
  @ContentChildren(TabComponent, {emitDistinctChangesOnly: true}) tabList: QueryList<TabComponent>;
  model$: Observable<View> | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    private srv: TabsService
  ) {
  }

  ngAfterViewInit(): void {
    this.model$ = this.srv.model(this.tabList);

    this.cdr.detectChanges();
  }

  click(index: number): void {
    this.srv.setCurrentIndex(index);
  }

}
