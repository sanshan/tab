import {ChangeDetectionStrategy, Component, TemplateRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-tab',
  template: `
    <ng-template #titleRef>
      <ng-content select="app-tab-title"></ng-content>
    </ng-template>
    <ng-template #contentRef>
      <ng-content select="app-tab-content"></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  @ViewChild('titleRef', {static: true}) title: TemplateRef<any>;
  @ViewChild('contentRef', {static: true}) content: TemplateRef<any>;
}
