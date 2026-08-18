def qualityHelper
def dockerHelper

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
        stage('Load pipeline helpers') {
            steps {
                script {
                    qualityHelper = load 'ci/jenkins/quality.groovy'
                    dockerHelper = load 'ci/jenkins/docker.groovy'
                }
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Quality gates') {
            steps {
                qualityHelper.run()
            }
        }

        stage('Build production image') {
            steps {
                dockerHelper.build()
            }
        }

        stage('Deploy production') {
            when {
                branch 'main'
            }
            steps {
                dockerHelper.deploy()
                sh 'docker compose ps'
            }
        }
    }

    post {
        always {
            script {
                dockerHelper.logs()
            }
            sh 'rm -rf node_modules'
        }
    }
}
