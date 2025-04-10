const fs = require('node:fs')
const path = require('node:path')

// 主函数
async function main() {
	try {
		// 读取 package.json 获取版本号
		const packageJsonPath = path.resolve(__dirname, '../package.json')
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
		const version = packageJson.version
		const name = 'Blazwitcher'

		console.log(`Injecting version ${version} into sidepanel/index.html...`)

		// 读取 index.html 文件
		const indexHtmlPath = path.resolve(__dirname, '../sidepanel/index.html')
		let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8')

		// 直接替换 title 标签内容
		indexHtmlContent = indexHtmlContent.replace(/<title>.*?<\/title>/, `<title>${name} v${version}</title>`)

		// 写回文件
		fs.writeFileSync(indexHtmlPath, indexHtmlContent)

		console.log('Version injection complete!')
	} catch (error) {
		console.error('Error during pre-build:', error)
		process.exit(1)
	}
}

main().catch(console.error)
