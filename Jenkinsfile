pipeline {
    agent {
        docker { 
            image 'node:20' // specified Node.js Docker image
            args '-u root:root'  
        }
    }

    stages {
        stage('Install Client Dependencies') {
            steps {
                script {
                    // Change directory to the 'client' folder and install dependencies
                    dir('client') {  // specifies the 'client' folder
                        // Install the dependencies
                        sh 'npm ci || npm install'  
                        sh 'npm audit fix || true'
                    }
                }
            }
        }

        stage('Run Client Tests') {
            steps {
                script {
                    dir('client') {  
                        // Run tests
                        sh 'npm run test'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'This always runs after the build, whether it succeeds or fails.'
        }
    }
}
