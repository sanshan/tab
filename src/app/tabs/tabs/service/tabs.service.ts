import {Injectable, QueryList, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {TabComponent} from '../ui/tab.component';
import {map, startWith} from 'rxjs/operators';
import {Tab} from '../model/tabs';


@Injectable()
export class TabsService {

  tabsFromQueryList(list: QueryList<TabComponent>): Observable<Tab[]> {
    return list.changes.pipe(
      startWith(list),
      map((l) => l.toArray()),
    );
  }

  select(tab: Tab): TemplateRef<any> {
    return tab.template;
  }
}

