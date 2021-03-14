import {Injectable, QueryList, TemplateRef} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {TabComponent} from '../ui/tab.component';
import {map, startWith} from 'rxjs/operators';

export interface Tab {
  title: TemplateRef<any>;
  content: TemplateRef<any>;
}

export interface View {
  tabs: Tab[];
  content: TemplateRef<any>;
  index: number;
}

@Injectable()
export class TabsService {
  private _currentIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentIndex$: Observable<number> = this._currentIndexSubject.asObservable();

  setCurrentIndex(index: number): void {
    this._currentIndexSubject.next(index);
  }

  model(tabList: QueryList<TabComponent>): Observable<View> {
    return combineLatest([
      this.currentIndex$,
      tabList.changes.pipe(startWith(tabList))
    ]).pipe(
      map(([index, list]: [number, QueryList<TabComponent>]) => ({
        tabs: list.toArray(),
        content: list.get(index)?.content ?? list.get(0)?.content,
        index: list.length <= index ? 0 : index
      }))
    );
  }
}

