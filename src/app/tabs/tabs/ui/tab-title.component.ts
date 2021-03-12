import {ChangeDetectionStrategy, Component, ContentChild, TemplateRef} from '@angular/core';


@Component({
  selector: 'app-tab-title',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabTitleComponent {
  @ContentChild(TemplateRef, {static: false}) content: TemplateRef<any>;
}
