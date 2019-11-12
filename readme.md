# Web Myna

![GitHub top language](https://img.shields.io/github/languages/top/marmelab/web-myna.svg) ![github contributors](https://img.shields.io/github/contributors/marmelab/web-myna.svg) ![web-myna.svg](https://img.shields.io/github/license/marmelab/web-myna.svg) ![prs welcome](https://img.shields.io/badge/prs-welcome-brightgreen.svg)

## Why ?

For a long time, the idea of having a system to record API calls to use them in functional or e2e tests has been making its mark. I have tried several tools:

* [Polly.js](https://netflix.github.io/pollyjs/#/) with its REST recording. But Polly imposes a lot of configuration, and leaves you too dependent on the library in the tests.
* [RestBird](https://restbird.org/). The project is still a little young, the documentation still too incomplete. And above all, you can only launch the mock server on localhost, which is a problem within docker-compose.
* [Http Toolkit](https://github.com/httptoolkit/mockttp). You have to pay to enjoy all the features, and it does not really work as an API server (mocked), but more as a request interceptor.
* [Mock server](http://www.mock-server.com/#what-is-mockserver). Probably the most attractive project, but it seems really too complicated!

So no project that really matched the need.

## How ?

This is what I expect from such a tool:

* Technology-independent: the idea is to configure the API's consumer application to point to the recorder API. That's all.
* The API recorder is configured for an API route and has already recorded the response: it returns it.
* If the API recorder is configured for an API route but has no record: it records.
* If the API requires authentication, this is indicated in the API recorder configuration, and it uses env variables to avoid hard recording secrets. 
* All configuration of the recorder API must be isolated and versionable (SQLite and json?)
* It should be easy to redo complete records when the API changes. Ideally, a feature should allow a specific record to be verified to compare it with the true API response
* Possibly, have a notion of team, i.e. associate mocker services with work teams (like using an auth token from the tests to identify a team?)
* It will therefore require an interface to manage the API Recorder server.
* The system will have to run both locally and in a docker container. Actually, especially in a docker container

## Installation

```bash
make install
```

## Usage

```bash
make start
```

## Contributing

pull requests are welcome. For major changes please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

```bash
make test
```

To learn more about the contributions to this project, consult the [contribution guide](/.github/CONTRIBUTING.md).

## Maintainer

[![alexisjanvier](https://avatars1.githubusercontent.com/u/547706?s=96&amp;v=4)](https://github.com/alexisjanvier)     
[Alexis Janvier](https://github.com/alexisjanvier) 

## License

web-myna is licensed under the [mit license](license), courtesy of [Arte]() and [Marmelab](http://marmelab.com).

