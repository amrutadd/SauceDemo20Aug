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
        
        stage("Install Library & Playwright") {
            steps {
                bat "npm ci"
                bat "npx playwright install"
            }
        }
        
        stage("Execute Test Cases") {
            steps {
                // 1. Cleans up old allure results folder before test begins
                bat "if exist allure-results rmdir /s /q allure-results"
                
                // 2. Chained env variables together on a single line so Playwright reads it
                bat "set TEST_ENV=${params.ENVIRONMENT_NAME}&& npx playwright test --project=${params.BROWSER_NAME} --grep ${params.SUITE_NAME}"
            }
        }
    }

    post {
        always {
            script {
                allure([
                    commandline: 'Allure', // 3. IMPORTANT: Must match your Allure name in "Manage Jenkins -> Global Tool Configuration"
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }
}
