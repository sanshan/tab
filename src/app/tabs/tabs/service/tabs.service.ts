import {Injectable, QueryList, TemplateRef} from '@angular/core';
import {BehaviorSubject, combineLatest, from, Observable} from 'rxjs';
import {TabComponent} from '../ui/tab.component';
import {map, startWith, switchMap, toArray} from 'rxjs/operators';


@Injectable()
export class TabsService {
  private _currentIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentIndex$: Observable<number> = this._currentIndexSubject.asObservable();

  getTitles(list: QueryList<TabComponent>): Observable<TemplateRef<any>[]> {
    return list.changes.pipe(
      startWith(list),
      switchMap((tabList: QueryList<TabComponent>) => from(tabList.toArray()).pipe(
        map((tab) => tab.title),
        toArray()
      )),
    );
  }

  setCurrentIndex(index: number): void {
    this._currentIndexSubject.next(index);
  }

  getContent(tabList: QueryList<TabComponent>): Observable<TemplateRef<any> | undefined> {
    return combineLatest([
      this.currentIndex$,
      tabList.changes.pipe(startWith(tabList))
    ]).pipe(
      map(([index, list]) => list.get(index)?.content ?? list.get(0)?.content)
    );
  }
}

