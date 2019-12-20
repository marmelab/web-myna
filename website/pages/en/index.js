/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const Logo = props => (
    <div className="projectLogo">plop
        <img src="img/logo.png" alt="Web Myna Logo" />
    </div>
);

class HomeSplash extends React.Component {
    render() {
        const { siteConfig, language = '' } = this.props;
        const { baseUrl, docsUrl } = siteConfig;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        const langPart = `${language ? `${language}/` : ''}`;
        const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

        const SplashContainer = props => (
            <div className="homeContainer">
                <div className="homeSplashFade">
                    <div className="wrapper homeWrapper">{props.children}</div>
                </div>
            </div>
        );

        const ProjectTitle = () => (
            <h2 className="projectTitle">
                {siteConfig.title}
                <small>{siteConfig.tagline}</small>
            </h2>
        );

        return (
            <SplashContainer>
                <div className="inner">
                    <ProjectTitle siteConfig={siteConfig} />
                </div>
                <h3>Why ?</h3>
                <p>For a long time, the idea of having a system to record API calls to use them in functional or e2e tests has been making its mark. We have tried several tools:</p>

                <p> * Polly.js with its REST recording. But Polly imposes a lot of configuration, and leaves you too dependent on the library in the tests.<br />
                * RestBird. The project is still a little young, the documentation still too incomplete. And above all, you can only launch the mock server on localhost, which is a problem within docker-compose.<br />
                * Http Toolkit. You have to pay to enjoy all the features, and it does not really work as an API server (mocked), but more as a request interceptor.<br />
                * Mock server. Probably the most attractive project, but it seems really too complicated!</p>

                <p>So no project that really matched the need.<br />
                Web Myna will do it</p>
            </SplashContainer>
        );
    }
}

class Index extends React.Component {
    render() {
        const { config: siteConfig, language = '' } = this.props;

        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language} />
                <Logo config={siteConfig}/>
                <div className="mainContainer">

                </div>
            </div>
        );
    }
}

module.exports = Index;
