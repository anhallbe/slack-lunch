# slack-lunch
Ask slack what's for /lunch:

![Screenshot usage](https://raw.githubusercontent.com/anhallbe/slack-lunch/master/screenshot1.png)

## Develop
```
  git clone git@github.com:anhallbe/slack-lunch.git
  cd slack-lunch/
  npm install
  npm serve
  [hack hack hack]
```

## Deploy
```
  [in cloned repo]
  docker build -t slack-lunch .
  docker run -d -e TOKEN=[slack API token] --name slack-lunch -p [external port]:8080 slack-lunch
```
