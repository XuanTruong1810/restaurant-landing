pipeline {
    agent any
    
    environment {
        NODE_VERSION = '20'
        BUN_VERSION = '1.2.13'
        DOCKER_IMAGE = 'restaurant-landing'
        DOCKER_TAG = "${BUILD_NUMBER}"
        REGISTRY_URL = 'your-registry-url'
        STAGING_SERVER = 'staging.bellavista.com'
        PRODUCTION_SERVER = 'bellavista.com'
    }
    
    tools {
        nodejs "${NODE_VERSION}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Code checked out successfully'
            }
        }
        
        stage('Install Bun') {
            steps {
                script {
                    sh '''
                        curl -fsSL https://bun.sh/install | bash
                        export PATH="$HOME/.bun/bin:$PATH"
                        bun --version
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                        export PATH="$HOME/.bun/bin:$PATH"
                        cd restaurant-landing
                        bun install
                    '''
                }
            }
        }
        
        stage('Lint') {
            steps {
                script {
                    sh '''
                        export PATH="$HOME/.bun/bin:$PATH"
                        cd restaurant-landing
                        bun run lint
                    '''
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    sh '''
                        export PATH="$HOME/.bun/bin:$PATH"
                        cd restaurant-landing
                        bun run test:run
                    '''
                }
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'restaurant-landing/test-results.xml'
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    sh '''
                        export PATH="$HOME/.bun/bin:$PATH"
                        cd restaurant-landing
                        bun run build
                    '''
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    sh '''
                        export PATH="$HOME/.bun/bin:$PATH"
                        cd restaurant-landing
                        # Run security audit
                        bun audit
                        
                        # Optional: Run additional security tools
                        # npm audit --audit-level high
                    '''
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    def image = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}", "./restaurant-landing")
                    docker.withRegistry("https://${REGISTRY_URL}", 'docker-registry-credentials') {
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    sh '''
                        # Deploy to staging environment
                        docker-compose -f docker-compose.staging.yml down
                        docker-compose -f docker-compose.staging.yml pull
                        docker-compose -f docker-compose.staging.yml up -d
                    '''
                }
            }
        }
        
        stage('Integration Tests') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    sh '''
                        # Run integration tests against staging
                        export STAGING_URL="https://${STAGING_SERVER}"
                        cd restaurant-landing
                        bun run test:integration
                    '''
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    input message: 'Deploy to production?', ok: 'Deploy'
                    
                    sh '''
                        # Deploy to production environment
                        docker-compose -f docker-compose.prod.yml down
                        docker-compose -f docker-compose.prod.yml pull
                        docker-compose -f docker-compose.prod.yml up -d
                    '''
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sh '''
                        # Health check for deployed application
                        sleep 30
                        curl -f http://localhost:3000/health || exit 1
                    '''
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            emailext (
                subject: "✅ Build Success: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build completed successfully. Check console output at ${env.BUILD_URL}",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
        failure {
            emailext (
                subject: "❌ Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Build failed. Check console output at ${env.BUILD_URL}",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
    }
}
