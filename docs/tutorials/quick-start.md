---
id: tuto-quick-start
title: Quick start
sidebar_label: Quick start
---

## What is Web Myna?

Web Myna (WM for later) is a system that allows you to record calls to APIs and then replay them, for example when you no longer have a network connexion or during your tests on a continuous integration stack.

Let's imagine for example that the backend of the site you're working on uses the API https://rickandmortyapi.com
Well, rather than making calls to the original API, you can configure WM to work with this API, and make your backend's calls to http://localhost:8080/rick-and-morty . WM will be able to make the real call to the API, record it and then play it back on next calls.

## Installation

### Prerequisites

WM has been coded in Javascript, and requires that Node.js (>= 12.8) be installed on your environment.

To date, it has only been used under a Linux environment, and its configuration - which uses the `$HOME` environment variable - does not guarantee the proper functioning of WM under Windows.

### npm

Webmyna is designed to work from a cli. The best way to use it is therefore to install it globally:

```bash
$ npm install -g web-myna
```

or

```bash
$ yarn add -g web-myna
```

## First configuration

To work, WM needs at least a configuration file `.webmynarc` indicating :

* the path to the directory where calls to apis will be recorded,
* the [description of at least one API](../how-to/howto-manage-apis).

WM expects to find this file at the folder's root from which the client is called or at the root of the user's `$HOME` directory.

At the first launch, if this configuration file is not found, WM will launch an interactive command allowing you to simply generate this configuration file.

Here is for example what the configuration for the api [Rick and Morty](https://rickandmortyapi.com/) looks like, which will be managed under the name `rick-and-morty` by WM.

![interactive cli for configuration](/web-myna/img/wm-configuration.gif)

## Launch recordings

Now that your first api is configured, you will need to make recordings. WM uses environment variables to define its execution mode:

* **player mode** (default mode without defined environment variable): in this mode, WM will check if records exist. If so, he returns them. If not, it returns a `404` error.
* **recording mode**, activated by the environment variable `WEB_MYNA_MODE=recording`. In this mode, WM checks if a recording exists. If it exists, it returns it. Otherwise, it makes the real call to the API, saves the result and returns it.

Because WM has just been configured, there is no records. It must therefore be started in recording mode:

```bash
$ WEB_MYNA_MODE=recording webmyna
```

You can now make your calls to http://localhost:8080/rick-and-morty/your-call, each call will be forwarded to https://rickandmortyapi.com/api/your-call and recorded in the directory declared for registration. For example `$HOME/.webmyna/rick-and-morty/`

## Play back the recordings

Now that you have recorded your calls, you can stop WM (`Ctl-c`) and restart it in player mode:

```bash
$ webmyna
```

You can then make the same calls again without them actually being transmitted to the original API.
