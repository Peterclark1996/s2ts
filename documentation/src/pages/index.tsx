import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import Heading from "@theme/Heading"

import styles from "./index.module.css"
import { DocsOutdatedAlert } from "../components/DocsOutdatedAlert"

const Home = () => {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout title="S2TS Docs" description={siteConfig.tagline}>
            <DocsOutdatedAlert />
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
                        <Link className="button button--secondary button--lg" to="/docs/cspointscript/exported-classes">
                            ⚙️ Valve's 'cspointscript' ⚙️
                        </Link>
                    </div>
                </div>
            </header>
            <main></main>
        </Layout>
    )
}

export default Home
