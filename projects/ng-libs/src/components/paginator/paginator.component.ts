import { Component, computed, model, signal } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/value-accessor.directive';

export type PageInfo = {
  pageIndex: number;
  pageSize: number;
  itemsOnPageCount: number;
  totalPageCount: number;
  totalItemsCount: number;
};

@Component({
  selector: 'mh-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  hostDirectives: [ValueAccessorDirective],
})
export class PaginatorComponent {
  value = signal<number>(1);

  pageInfo = model<PageInfo | undefined>(undefined);

  pageIndex = computed(() => this.pageInfo()?.pageIndex ?? 1);
  totalPageCount = computed(() => this.pageInfo()?.totalPageCount);
  canGoPrev = computed(() => this.pageIndex() > 1);
  canGoNext = computed(() => {
    const totalPageCount = this.totalPageCount();
    if (!totalPageCount) return false;
    return this.pageIndex() < totalPageCount;
  });
  pages = computed<number[]>(() => {
    const totalPageCount = this.totalPageCount() || 0;
    const pageIndex = this.pageIndex() || 1;
    const pages = [];

    if (totalPageCount <= 5) {
      for (let i = 1; i <= totalPageCount; i++) {
        pages.push(i);
      }
    } else {
      if (pageIndex <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (pageIndex >= totalPageCount - 2) {
        for (let i = totalPageCount - 4; i <= totalPageCount; i++) {
          pages.push(i);
        }
      } else {
        for (let i = pageIndex - 2; i <= pageIndex + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  });

  constructor(public valueAccessor: ValueAccessorDirective<number>) {
    valueAccessor.value.subscribe((v) => {
      this.value.set(v);
    });
  }

  go(page: number) {
    if (page === this.pageIndex()) return;
    this.value.set(page);
    this.valueAccessor.writeValue(page);
    this.valueAccessor.valueChange(page);
  }

  goPrev() {
    const pageIndex = this.pageIndex();
    if (pageIndex > 1) {
      this.go(pageIndex - 1);
    }
  }

  goNext() {
    const pageIndex = this.pageIndex();
    const totalPageCount = this.totalPageCount();
    if (totalPageCount && pageIndex < totalPageCount) {
      this.go(pageIndex + 1);
    }
  }
}
