import {ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tab-content',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabContentComponent implements OnInit {

  @ViewChild(TemplateRef, {static: true}) content: TemplateRef<any>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
