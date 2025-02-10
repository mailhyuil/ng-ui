import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
  RouterStateSnapshot,
} from "@angular/router";

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // route가 화면에서 사라질 때 해당 route를 저장할지 여부를 결정
    // detach가 true이면 store 메서드가 호출됨
    return !!route.data["reuse"];
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null) {
    if (handle) {
      // detach 시 호출 route url을 key로 하여 저장
      this.storedRoutes.set(this.getRouteUrl(route), handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return (
      // route를 화면에 다시 그릴 때 저장된 route를 사용할지 여부를 결정
      !!route.data["reuse"] && !!this.storedRoutes.get(this.getRouteUrl(route))
    );
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // shouldAttach가 true이면 호출
    // 저장된 route를 반환
    return this.storedRoutes.get(this.getRouteUrl(route)) || null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ): boolean {
    // route를 재사용할지 여부를 결정
    return future.routeConfig === curr.routeConfig && future.data["reuse"];
  }

  private getRouteUrl(route: ActivatedRouteSnapshot): string {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return ((route as any)["_routerState"] as RouterStateSnapshot).url;
  }
}
