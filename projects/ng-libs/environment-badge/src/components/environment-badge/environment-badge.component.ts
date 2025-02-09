import { Component, input } from '@angular/core';

export type EnvironmentBadgeInput = 'prod' | 'dev' | 'local' | 'none';

@Component({
  selector: 'mh-environment-badge',
  templateUrl: './environment-badge.component.html',
  styleUrls: ['./environment-badge.component.scss'],
  standalone: true,
  imports: [],
})
export class EnvironmentBadgeComponent {
  env = input<EnvironmentBadgeInput>('local');
  envMap = {
    dev: '이 앱은 개발 환경에서 실행 중입니다.',
    local: '이 앱은 로컬 환경에서 실행 중입니다.',
    none: '이 앱은 로컬 환경에서 실행 중입니다.',
  };
}
