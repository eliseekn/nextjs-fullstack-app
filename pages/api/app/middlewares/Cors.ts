import Cors from 'cors'

export const cors = Cors({
    methods: ['POST', 'GET', 'HEAD', 'DELETE', 'PUT'],
})
