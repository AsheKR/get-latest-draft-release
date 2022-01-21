import * as core from '@actions/core'
import {Octokit} from '@octokit/rest'

const {
    GITHUB_REPOSITORY,
    GITHUB_TOKEN,
} = process.env;

const [owner, repoName] = (GITHUB_REPOSITORY as string).split('/');

async function run(): Promise<void> {
    const octokit = new Octokit({auth: GITHUB_TOKEN})
    const releases =  await octokit.paginate(octokit.rest.repos.listReleases, {
        owner,
        repo: repoName
    });
    core.info(`Found ${releases.length} releases`)
    if (!releases) {
        return
    }

    const draftRelease = releases.reverse().find((r) => r.draft);
    if (!draftRelease) {
        return
    }
    core.info(`draftRelease: ${draftRelease.tag_name}`)
    core.setOutput("id", draftRelease.id)
    core.setOutput("url", draftRelease.url)
    core.setOutput("html_url", draftRelease.html_url)
    core.setOutput("tag_name", draftRelease.tag_name)
}

run()
