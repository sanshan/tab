import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './ui/tabs.component';
import {TabComponent} from './ui/tab.component';
import {TabTitleComponent} from './ui/tab-title.component';
import {TabContentComponent} from './ui/tab-content.component';
import {TabsService} from './service/tabs.service';


@NgModule({
  declarations: [TabsComponent, TabComponent, TabTitleComponent, TabContentComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TabsComponent, TabComponent, TabTitleComponent, TabContentComponent
  ],
  providers: [TabsService]
})
export class TabsModule {
}
