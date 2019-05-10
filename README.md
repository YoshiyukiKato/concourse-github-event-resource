# concourse-github-event-resource
A concourse resource to handle github events with webhook.  
In detail about concourse webhook, please check the doc( https://concourse-ci.org/resources.html ).

```yaml
resource_types:
  - name: github-event
    type: docker-image
    source:
      repository: yoshiyuki/concourse-github-event-resource

resource:
  - name: github-branch-delete
    type: github-event
    check_every: 600h
    webhook_token: your_webhook_token
    source:
      api_base_url: https://api.github.com
      access_token: your_access_token
      repository:
        owner: repo_owner
        name: repo_name
      event:
        type: DeleteEvent
        ref_type: branch
        ref: "*"
```

|name|required|default|detail|
|--|--|--|--|
|event.type|yes||target event info. Supported events are bellow|
|event.*|yes||parameters depending on event type. For instance, `DeleteEvent` requires `ref` and `ref_type`|
|repository.owner|yes||github repository owner name|
|respoitory.name|yes||github repository name|
|api_base_url|no|https://api.github.com|github api endpoint url|
|access_tokn|no||github personal access token. Required if your repository is private|


## `in`

```yaml
jobs:
- name: myjob
  public: true
  plan:
  - get: github-branch-delete
    trigger: false
```

This resource provides matched events info by a json file named as `events.json`.

```json
{
  "events": [
    {
      "id": "111111",
      "type": "DeleteEvent",
      "actor": {
        "id": 1,
        "login": "example",
        "display_login": "example",
        "gravatar_id": "",
        "url": "https://api.github.com/users/example",
        "avatar_url": "https://github.com/avatars/u/1?"
      },
      "repo": {
        "id": 1,
        "name": "example-org/test",
        "url": "https://api.github.com/repos/example-org/test"
      },
      "payload": {
        "ref": "a/branch",
        "ref_type": "branch",
        "pusher_type": "user"
      },
      "public": true,
      "created_at": "2019-01-01T00:00:00Z",
      "org": {
        "id": 2,
        "login": "example-org",
        "gravatar_id": "",
        "url": "https://api.github.com/orgs/example-org",
        "avatar_url": "https://github.com/avatars/u/2?"
      }
    }
  ]
}
```

## supported events
### `CreateEvent`
|parameter name|required|default|detail|
|--|--|--|--|
|ref|yes||target ref pattern by glob manner|
|ref_type|yes||target ref type. `branch` and `tag` are available|

### `DeleteEvent`
|parameter name|required|default|detail|
|--|--|--|--|
|ref|yes||target ref pattern by glob manner|
|ref_type|yes||target ref type. `branch` and `tag` are available|

## TODO
- add events support( https://developer.github.com/v3/activity/events/types/ )
  - [ ] CheckRunEvent
  - [ ] CheckSuiteEvent
  - [ ] CommitCommentEvent
  - [ ] ContentReferenceEvent
  - [x] CreateEvent
  - [x] DeleteEvent
  - [ ] DeployKeyEvent
  - [ ] DeploymentEvent
  - [ ] DeploymentStatusEvent
  - [ ] DownloadEvent
  - [ ] FollowEvent
  - [ ] ForkEvent
  - [ ] ForkApplyEvent
  - [ ] GitHubAppAuthorizationEvent
  - [ ] GistEvent
  - [ ] GollumEvent
  - [ ] InstallationEvent
  - [ ] InstallationRepositoriesEvent
  - [ ] IssueCommentEvent
  - [ ] IssuesEvent
  - [ ] LabelEvent
  - [ ] MarketplacePurchaseEvent
  - [ ] MemberEvent
  - [ ] MembershipEvent
  - [ ] MetaEvent
  - [ ] MilestoneEvent
  - [ ] OrganizationEvent
  - [ ] OrgBlockEvent
  - [ ] PageBuildEvent
  - [ ] ProjectCardEvent
  - [ ] ProjectColumnEvent
  - [ ] ProjectEvent
  - [ ] PublicEvent
  - [ ] PullRequestEvent
  - [ ] PullRequestReviewEvent
  - [ ] PullRequestReviewCommentEvent
  - [ ] PushEvent
  - [ ] ReleaseEvent
  - [ ] RepositoryEvent
  - [ ] RepositoryImportEvent
  - [ ] RepositoryVulnerabilityAlertEvent
  - [ ] SecurityAdvisoryEvent
  - [ ] StarEvent
  - [ ] StatusEvent
  - [ ] TeamEvent
  - [ ] TeamAddEvent
  - [ ] WatchEvent
