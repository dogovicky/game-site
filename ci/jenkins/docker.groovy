def build() {
    sh 'npm run docker:build'
}

def deploy() {
    sh 'npm run docker:deploy'
}

def logs() {
    sh 'docker compose logs --no-color --tail=100 app || true'
}

return this