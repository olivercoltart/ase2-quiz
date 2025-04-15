pipeline {
    agent {
        docker { 
            image 'node:18'  // This specifies the Node.js Docker image (can use any version you need)
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
                        sh 'npm audit fix'  // Fix vulnerabilities automatically
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
            echo 'This always runs after the build, whether it succeeds or fails.'
        }
    }
}
