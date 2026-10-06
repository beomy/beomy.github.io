<p align="center">
  <img src="https://user-images.githubusercontent.com/26466516/107675788-31f54e00-6c77-11eb-96c9-58fd8a4c69ac.png" alt="Gatsby and TypeScript">
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&style=for-the-badge&color=24B36B&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/github/license/jpedroschmitz/gatsby-starter-ts?style=for-the-badge&color=24B36B&labelColor=000000">

  <a href="https://twitter.com/intent/follow?screen_name=jpedroschmitz">
    <img src="https://img.shields.io/twitter/follow/jpedroschmitz?style=for-the-badge&color=24B36B&labelColor=000000" alt="Follow @jpedroschmitz" />
  </a>
</p>

<br>

A TypeScript starter for Gatsby. No plugins and styling. Exactly the necessary to start 🔥

No plugins installed, great for advanced users.

- 📏 **ESLint** — Pluggable JavaScript linter
- 💖 **Prettier** - Opinionated Code Formatter
- 🐶 **Husky** — Use git hooks with ease
- 📄 **Commitizen** - Conventional commit messages CLI
- 🐐 **Tests** - Jest and Testing Library
- 🚓 **Commitlint** - Lint commit messages
- 🖌 **Renovate** - Dependency update tool
- 🚫 **lint-staged** - Run linters against staged git files
- 👷 **PR Workflow** - Run Type Check & Linters on pull requests
- 🗂 **Root import** - Import folders and files using the `@` prefix.

## 🚀 Getting started

The best way to start with this template is using the Gatsby CLI.

```
npx gatsby new starter-ts https://github.com/jpedroschmitz/gatsby-starter-ts
```

If you prefer you can clone this repository and run the following commands inside the project folder:

> By default, this starter uses Yarn, but this choice is yours. If you'd like to switch to npm, delete the `yarn.lock` file, install the dependencies with `npm install`, and change the CI workflows, Husky Git hooks, and lint-staged steps to use npm commands.

> Node 버전은 [mise](https://mise.jdx.dev) 로 관리한다 (`mise.toml`). 처음 한 번 `mise install` 을 실행하면
> 저장소 안에서 고정된 Node 가 자동으로 활성화된다. Yarn 은 `.yarn/releases` 에 포함되어 있어 따로 설치하지 않는다.
> CI(`.github/workflows/ci.yml`)도 같은 `mise.toml` 을 읽는다.

1. `mise install`;
2. `yarn`;
3. `yarn start`;

To view the project you can open `http://localhost:8000`.

## 🤝 Contributing

1. Fork this repository;
2. Create your branch: `git checkout -b my-new-feature`;
3. Commit your changes: `git commit -m 'Add some feature'`;
4. Push to the branch: `git push origin my-new-feature`.

**After your pull request is merged**, you can safely delete your branch.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.

---

Made with ♥ by João Pedro Schmitz
