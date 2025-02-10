import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { mergeMap, Observable, of, timer } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data["preload"]) {
      const delay: number = route.data["delay"];
      return timer(delay).pipe(
        mergeMap(() => {
          return load();
        }),
      );
    } else {
      return of(null);
    }
  }
}
