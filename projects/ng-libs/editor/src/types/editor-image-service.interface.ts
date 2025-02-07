import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface EditorImageUploadResponse {
  url: string;
}

export interface IEditorImageService {
  upload(file: File): Observable<EditorImageUploadResponse>;
}

export const EDITOR_IMAGE_SERVICE = new InjectionToken<IEditorImageService>(
  'EDITOR_IMAGE_SERVICE'
);
