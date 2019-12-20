/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
    docUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        const docsUrl = this.props.config.docsUrl;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        const langPart = `${language ? `${language}/` : ''}`;
        return `${baseUrl}${docsPart}${langPart}${doc}`;
    }

    pageUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + (language ? `${language}/` : '') + doc;
    }

    render() {
        return (
            <footer className="nav-footer" id="footer">
                <section className="sitemap">
                <a href="https://marmelab.com" className="nav-home">
                        {this.props.config.footerIcon && (
                            <img
                                src={this.props.config.baseUrl + this.props.config.footerIcon}
                                alt={this.props.config.title}
                            />
                        )}
                    </a>
                    <a href="https://arte.tv" className="nav-home">
                        <svg id="arte-next-arte" viewBox="0 0 8 32" style={{fill: '#FD4600', height: '48px'}}>
                            <path d="M1.338 27.366c0.006-1.786 0.486-3.987 2.266-3.987h4.25v3.149h-1.83c-0.006 0 0.269 0.768 0.448 1.35 0.109 0.397 0.333 0.691 0.736 0.717 0.339 0.032 0.653-0.352 0.653-0.352v3.085c0 0.006-0.25 0.685-0.986 0.666-1.408-0.064-1.92-1.158-2.234-3.853-0.179-1.453-0.32-1.613-0.685-1.619-0.301 0-0.64 0.179-0.653 0.998 0 1.184 0.8 1.101 0.8 1.101v3.021c0 0.013-2.765-0.019-2.765-4.275zM1.402 17.811c0.154 1.050 1.018 1.414 1.018 1.414h-0.902v2.938h6.336v-3.2h-3.034c-0.538-0.006-0.774-0.154-0.966-0.352-0.224-0.224-0.384-0.608-0.384-1.037v-0.902h-1.952c0 0.006-0.211 0.467-0.115 1.139zM0.019 11.424v3.168h1.498v1.318h1.952v-1.318h2.586c0.557 0 1.011 0.006 1.453-0.397 0.365-0.358 0.352-0.826 0.352-1.382v-1.382h-4.39v-1.901h-1.952v1.901h-1.498zM1.382 4.506c0.058-5.312 4.864-4.454 4.87-4.454v5.67h1.6v2.317c0-0.006-0.864 0.954-2.566 0.934-3.974-0.032-3.904-4.301-3.904-4.467zM4.653 3.123c-0.006 0.006-1.299-0.134-1.299 1.382-0.006 1.459 1.293 1.299 1.299 1.299v-2.682z"></path>
                        </svg>
                    </a>

                    <div>
                        <h5>Community</h5>
                        <a href="https://twitter.com/marmelab" target="_blank" rel="noreferrer noopener">
                            Twitter
                        </a>
                    </div>
                    <div>
                        <h5>More</h5>
                        <a
                            className="github-button"
                            href={this.props.config.repoUrl}
                            data-icon="octicon-star"
                            data-count-href="/facebook/docusaurus/stargazers"
                            data-show-count="true"
                            data-count-aria-label="# stargazers on GitHub"
                            aria-label="Star this project on GitHub"
                        >
                            Star
                        </a>
                        {this.props.config.twitterUsername && (
                            <div className="social">
                                <a
                                    href={`https://twitter.com/${this.props.config.twitterUsername}`}
                                    className="twitter-follow-button"
                                >
                                    Follow @{this.props.config.twitterUsername}
                                </a>
                            </div>
                        )}
                    </div>
                </section>

                <section className="copyright">{this.props.config.copyright}</section>
            </footer>
        );
    }
}

module.exports = Footer;
