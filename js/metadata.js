'use strict'

export class MetaData {
    #url = './data/metadata.json'

    setMetaToHead(type, name, content) {
        const metaElement = document.createElement('meta')
        const linkElement = document.createElement('link')

        metaElement.setAttribute(type, name)
        metaElement.setAttribute('content', content)

        document.head.appendChild(metaElement)
    }

    setLinkToHead() {
        const canonicalLink = document.querySelector('link[rel="canonical"]')
        if (canonicalLink) {
            canonicalLink.href = window.location.href
        } else {
            const link = document.createElement('link')
            link.setAttribute('rel', 'canonical')
            link.setAttribute('href', window.location.href)
            document.head.appendChild(link)
        }
    }

    createOpenGraph(property, content) {
        this.setMetaToHead('property', property, content)
    }

    createTwitterCard(property, content) {
        this.setMetaToHead('name', property, content)
    }

    createDefaultMeta(property, content) {
        this.setMetaToHead('name', property, content)
    }

    update(meta) {
        this.setLinkToHead()
        this.createDefaultMeta('title', meta.title)
        this.createDefaultMeta('description', meta.description)

        this.createOpenGraph('og:title', meta.title)
        this.createOpenGraph('og:description', meta.description)
        this.createOpenGraph('og:type', 'website')
        this.createOpenGraph('og:url', window.location.href)

        this.createTwitterCard('twitter:card', 'summary_large_image')
        this.createTwitterCard('twitter:title', meta.title)
        this.createTwitterCard('twitter:description', meta.description)
    }

    get(data) {
        return data.find((item) => {
            const name = window.location.pathname.split('.')
            let path = name[0].split('/')[1]
            if (!path || path === 'index') path = 'home'
            return item.page === path
        })
    }

    async load() {
        try {
            const response = await fetch(this.#url)
            if (!response.ok) {
                throw new Error(`HTTP ERROR STATUS: ${response.status}`)
            }
            const data = await response.json()
            const meta = this.get(data)
            this.update(meta)
        } catch (err) {
            console.log('ERROR: ', err)
        }
    }
}
