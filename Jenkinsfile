pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/olivercoltart/ase2-quiz.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // For React frontend
                    dir('frontend') {
                        sh 'npm install'
                    }
                    // For Node.js backend
                    dir('backend') {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Run frontend tests (React)
                    dir('frontend') {
                        sh 'npm test'
                    }
                    // Run backend tests (Node.js)
                    dir('backend') {
                        sh 'npm test'
                    }
                }
            }
        }
    }
}