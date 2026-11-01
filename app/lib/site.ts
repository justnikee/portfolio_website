export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.doitnikhil.in').replace(/\/$/, '')
export const defaultSocialImage = '/social-preview'
export const author = {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Nikhil Thakur',
    url: `${siteUrl}/#About`,
    sameAs: ['https://github.com/justnikee'],
}
