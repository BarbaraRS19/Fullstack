import { createServer } from 'node:http'

const servidor = createServer((request, response) => {
    console.log('qlqr coisa')
    response.write('ta funcionando 5')
    return response.end()
})

servidor.listen(8000)