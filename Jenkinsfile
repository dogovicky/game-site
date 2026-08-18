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
			parallel {
				stage('Lint') {
					steps {
						sh 'npm run test:lint'
					}
				}

				stage('Typecheck') {
					steps {
						sh 'npm run typecheck'
					}
				}

				stage('Unit tests') {
					steps {
						sh 'npm test -- --run'
					}
				}
			}
		}

		stage('Build application') {
			steps {
				sh 'npm run build'
			}
		}

		stage('Build production image') {
			steps {
				sh 'docker compose build app'
			}
		}

		stage('Deploy production') {
			when {
				branch 'main'
			}
			steps {
				sh 'docker compose up -d --no-build --remove-orphans app'
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
