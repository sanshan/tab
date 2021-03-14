import {TemplateRef} from '@angular/core';

export interface Tab {
  title: TemplateRef<any>;
  template: TemplateRef<any>;
  value: unknown;
}
