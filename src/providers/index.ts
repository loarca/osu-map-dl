import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version } = require('../../package.json')

axios.defaults.headers['User-Agent'] = `${name}/${version}`

export * from './bloodcat'
