const keyPrefix = 'a'
const CORE_QUERY = `
    title {
      english
      romaji
      userPreferred
      native
    }
    externalLinks {
      url
      site
    }
    id
    idMal
    bannerImage
    coverImage {
      extraLarge
      large
    }
    format
    status
    season
    startDate {
      year
    }
    episodes
    duration
    genres
    isAdult
  }
`

const getHeader = ({ key, name }) => `${keyPrefix}${key}: Media(search: "${encodeURIComponent(name).replace(/%20/g, ' ')}") {`

export default function (entries) {
  const queries = entries.reduce((acc, entry) => {
    const header = getHeader(entry)
    const query = [header, CORE_QUERY].join('\n')

    acc.push(query)

    return acc
  }, [])

  const mainQuery = queries.join('\n')

  return ['query {', mainQuery, '}'].join('\n')
}
