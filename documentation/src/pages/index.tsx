import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import Heading from "@theme/Heading"

import styles from "./index.module.css"

const Home = () => {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout title="S2TS Docs" description={siteConfig.tagline}>
            <header className={clsx("hero hero--primary", styles.heroBanner)}>
                <div className="container">
                    <Heading as="h1" className="hero__title">
                        {siteConfig.title}
                    </Heading>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link className="button button--secondary button--lg" to="/docs/getting-started">
                            📝 Getting started 📝
                        </Link>
                        <Link className="button button--secondary button--lg" to="/docs/cspointscript">
                            ⚙️ Valve's 'cspointscript' ⚙️
                        </Link>
                        <Link className="button button--secondary button--lg" to="/docs/helper-library">
                            📚 S2TS Helper Library 📚
                        </Link>
                    </div>
                </div>
            </header>
            <main></main>
        </Layout>
    )
}

export default Home
