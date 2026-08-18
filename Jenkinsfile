pipeline {
	agent any

	options {
		disableConcurrentBuilds()
		timestamps()
		timeout(time: 20, unit: 'MINUTES')
	}

	environment {
		COMPOSE_PROJECT_NAME = 'game-site'
	}

	stages {
		stage('Install dependencies') {
			steps {
				sh 'npm ci'
			}
		}

		stage('Quality gates') {
			steps {
				sh 'npm run check'
			}
		}

		stage('Build production image') {
			steps {
				sh 'npm run docker:build'
			}
		}

		stage('Deploy production') {
			when {
				branch 'main'
			}
			steps {
				sh 'npm run docker:deploy'
				sh 'docker compose ps'
			}
		}
	}

	post {
		always {
			sh 'docker compose logs --no-color --tail=100 app || true'
			sh 'rm -rf node_modules'
		}
	}
}
