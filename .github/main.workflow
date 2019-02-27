workflow "Publish to npm" {
  on = "release"
  resolves = ["Build"]
}

action "Publish" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm publish"
  needs = ["Build"]
  secrets = ["NPM_AUTH_TOKEN"]
}

action "Build" {
  uses = "owner/repo/path@ref"
  runs = "yarn install && yarn build"

}
