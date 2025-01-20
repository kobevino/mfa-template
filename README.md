# MFA Template

This is a micro-frontend project that is based on Turborepo.

## Prerequisite

* Node v20.10.0
* pnpm v9.0.0
* vite - 설정의 복잡성과 빌드 성능면서 vite가 더 효율적임. 개발시 native esm 모듈 그대로 사용.
* react-swc-ts - swc는 rust로 작성된 고성능 컴파일러, babel보다 빠름.

## Usage

* 모든 dependeny 설치

```sh
$ pnpm i
```

* Root에서 사용시 각 프로젝트의 dev 모드 병렬 개발 서버 실행

```sh
$ pnpm dev 
$ pnpm build
$ pnpm check
```

* 각 프로젝트 개별 실행

```sh
$ pnpm --filter [package name] dev
$ pnpm --filter [package name] build
$ pnpm --filter [package name] add [dependency]
$ pnpm --filter [package name] remove [dependency]
```

* 각 프로젝트 HMR 개발 모드

```sh
$ pnpm --filter [package name] dev:alone
```

* packages 모듈 사용시 `pnpm install` or `pnpm --filter [package namae] add @repo/ui`로 설치

```json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

## Scaffolding

```bash
apps/
  ├── _shell/
  ├── health/
  │     └── src
  │          ├── app/
  │          ├── pages/
  │          ├── widgets/
  │          ├── features/
  │          └── entities/
  ├── insurance/
  └── mydata/
packages/
  ├── typescript-config/
  ├── shared/
  └── ui/
```

* packages: apps안에서 공통으로 필요한 코드들은 packages에서 관리
* app: 애플리케이션 초기화 및 provider, router, global style 전역 설정
* pages: 해당 레이어는 애플리케이션 페이지를 담당
* widgets: 페이지에서 사용되는 독립적인 UI 담당
* features: 해당 레이어는 비즈니스 가치를 전달하는 기능을 담당.
* entities: 해당 레이어는 api, model, hook 등을 다루는 비즈니스 엔티티 영역 담당

## Handling Routing

* Hybrid Approach

- Top-Level routes는 shell에서 관리
- nested routes는 각각의 마이크로 프론트엔드에서 관리

```tsx
// shell
const router = createBrowserRouter([
	{
		path: '/',
		element: <div>Host App</div>,
	},
	{
		path: '/health/*',
		element: <HealthApp />,
	},
	{
		path: '*',
		element: <div>404 Host Error</div>,
	},
]);
```

```tsx
// each micro frontend
const routes = [
	{
		path: '/',
		element: <div>Health App</div>,
	},
	{
		path: '/test',
		element: <div>Health Test App</div>,
	},
	{
		path: '*',
		element: <div>404 Health Error</div>,
	},
];
```

* shell에서 실행시
  - /health -> Health App
  - /health/test -> Health Test App
  - /health/error -> 404 Health Error

* health micro frontend에서 실행시
  - / -> Health App
  - /test -> Health Test App
  - /error -> 404 Health Error

- [Handling Routing in a Microfrontend Architecture](https://article.arunangshudas.com/handling-routing-in-a-microfrontend-architecture-71472a3ec3d6)
- [(번역) 기능 분할 설계 - 최고의 프런트엔드 아키텍처](https://emewjin.github.io/feature-sliced-design/)
