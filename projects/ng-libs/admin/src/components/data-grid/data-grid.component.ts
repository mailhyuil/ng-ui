import { CdkContextMenuTrigger, CdkMenu, CdkMenuItem } from '@angular/cdk/menu';
import { type ComponentType } from '@angular/cdk/portal';
import {
  Component,
  computed,
  ElementRef,
  input,
  model,
  signal,
  viewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule, PaginatePipeArgs } from 'ngx-pagination';
import { Color } from '../../types/color.type';
import { BadgeComponent } from '../badge/badge.component';
import { InputSearchComponent } from '../input-search/input-search.component';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { SelectItemComponent } from '../select-item/select-item.component';

export interface BaseDataGridCol<T> {
  label: string;
  width?: string | number;
  clickHandler?: (data: T) => void;
}
export interface RowNumberDataGridCol<T> extends BaseDataGridCol<T> {
  type: 'rowNumber';
}
export interface TextDataGridCol<T> extends BaseDataGridCol<T> {
  type: 'text';
  field: string;
  formatter?: (value: string) => unknown;
}
export interface NumberDataGridCol<T> extends BaseDataGridCol<T> {
  type: 'number';
  field: string;
  formatter?: (value: number) => unknown;
}
export interface DateDataGridCol<T> extends BaseDataGridCol<T> {
  type: 'date';
  field: string;
  formatter?: (value: Date) => unknown;
}
export interface ComponentDataGridCol<T> extends BaseDataGridCol<T> {
  type: 'component';
  field: string;
  component: ComponentType<unknown>;
  inputHandler: (row: T) => Record<string, string> | undefined;
}
export interface EnumDataGridCol<T> extends BaseDataGridCol<T> {
  type: 'enum';
  field: string;
  enumMap: Record<string, string>;
  enumColorMap?: Record<string, Color>;
}
export type DataGridCol<T = unknown> =
  | TextDataGridCol<T>
  | NumberDataGridCol<T>
  | DateDataGridCol<T>
  | ComponentDataGridCol<T>
  | EnumDataGridCol<T>
  | RowNumberDataGridCol<T>;
export interface DataGridOptions<T = unknown> {
  name?: string;
  icon?: string;
  clickHandler?: (row: T) => void;
  contextMenus?: DataGridOptions<T>[];
}
export interface DataGridColFilterOptions {
  show?: boolean;
}

@Component({
  selector: 'mh-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NgxPaginationModule,
    SelectGroupComponent,
    SelectItemComponent,
    InputSearchComponent,
    CdkContextMenuTrigger,
    CdkMenu,
    CdkMenuItem,
  ],
})
export class DataGridComponent {
  rows = model<any[]>([]);
  cols = input<DataGridCol[]>([]);
  options = input<DataGridOptions>();
  pageSizes = input<string[]>(['10', '20', '50', '100']);
  pageSize = model(this.pageSizes()[0]);
  pageIndex = signal(1);
  paginateOptions = computed<PaginatePipeArgs>(() => {
    const rows = this.rows();
    return {
      currentPage: this.pageIndex(),
      itemsPerPage: this.pageSize(),
      totalItems: rows.length,
    };
  });
  templates = viewChildren('comp', {
    read: ViewContainerRef,
  });
  rowValues = computed(() => {
    const rows = this.rows();
    let rowNumber = 1;
    let componentCount = 0;
    this.templates().forEach((template) => {
      template.clear();
    });
    return rows.map((row) => {
      const cols = this.cols();
      return cols.map((col) => {
        if (col.type === 'rowNumber') {
          return String(rowNumber++);
        }

        let value = row[col.field];

        if (col.type === 'enum') {
          const component = this.templates()
            .at(componentCount++)
            ?.createComponent(BadgeComponent);
          if (!component) return;
          component.setInput('value', col.enumMap[value]);
          component.setInput('color', col.enumColorMap?.[value] || 'primary');
          return;
        }
        if (col.type === 'component') {
          const comp = col.component;
          const component = this.templates()
            .at(componentCount++)
            ?.createComponent(comp);
          if (!component) return;
          const input = col.inputHandler(row);
          if (!input) return;
          Object.entries(input).forEach(([key, value]) => {
            component.setInput(key, value);
          });
          return;
        }
        if (col.type === 'text') {
          if (col.formatter) {
            value = col.formatter(value);
            return value;
          }
          value = value.slice(0, 25);
          if (value.length > 25) {
            value += '...';
          }
          return value;
        }
        if (col.type === 'number') {
          if (col.formatter) {
            value = col.formatter(value);
            return value;
          }
          value = value.toLocaleString();
          return value;
        }

        if (col.type === 'date') {
          if (col.formatter) {
            value = col.formatter(value);
            return value;
          }
          const date = new Date(value);
          const year = date.getFullYear();
          const month =
            date.getMonth() + 1 < 10
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1;
          const day =
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
          return `${year}-${month}-${day}`;
        }
      });
    });
  });

  handleClick(index: number) {
    const options = this.options();
    if (!options) return;
    if (options.clickHandler) {
      options.clickHandler(this.rows().at(Number(index)));
    }
  }

  sort(field: string, command: string) {
    const sorted = this.rows().sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      if (command === 'asc') {
        if (aValue > bValue) {
          return 1;
        }
        if (aValue < bValue) {
          return -1;
        }
      }
      if (command === 'desc') {
        if (aValue < bValue) {
          return 1;
        }
        if (aValue > bValue) {
          return -1;
        }
      }
      return 0;
    });
    this.rows.update(() => [...sorted]);
  }
  //search
  query = signal('');
  rowElements = viewChildren<ElementRef<HTMLElement>>('rowEle');
  search() {
    const query = this.query();
    const filteredIndice = this.rowValues().map((row, index) => {
      return row.some((col) => {
        if (!col) return false;
        return col.toString().includes(query);
      })
        ? index
        : -1;
    });
    const rowElements = this.rowElements();
    rowElements.forEach((row, index) => {
      const ele = row.nativeElement;
      const display = filteredIndice.at(index) === -1 ? 'none' : 'flex';
      console.log(display);
      ele.style.display = display;
    });
  }
}
