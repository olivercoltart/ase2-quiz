pipeline {
    agent {
        docker { 
            image 'node:16'  // This specifies the Node.js Docker image (can use any version you need)
            label 'docker'  // Optional, if you have a label for Jenkins agents that support Docker
            args '-u root:root'  // Optional, depending on your system and user permissions
        }
    }

    stages {
        stage('Install Client Dependencies') {
            steps {
                script {
                    // Change directory to the 'client' folder and install dependencies
                    dir('client') {  // This specifies the 'client' folder
                        // Install the dependencies
                        sh 'npm install'  // If you're using npm
                        // Or, if you use yarn, use: sh 'yarn install'
                    }
                }
            }
        }

        stage('Run Client Tests') {
            steps {
                script {
                    dir('client') {  // Again, change to 'client' folder
                        // Run your tests
                        sh 'npm test'  // This will run the tests defined in your package.json
                    }
                }
            }
        }
    }

    post {
        always {
            // Post-build actions (e.g., notifications, cleanup, etc.)
        }
    }
}
