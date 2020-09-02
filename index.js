#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const execa = require('execa')
const del = require('del')
const glob = require('glob')
const rootDir = process.cwd()

;(async () => {
  const { projectName } = await inquirer.prompt([{
    type: 'input',
    name: 'projectName',
    message: '请输出项目名称',
    validate (input) {
      const done = this.async()

      if (!input) {
        done('名称不能为空')
        return
      }

      done(null, true)
    }
  }])

  // 项目路径
  const projectPath = path.resolve(rootDir, projectName)

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red.bold('项目已存在'))
    return
  }

  // 创建文件夹
  fs.mkdirSync(projectPath)

  // 创建 package.json
  const packageJsonPath = path.resolve(projectPath, 'package.json')
  const packageJsonContent =
`{
  "name": "${projectName}",
  "private": true,
  "main": "index.js",
  "scripts": {
    "debug": "cross-env NODE_ENV=test LOCAL_ENV=1 node --inspect-brk=10000 .",
    "start": "cross-env NODE_ENV=test LOCAL_ENV=1 node .",
    "start:prod": "cross-env NODE_ENV=production LOCAL_ENV=1 node .",
    "release:test": "cross-env NODE_ENV=test koaman pm2",
    "release": "cross-env NODE_ENV=production koaman pm2"
  }
}`
  fs.writeFileSync(packageJsonPath, packageJsonContent)

  // 创建 .gitignore
  fs.writeFileSync(path.resolve(projectPath, '.gitignore'), 'logs')

  // 复制项目模板
  const template = path.resolve(__dirname, 'template')

  for (const file of glob.sync(path.resolve(template, '**/*'), { dot: true })) {
    fs.copyFileSync(file, file.replace(template, projectPath))
  }

  // 创建 vscode/launch.json
  const vscodeLaunchJsonPath = path.resolve(projectPath, '.vscode/launch.json')
  const launchJsonPath = path.resolve(projectPath, 'launch.json')
  if (!fs.existsSync(vscodeLaunchJsonPath)) {
    fs.mkdirSync(path.resolve(projectPath, '.vscode'))
    fs.copyFileSync(launchJsonPath, vscodeLaunchJsonPath)
  }
  del.sync(launchJsonPath, { force: true })

  // 安装依赖
  await execa.command('yarn add koaman', { stdio: 'inherit', cwd: projectPath })

  // 安装开发依赖
  const eslintInstallCommand = `yarn add --dev eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard`
  await execa.command(eslintInstallCommand, { stdio: 'inherit', cwd: projectPath })

  console.log(chalk.green('success'))
})()
