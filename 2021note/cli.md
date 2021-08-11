### bin/index.js

```javascript
#! /usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");

program
  .version(`zf-cli ${require("../package.json").version}`)
  .usage(`<command> [option]`);

program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if if exits")
  .action((name, cmd) => {
    require("../lib/create")(name, cmd);
  });

program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <path>", "get value form option")
  .option("-s, --set <path> <value>")
  .option("-d, --delete <path>", "delete option form config")
  .action((value, cmd) => {
    require("../lib/create")(value, cmd);
    // console.log(value, cmd);
  });

program
  .command("ui")
  .description("open a ui server")
  .option("-p, --port", "port use for the UI Server ")
  .action((cmd) => {
    console.log(cmd);
  });

program.on("--help", function () {
  console.log();
  console.log(`Run ${chalk.cyan(" zf-cli <command> --help")} show details`);
  console.log();
});
program.parse(process.argv);

```

### lib

```javascript
// request.js
const axios = require('axios').default

axios.interceptors.response.use(res => res.data)

async function fetchRepoList() {
  return axios.get('https://api.github.com/orgs/zhu-cli/repos');

}
async function fetchTagList(repo) {
  return axios.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`)
}

module.exports = {
  fetchRepoList,
  fetchTagList
}

// create.js
const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require('./Creator')
module.exports = async (projectName, options) => {
  // 创建项目
  const cwd = process.cwd();
  const targetDir = path.join(cwd, projectName);
  console.log('targetDir', targetDir)
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      //
      let {action} = await Inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Target directory is already exits Pick an action",
          choices: [
            { name: "Overwrite", value: "overwrite" },
            { name: "Cancel", value: "false" },
          ],
        },
      ]);

      if(!action) {
        return;
      } else if(action === 'overwrite') {
        console.log(`\r\n removing ................`);
        await fs.remove(targetDir);
        console.log(`\r\n removing success`);
      }
    }
  }
  const creator = new Creator(projectName, targetDir);
  creator.create()
};

// Creator.js
const { fetchRepoList, fetchTagList } = require("./request");
const Inquirer = require("inquirer");
const ora = require("ora");
const downloadGitRepo = require("download-git-repo");
const util = require("util");

function sleep(n) {
  return new Promise((resolve, reject) => setTimeout(resolve, n));
}

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);

  spinner.start();
  try {
    let repoList = await fn(...args);
    spinner.succeed();
    return repoList;
  } catch (e) {
    spinner.fail("request failed, refetch...........");
    await sleep(1000);

    return wrapLoading(fn, message, ...args);
  }
}

class Creator {
  constructor(projectName, targetDir) {
    this.projectName = projectName;
    this.targetDir = targetDir;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  async fetchRepo() {
    let repoList = await wrapLoading(fetchRepoList, "waiting fetch template");
    if (!repoList) return;
    repoList = repoList.map((item) => item.name);

    let { repo } = await Inquirer.prompt({
      name: "repo",
      type: "list",
      choices: repoList,
      message: "please select a template",
    });
    // console.log(repo);
    return repo;
  }
  async fetchTag(repo) {
    let tags = await wrapLoading(fetchTagList, "waiting fetch tags", repo);
    if (!tags) return;
    tags = tags.map((item) => item.name);
    let { tag } = await Inquirer.prompt({
      name: "tag",
      type: "list",
      choices: tags,
      message: "please select a tag",
    });
    return tag;
  }
  async download(repo, tag) {
    let requestUrl = `zhu-cli/${repo}/${tag ? tag : ""}`;
    await this.downloadGitRepo(requestUrl, this.targetDir);
    return this.targetDir;
  }
  async create() {
    let repo = await this.fetchRepo();
    let tag = await this.fetchTag(repo);
    await this.download(repo, tag);
  }
}

module.exports = Creator;

```

### package

```json
{"bin": "./bin/index.js"}
```



### end

```bash
npm link # 链接你的包
```

