# Carbon8 Fountain

Node server and React app that is run on a physical Carbon8 fountain!

## Usage

Utilize the scripts below in the root of the project to get started:

**Setup the project and install dependencies:**

`npm run bootstrap`

> NOTE: This project uses [Lerna](https://github.com/lerna/lerna) as it is a
> mono-repo. This command installs all dependencies within individual projects
> and hoists the common package versions out to the `node_modules` directory in
> the root of the repo.

**Run the application in development mode:**

`npm run dev`

> NOTE: This builds the emails and starts the server in development mode.
> Additionally, this will start a webpack dev server to host a bundled version
> of our client. The webpack dev server will track your changes and continually
> generate bundles when changes occur.

**Build the client:**

`npm run build`

**Start the server in production mode:**

`npm run start`

> NOTE: You need to run the build command before starting the server.

**Run the linter to check coding style:**

`npm run style`

**Run the formatter to fix code style issues:**

`npm run format`

When developing locally make sure to use the Lerna commands to run scripts
across projects and to add dependencies to individual or multiple projects.
Lerna has a concept called scopes, this allows you to scope commands to specific
projects. If the Lerna commands are not used it will likely cause dependency
issues and synchronization issues between projects. Find the list of Lerna
commands [here](https://github.com/lerna/lerna).

## Contributing

A general guide to contribute in this repository is:

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request :rocket:

> See more information in our [contributing
> guide](https://github.com/RobertWSaunders/carbon8-fountain/blob/master/CONTRIBUTING.md).

## License

Copyright 2019 Carbon8

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

> See the entire license in our [license
> file](https://github.com/RobertWSaunders/carbon8-fountain/blob/master/LICENSE).
