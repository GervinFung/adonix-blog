# **My Second (Hopefully, The Final) Blog - Adonix Blog**

I had to redo the entire blog from scratch, because the previous project - Adonix OS Blog was a total mess as it became unscalable real quick because I did not plan well

<details>
<summary>Click to preview!</summary>

#### Home Page

![Light Mode](docs/home/light.png 'Light Mode')
![Dark Mode](docs/home/dark.png 'Dark Mode')
**Excuse me for weird title and description**
![Light Mode Posts](docs/home/light-posts.png 'Light Mode Posts')
![Dark Mode Posts](docs/home/dark-posts.png 'Dark Mode Posts')

#### Post

![Light Mode Post](docs/post/light.png 'Light Mode Post')
![Dark Mode Post](docs/post/dark.png 'Dark Mode Post')
![Light Mode Content](docs/post/light-content.png 'Light Mode Content')
![Dark Mode Content](docs/post/dark-content.png 'Dark Mode Content')

#### Footer yeah, ordinary

![Light Mode Footer](docs/footer/light.png 'Light Mode Footer')
![Dark Mode Footer](docs/footer/dark.png 'Dark Mode Footer')

</details>

## Tech Used

| Aspect                                                                 | Name           |
| :--------------------------------------------------------------------- | :------------- |
| Development Language                                                   | TypeScipt      |
| Scripting Language                                                     | JavaScript     |
| Testing                                                                | Jest & Esbuild |
| Components & Styling                                                   | Material UI    |
| Framework                                                              | NextJS         |
| Build Automation Tool                                                  | Make           |
| Text Editor                                                            | NeoVim         |
| Dependency Management                                                  | PNPM           |
| Continuous Integration, Continuous Delivery, and Continuous Deployment | GitHub Actions |

## How to build this app?

_*Make sure you have `pnpm` and `make` available in your system*_

### Environment Variables

#### Development

1. Refer to `.env.development.example` which is an example file for you to know what key-value pairs are needed to develop this project
2. Then, create `.env.development` file that will be used for development respectively. After that, copy the key-value pairs to it and then add the values

#### Testing

1. Same step as development but change the `development` in file name to `test`

#### Deployment

1. Same step as development but change the `development` in file name to `deployment`

#### Make Commands

_*Below are the listed commands that you can use to build/develop/test this app*_

| Command           | Usage                                             |
| ----------------- | ------------------------------------------------- |
| make dev          | Start development                                 |
| make start        | Run the built and bundled production code         |
| make install      | Install all dependencies                          |
| make test         | Run all test code                                 |
| make build        | Bundle and build the app                          |
| make typecheck    | Run type-checking for source code                 |
| make lint         | Run linter for source and test code               |
| make format-check | Run prettier to check source and test code format |
| make format       | Run prettier to format source and test code       |
