import {ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-tab',
  template: `
    <ng-template #titleRef>
      <ng-content select="app-tab-title"></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  @ViewChild('titleRef', {static: true}) title: TemplateRef<any>;
  @Input() template: TemplateRef<any> = null;
  @Input() value: unknown = null;
}
