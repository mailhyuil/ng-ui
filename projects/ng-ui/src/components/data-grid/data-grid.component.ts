import { SlicePipe } from "@angular/common";
import {
  Component,
  computed,
  input,
  PipeTransform,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule, PaginatePipeArgs } from "ngx-pagination";
import { InputSearchComponent } from "../input-search/input-search.component";
import { SelectGroupComponent } from "../select-group/select-group.component";
import { SelectItemComponent } from "../select-item/select-item.component";

export type ColumnFilterOption = {
  show?: boolean;
};

export type ColDef = {
  field: string;
  name: string;
  width?: string | number;
  type?: "text" | "date" | "rowNumber";
  pipe?: PipeTransform;
  component?: any;
  filter?: ColumnFilterOption;
  rowClass?: string;
  columnClass?: string;
  rowClickHandler?: (data: any) => void;
  formatter?: (value: any) => any;
};

export type RowOption = {
  name: string | ((row: any) => void);
  icon?: string;
  handler?: (row: any) => void;
};
export type RowType = {
  [key: string]: any;
};

@Component({
  selector: "app-data-grid",
  templateUrl: "./data-grid.component.html",
  styleUrls: ["./data-grid.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    NgxPaginationModule,
    SelectGroupComponent,
    SelectItemComponent,
    InputSearchComponent,
    SlicePipe,
  ],
})
export class DataGridComponent {
  rows = input<RowType[]>([]);
  cols = input<ColDef[]>([]);
  colHeaders = computed(() =>
    this.cols().map((col) => ({ field: col.field, name: col.name })),
  );

  pageSizes = input<string[]>(["10", "20", "50", "100"]);
  pageSize = computed(() => this.pageSizes()[0]);
  pageIndex = signal(1);
  paginateOptions = computed<PaginatePipeArgs>(() => {
    const rows = this.rows();
    return {
      currentPage: this.pageIndex(),
      itemsPerPage: this.pageSize(),
      totalItems: rows.length,
    };
  });
  rowData = computed(() => {
    const rows = this.rows();
    let rowNumber = 1;
    return rows.map((row) => {
      return this.cols().map((col) => {
        if (col.field === "row") {
          return String(rowNumber++);
        }
        let value = row[col.field];

        if (col.formatter) {
          value = col.formatter(value);
        }

        // if (col.type === "date") {
        //   value = dayjs(row[col.field]).format("YYYY-MM-DD");
        // }

        return value;
      });
    });
  });
}
