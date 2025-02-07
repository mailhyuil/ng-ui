import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

export type UploadResponse = { url: string };

export interface IEditorImageService {
  upload(file: File): Observable<UploadResponse>;
}

export const EDITOR_IMAGE_SERVICE = new InjectionToken<IEditorImageService>(
  "EDITOR_IMAGE_SERVICE",
);
