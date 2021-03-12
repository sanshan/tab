import {ChangeDetectionStrategy, Component, ContentChild, TemplateRef} from '@angular/core';


@Component({
  selector: 'app-tab-content',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabContentComponent {
  @ContentChild(TemplateRef, {static: false}) content: TemplateRef<any>;
}
