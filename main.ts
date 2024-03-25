import app from './app'

function main() {
    app.listen(3000, 'localhost', () => {
        console.log('Server subiu na http://localhost:3000')
    })
}

main()