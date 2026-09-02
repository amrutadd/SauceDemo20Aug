pipeline {
    agent any
    
    parameters {
        choice(
            name : 'ENVIRONMENT_NAME',
            choices : ['qa', 'uat', 'staging'],
            description : 'Select Environment Name'
        )
        choice(
            name : 'BROWSER_NAME',
            choices : ['chromium', 'firefox', 'webkit'],
            description : 'Select Browser Name'
        )
        choice(
            name : 'SUITE_NAME',
            choices : ['Regression', 'Smoke', 'Sanity', 'E2E'],
            description : 'Select Suite Name'
        )
    }
    
    stages {
        stage("Clone A Repository") {
            steps {
                git url : 'https://github.com/amrutadd/SauceDemo20Aug.git', branch : 'master'
            }
        }
        
        stage("Install Library") {
            steps {
                bat "npm ci"
            }
        }
        
         stage("Install Playwright") {
            steps {
                bat "npx playwright install"
            }
        }
        
        stage("Execute Test Cases") {
            steps {
                // 1. Cleans up old allure results folder before test begins
                bat "if exist allure-results rmdir /s /q allure-results"
                
                // 2. Chained env variables together on a single line so Playwright reads it
                bat "set TEST_ENV=%ENVIRONMENT_NAME%"
                
                bat "npx playwright test --project=%BROWSER_NAME% --grep %SUITE_NAME%"
            }
        }
    }

    post {
        always {
            script {
                allure([
                    includeProperties: false,
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }
}
